// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");

// import our database connection from config.js
const connection = require("../../config/connection");

// Initialize Comments model (table) by extending off Sequelize's Model class
class Comments extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "posts",
      key: "id",
    },
  },
};

const options = {
  sequelize: connection,
  timestamps: true,
  freezeTableNames: true,
  underscored: true,
  modelName: "comments",
};

Comments.init(schema, options);

module.exports = Comments;
