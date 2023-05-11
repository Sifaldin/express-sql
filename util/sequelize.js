const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("express", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
