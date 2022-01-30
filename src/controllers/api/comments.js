const { getPayloadWithValidFieldsOnly } = require("../../helpers/helpers");
const { logError } = require("../../helpers/logger");
const { User, Post, Comments } = require("../../models");

const createNewComment = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ["comment", "blogId"],
      req.body
    );

    if (Object.keys(payload).length !== 2) {
      console.log(`[ERROR]: Failed to create comment | Invalid fields`);
      return res.status(400).json({ success: false });
    }

    await Comments.create({ ...payload, userId: req.session.user.id });

    return res.json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to create blog | ${error.message}`);
    return res.status(500).json({ success: false });
  }
  return res.json({ success: false });
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
