const express = require("express");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Socket.io functionality here
    //just testing
    await conversation.save();
    await newMessage.save();
    res.status(200).send(newMessage);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getdMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).send([]);
    }
    res.status(200).send(conversation.messages);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
