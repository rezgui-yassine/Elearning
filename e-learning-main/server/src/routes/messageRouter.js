const express = require("express");
const {
  addMessage,
  getMessages,
} = require("../controllers/messageControllers");

const messageRouter = express.Router();

messageRouter.post("/crateMessage", addMessage);

messageRouter.get("/:categoryId", getMessages);

module.exports = messageRouter;
