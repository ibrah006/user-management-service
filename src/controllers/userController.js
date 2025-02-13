const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserService.registerUser(name, email, password);
    res.status(201).json({ message: "User registered", userId: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email);

    if (user) {
        console.log(`actual password: ${user.password}, password inputted: ${password}`);
        console.log(`pass comparison correct?: ${await bcrypt.compare(password, user.password)}`)
        console.log(`pass comparison correct (regular check)?: ${password === user.password}`)
    } else {
        console.log(`user is null: ${user}`);
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user data based on username
const updateUser = async (req, res) => {
  const { username } = req.params; // Get the username from the URL parameter
  const updateData = req.body; // Get the data to update from the request body

  try {
    // Find the user by username and update the fields provided in the request body
    const user = await User.findOneAndUpdate(
      { username: username }, // Find user by username
      updateData,              // Data to update
      { new: true }            // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated user information
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, updateUser };
