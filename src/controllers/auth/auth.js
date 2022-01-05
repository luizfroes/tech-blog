const { getPayloadWithValidFieldsOnly } = require("../../helpers/helpers");
const { logError } = require("../../helpers/logger");
const { User } = require("../../models");

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

module.exports = {
  login,
  logout,
  signup,
};
