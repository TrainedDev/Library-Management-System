const { DataTypes, sq } = require("../init");
const { Book } = require("./book.model");
const { Genre } = require("./genre.model");

const BookGenre = sq.define("BookGenre", {
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: "id",
        },
    },

    genreId: {
        type: DataTypes.INTEGER,
        references: {
            model: Genre,
            key: "id"
        },
    },
});

Book.belongsToMany(Genre, { through: BookGenre, foreignKey: "bookId", allowNull: false, });
Genre.belongsToMany(Book, { through: BookGenre, foreignKey: "genreId", allowNull: false, });

module.exports = { BookGenre };

