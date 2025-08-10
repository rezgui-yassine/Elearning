const User = require("../models/userModule");
const jwt = require("jsonwebtoken");

exports.protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      console.log("No token in cookies");
      return res.status(401).send({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, "secretkey123");
    if (!decoded) {
      console.log("Invalid token");
      return res.status(401).send({ error: "Unauthorized" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("User not found");
      return res.status(401).send({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error in protectRoutes", error.message);
    res.status(500).send({ error: "error.message" });
  }
};
