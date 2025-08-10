const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  categoryIds: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  attachments: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attachment",
      },
      name: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
