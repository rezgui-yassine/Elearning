const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserOTPVerificationSchema = new Schema({
  UserId: String,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
});

module.exports = mongoose.model(
  "UserOTPVerification",
  UserOTPVerificationSchema
);
