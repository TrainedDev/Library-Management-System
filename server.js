const express = require("express");
const { sq } = require("./init");
const { Author } = require("./model/author.model");
const { Book } = require("./model/book.model");
const { Genre } = require("./model/genre.model");
const { BookGenre } = require("./model/bookGenre.model");
const app = express();

app.use(express.json());

const authorsData = [
    { name: 'J.K. Rowling', birthdate: '1965-07-31', email: 'jkrowling@books.com' },
    { name: 'George R.R. Martin', birthdate: '1948-09-20', email: 'grrmartin@books.com' }
];

const genresData = [
    { name: 'Fantasy', description: 'Magical and mythical stories.' },
    { name: 'Drama', description: 'Fiction with realistic characters and events.' }
];

const booksData = [
    { title: 'Harry Potter and the Philosopher\'s Stone', description: 'A young wizard\'s journey begins.', publicationYear: 1997, authorId: 1 },
    { title: 'Game of Thrones', description: 'A medieval fantasy saga.', publicationYear: 1996, authorId: 2 }
];

//seeding database
app.get("/seed-db", async (req, res) => {
    try {
        await sq.sync({ force: true });
        await Author.bulkCreate(authorsData);
        await Book.bulkCreate(booksData);
        await Genre.bulkCreate(genresData);

        const books = await Book.findAll({ include: { model: Genre, through: BookGenre } });
        const genres = await Genre.findAll({ include: { model: Book, through: BookGenre } });


        await books[0].setGenres([genres[0]]);
        await books[1].setGenres([genres[0], genres[1]]);

        res.status(200).json({ msg: "database successfully seeded" });
    } catch (error) {
        res.status(500).json({ msg: "failed to seed database", Error: error.message });
    }
});

//fetch books
app.get("/books", async (req, res) => {
    try {
        const fetchBooks = await Book.findAll();

        res.status(200).json({ msg: "books successfully fetched", Books: fetchBooks })
    } catch (error) {
        res.status(500).json({ msg: "failed to fetch book", Error: error.message })
    }
});

// fetch books by specific author 
app.get("/authors/:authorId/books", async (req, res) => {
    try {
        const id = parseInt(req.params.authorId);

        if (!id) return res.status(400).json("required details not found");

        const fetchBookByAuthor = await Book.findAll({ where: { authorId: id } });
        res.status(200).json({ msg: "specific books successfully fetched", data: fetchBookByAuthor });
    } catch (error) {
        res.status(500).json({ msg: "failed to fetch book by author", Error: error.message })
    }
});

//fetch all books by specific genre
app.get("/genres/:genreId/books", async (req, res) => {
    try {
        const genreId = parseInt(req.params.genreId);

        if (!genreId) return res.status(400).json("required details not found");

        const getBooks = await Genre.findAll({ where: { id: genreId }, include: Book });

        res.status(200).json({ msg: "genres successfully fetched", data: getBooks });
    } catch (error) {
        res.status(500).json({ msg: "failed to fetch books by specific genre", Error: error.message })
    }
});

// add new book
app.post("/books", async (req, res) => {
    try {
        const { title, description, publicationYear } = req.body

        if (!title || !description || !publicationYear) return res.status(400).json("required details not found");

        const newBook = await Book.create(req.body);

        res.status(200).json({ msg: "new book successfully created", data: newBook });
    } catch (error) {
        res.status(500).json({ msg: "failed to create new book", Error: error.message })
    }
});

app.get("/", (req, res) => res.send("server is live"));

app.listen("3000", () => console.log("server is ready"));