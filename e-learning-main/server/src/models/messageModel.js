const mongoose = require( "mongoose");

const messageSchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      ref: "Category",
    },
    senderId: {
      type: String,
      ref: "User",
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Message', messageSchema);