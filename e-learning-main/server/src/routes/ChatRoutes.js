const express = require("express");

const {
  createChat,
  userChats,
  findChat,
} = require("../controllers/chatControllers");

const chatRouter = express.Router();

chatRouter.post("/create", createChat);
chatRouter.get("/:userId", userChats);
chatRouter.get("/find/:firstId/:secondId", findChat);

module.exports = chatRouter;
