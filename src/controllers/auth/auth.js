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

    return res.json({ success: true, data: "Login successful" });
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

    const user = await User.create(payload);

    return res.json({ success: true, data: user });
  } catch (error) {
    logError("CREATE User", error.message);

    return res
      .status(500)
      .json({ success: false, error: "Failed to create User" });
  }
};

const logout = (req, res) => {
  res.send("logout");
};

module.exports = {
  login,
  logout,
  signup,
};
