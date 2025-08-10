const mongoose = require("mongoose");
const User = require("../models/userModule"); // Import your User model

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/LMSDb2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an admin user
const adminUser = new User({
  firstName: "Farouk",
  lastName: "Mestiri",
  email: "admin@example.com",
  role: "Admin", // Set the role to Admin
  password: "adminPassword", // You should hash the password before saving in a real application
});

// Save the admin user to the database
adminUser.save((err, savedAdmin) => {
  if (err) {
    console.error("Error seeding admin:", err);
  } else {
    console.log("Admin seeded successfully:", savedAdmin);
  }
});
