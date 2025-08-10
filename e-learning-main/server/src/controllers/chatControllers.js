const ChatModel = require("../models/chatModel");
const UserModel = require("../models/userModule");
const createChat = async (req, res) => {
  const sender = await UserModel.findById(req.body.senderId);
  const receiver = await UserModel.findById(req.body.receiverId);

  const newChat = new ChatModel({
    members: [sender, receiver],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userChats = async (req, res) => {
  const sender = await UserModel.findById(req.params.userId);
  console.log(sender);
  try {
    const chat = await ChatModel.find({
      members: { $elemMatch: { _id: sender._id } },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  const sender = await UserModel.findById(req.params.firstId);
  const receiver = await UserModel.findById(req.params.secondId);

  try {
    const chat = await ChatModel.findOne({
      members: { $all: [sender, receiver] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createChat,
  userChats,
  findChat,
};
