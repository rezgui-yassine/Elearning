const mongoose = require("mongoose");
const Category = require("./Categories");
// Define the roles enumeration
const rolesEnum = ["ADMIN", "STUDENT", "FORMATEUR"];

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: rolesEnum, // Specify the enum values for the role field
    default: "STUDENT", // Set a default role if not specified
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
  },
  telephone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  isActivee: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    required: false,
  },
  activationCode: String,
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ], // Change category to categories

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
