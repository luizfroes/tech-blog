// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");

// import our database connection from config.js
const connection = require("../config/connection");

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "User",
      key: "id",
    },
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Post",
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

// Initialize Comments model (table) by extending off Sequelize's Model class
class Comments extends Model {}

Comments.init(schema, options);

module.exports = Comments;
