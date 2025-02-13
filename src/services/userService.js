const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const registerUser = async (name, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  return newUser;
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = { registerUser, getUserByEmail };
