const { DataTypes, sq } = require("../init");

const Book = sq.define("Book", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    publicationYear: DataTypes.INTEGER,
});

module.exports = { Book };

