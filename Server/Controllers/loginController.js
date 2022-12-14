const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

//import mongoose model
const User = require("../Models/userModel");

// Create new admin
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  if (!name || !email || !password || !role || !phone) {
    res.status(400);
    throw new Error("please fill all required fields");
  }

  // Check if user alredy exists with provided email
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("This email address is already being used");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create admin
  const user = await User.create({
    name,
    email,
    role,
    phone,
    password: hashedPassword,
  });

  if (user) {
    res.status(201);
    res.json("User added to the system successfully !");
  } else {
    res.status(400);
    throw new Error("Invalid user ! please check again");
  }
});

// Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check details to fetch user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      date: user.register_date,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = {
  createUser,
  loginUser,
};
