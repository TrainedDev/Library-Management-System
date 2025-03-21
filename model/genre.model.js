const { DataTypes, sq } = require("../init");

const Genre = sq.define("Genre", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
});

module.exports = { Genre };