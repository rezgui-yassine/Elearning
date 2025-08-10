// middleware/fetchUser.js
const jwt = require("jsonwebtoken");
const createError = require("../utils/appError");
const User = require("../models/userModule");

// Middleware function to fetch user information based on JWT token
const fetchUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new createError("Unauthorized", 401));
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, "secretkey123");

    // Fetch user information based on the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new createError("User not found", 404));
    }

    // Attach user information to the request object
    req.user = user;

    next();
  } catch (err) {
    return next(new createError("Unauthorized", 401));
  }
};

module.exports = fetchUser;
