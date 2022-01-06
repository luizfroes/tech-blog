const { getPayloadWithValidFieldsOnly } = require("../../helpers/helpers");
const { logError } = require("../../helpers/logger");
const { User, Post } = require("../../models");

const login = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ["email", "password"],
      req.body
    );
    if (Object.keys(payload).length !== 2) {
      return res.status(400).json({
        success: false,
        error: "Please provide all the valid fields in the post body!",
      });
    }

    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Please provide a valid Email!",
      });
    }

    const validPassword = await user.checkPassword(payload.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: "Invalid Password!",
      });
    }

    const userInSession = {
      id: user.get("id"),
      email: user.get("email"),
      firstName: `${user.get("first_name")}`,
      lastName: `${user.get("last_name")}`,
    };

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = userInSession;

      return res.json({ success: true, data: "Login successful" });
    });

    // return res.redirect("/");
  } catch (error) {
    logError("LOGIN User", error.message);

    return res
      .status(500)
      .json({ success: false, error: "Failed to Login User" });
  }
};

const signup = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ["username", "email", "password", "first_name", "last_name"],
      req.body
    );

    if (Object.keys(payload).length !== 5) {
      return res.status(400).json({
        success: false,
        error: "Please provide all the valid fields in the post body!",
      });
    }

    await User.create(payload);

    return res.json({ success: true, data: "User successfully created" });
  } catch (error) {
    logError("Create User failed", error);

    return res
      .status(500)
      .json({ success: false, error: "Failed to create User" });
  }
};

const logout = (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      return res.json({ success: true, data: "Successfully logged out" });
    });
  } else {
    return res.status(404).json({
      success: false,
      error: "Cannot logout when you are not logged in",
    });
  }
};

const createNewPost = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ["title", "content", "user_id"],
      req.body
    );

    if (Object.keys(payload).length !== 3) {
      return res.status(400).json({
        success: false,
        error: "Please provide all the valid fields in the post body!",
      });
    }

    await Post.create(payload);

    return res.json({ success: true, data: "Post successfully created" });
  } catch (error) {
    logError("Create Post failed", error);

    return res
      .status(500)
      .json({ success: false, error: "Failed to create Post" });
  }
};

const updatePostById = (req, res) => {
  res.send("updatePostById");
};

const deletePostById = (req, res) => {
  res.send("deletePostById");
};

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
  login,
  logout,
  signup,
  createNewPost,
  updatePostById,
  deletePostById,
  createNewComment,
  updateCommentsById,
  deleteCommentsById,
};
