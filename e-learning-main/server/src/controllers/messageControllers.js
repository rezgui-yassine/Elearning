const MessageModel = require("../models/messageModel");

const addMessage = async (req, res) => {
  const { categoryId, senderId, text } = req.body;
  const message = new MessageModel({
    categoryId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { categoryId } = req.params;
  try {
    console.log("categoryId:", categoryId);
    const result = await MessageModel.find({ categoryId: categoryId }).populate('senderId');
    console.log("result:", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  addMessage,
  getMessages,
};
