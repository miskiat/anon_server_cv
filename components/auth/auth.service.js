const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../../config");
const User = require("../users/user.model");

module.exports.doSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password)
    return res.status(400).json({
      message: "firstName, email, password are required",
    });

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(409).json({
        message: "User already exists! Login instead",
      });

    const newUser = await new User({
      firstName,
      lastName,
      password,
      email,
    }).save();

    const token = jwt.sign(
      {
        iat: Date.now(),
        expires: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
        firstName,
        email,
      },
      tokenSecret
    );

    return res.status(201).json({
      message: "Account created successfully",
      data: {
        firstName,
        lastName,
        email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
