const express = require("express");
const courseRouter = require("./coursesRoutes");
const categoryRouter = require("./categoriesRoutes");
const attachmentRouter = require("./attachmentRoutes");
const authRouter = require("./authRoutes");
const userRouter = require("./crudUsersRoutes");
const quizRouter = require("./quizRouter");
const routerCalander = require("./eventRoutes");
// const messagesRouter = require("./messagesRoutes");
const chatRouter = require("./ChatRoutes");
const messageRouter = require("./messageRouter");

const rootRouter = express.Router();
rootRouter.use("/courses", courseRouter);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/attachments", attachmentRouter);
rootRouter.use("/auth", authRouter); // Correct usage of authRouter as middleware
rootRouter.use("/users", userRouter);
rootRouter.use("/quiz", quizRouter);
rootRouter.use("/calander", routerCalander);
rootRouter.use("/messages", messageRouter);
rootRouter.use("/chats", chatRouter);
// the path of the chats is  localhost:3000/api/chats

module.exports = rootRouter;
