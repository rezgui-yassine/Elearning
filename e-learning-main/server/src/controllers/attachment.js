const mongoose = require("mongoose");
const Course = require("../models/Courses");
const Attachment = require("../models/Attachments");

exports.createAttachment = async (req, res) => {
  try {
    // read the data from the request body
    const data = req.body;

    // check if the course exists
    const course = await Course.findById(data.courseId); // Change this line
    if (!course) {
      return res.status(404).send("Course not found");
    }

    // create a new attachment using the data
    const attachment = new Attachment(data);
    // save the attachment
    const savedAttachment = await attachment.save();

    // Update the course with the new attachment
    await Course.updateOne(
      { _id: data.courseId }, // And this line
      { $push: { attachments: savedAttachment._id } }
    );

    // send the saved attachment in the response
    res.status(201).json(savedAttachment);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get all attachments in a course
exports.getAllAttachmentsInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const attachments = await Attachment.find({ courseId: courseId });
    res.status(200).json(attachments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get the attachment by id
exports.getAttachmentById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // get the data from the database using the id
    const attachment = await Attachment.findById(id);
    // send the attachment in the response
    res.status(200).send(attachment);
  } catch (error) {
    res.status(500).send(error);
  }
};

//get all attachments
exports.getAllAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.find();
    res.status(200).send(attachments);
  } catch (error) {
    res.status(500).send(error);
  }
};

//update attachment by id
exports.updateAttachmentById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // get the data from the request body
    const data = req.body;
    // update the attachment
    const updatedAttachment = await Attachment.findByIdAndUpdate(id, data, {
      new: true,
    });
    // send the updated attachment in the response
    res.status(200).send(updatedAttachment);
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete attachment by id
exports.deleteAttachmentById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // delete the attachment
    const attachment = await Attachment.findByIdAndDelete(id);
    // send the deleted attachment in the response
    res.status(200).send(attachment);
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete all attachments
exports.deleteAllAttachments = async (req, res) => {
  try {
    // delete all attachments
    const attachments = await Attachment.deleteMany();
    // send the response
    res.status(204).send(attachments);
  } catch (error) {
    res.status(500).send(error);
  }
};
