
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });

    const token = createToken(user);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      })
      .status(201)
      .json({ message: "Signup successful", user: { id: user._id, name: user.name } });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(user);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      })
      .status(200)
      .json({ message: "Login successful", user: { id: user._id, name: user.name } });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};
