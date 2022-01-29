const { getPayloadWithValidFieldsOnly } = require("../../helpers/helpers");
const { logError } = require("../../helpers/logger");
const { User, Post } = require("../../models");

const createNewComment = (req, res) => {
  res.send("createNewComment");
};

const updateCommentsById = (req, res) => {
  res.send("updateCommentsById");
};

const deleteCommentsById = (req, res) => {
  res.send("deleteCommentsById");
};

module.exports = {
  createNewComment,
  updateCommentsById,
  deleteCommentsById,
};
