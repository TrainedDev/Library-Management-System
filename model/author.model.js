const { DataTypes, sq } = require("../init");
const { Book } = require("./book.model");

const Author = sq.define("Author", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: DataTypes.STRING,
    birthdayDate: DataTypes.STRING,
    email: DataTypes.STRING,
});

Author.hasMany(Book, { foreignKey: "authorId", allowNull: false, });
Book.belongsTo(Author, { foreignKey: "authorId", allowNull: false, });

module.exports = { Author }