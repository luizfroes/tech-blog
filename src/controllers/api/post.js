const { getPayloadWithValidFieldsOnly } = require("../../helpers/helpers");
const { logError } = require("../../helpers/logger");
const { User, Post } = require("../../models");

const createNewPost = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ["title", "content"],
      req.body
    );

    if (Object.keys(payload).length !== 2) {
      return res.status(400).json({
        success: false,
        error: "Please provide all the valid fields in the post body!",
      });
    }

    const { title, content } = req.body;

    const newPayload = {
      title,
      content,
      user_id: req.session.user.id,
    };

    await Post.create(newPayload);

    return res.json({ success: true, data: "Post successfully created" });
  } catch (error) {
    logError("Create Post failed", error);

    return res
      .status(500)
      .json({ success: false, error: "Failed to create Post" });
  }
};

const updatePostById = async (req, res) => {
  try {
    const { id } = req.params;

    const payload = getPayloadWithValidFieldsOnly(
      ["title", "content"],
      req.body
    );

    if (Object.keys(payload).length !== 2) {
      console.log(`[ERROR]: Failed to update post | Invalid fields`);
      return res.status(400).json({
        success: false,
        error: "Please provide all the valid fields in the post body!",
      });
    }

    await Post.update(req.body, {
      where: {
        id,
        userId: req.session.user.id,
      },
    });

    return res.json({ success: true, data: "Updated Post" });
  } catch (error) {
    logError(`[ERROR]: Failed to update blog | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
};

const deletePostById = async (req, res) => {
  try {
    const data = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (data) {
      return res.json({ success: true, data: "Deleted Post" });
    }

    return res
      .status(404)
      .json({ success: false, error: "Post does not exist" });
  } catch (error) {
    logError("DELETE Post", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
};

module.exports = {
  createNewPost,
  updatePostById,
  deletePostById,
};
