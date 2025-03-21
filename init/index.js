const { DataTypes, Sequelize } = require("sequelize");
const sq = new Sequelize({ dialect: "sqlite", storage: "database.sqlite" });

module.exports = { DataTypes, sq };