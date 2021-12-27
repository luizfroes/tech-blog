// import important parts of sequelize library
const { Model, DataTypes, ConnectionError } = require("sequelize");

// import our database connection from config.js
const connection = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class User extends Model {}

module.exports = User;
