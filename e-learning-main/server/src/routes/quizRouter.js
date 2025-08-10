const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Quiz = require("../models/Quiz");
const fetchUser = require("../middlewares/fetchUser");

/**
 * @swagger
 *
 * /api/quiz/fetchallquiz:
 *   get:
 *     tags: ["quizs"]
 *     summary: Fetch all quizzes
 *     description: Fetch all quizzes. Login required. This endpoint uses the fetchUser middleware to authenticate the user and attach user information to the request object.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   question:
 *                     type: string
 *                   option1:
 *                     type: string
 *                   option2:
 *                     type: string
 *                   option3:
 *                     type: string
 *                   option4:
 *                     type: string
 *                   answer:
 *                     type: string
 *                   title:
 *                     type: string
 *                   mcq:
 *                     type: string
 *                   code:
 *                     type: string
 *       '500':
 *         description: Internal Server Error
 */

const quizRouter = express.Router();

// ROUTE 1: Get All the QUIZ using : GET "/api/quiz/getuser" .Login required
quizRouter.get("/fetchallquiz", fetchUser, async (req, res) => {
  try {
    const quizs = await Quiz.find();
    res.json(quizs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Fetch all the quizzes without authentication
quizRouter.get("/fetchallquiznoauthentication", async (req, res) => {
  try {
    const quizs = await Quiz.find();
    res.json(quizs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 * /api/quiz/addquiz:
 *   post:
 *     tags: ["quizs"]
 *     summary: Add a new quiz
 *     description: Add a new quiz. Login required. This endpoint uses the fetchUser middleware to authenticate the user and attach user information to the request object.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               option1:
 *                 type: string
 *               option2:
 *                 type: string
 *               option3:
 *                 type: string
 *               option4:
 *                 type: string
 *               answer:
 *                 type: string
 *               title:
 *                 type: string
 *               mcq:
 *                 type: string
 *               code:
 *                 type: string
 *             required:
 *               - question
 *               - option1
 *               - option2
 *               - option3
 *               - option4
 *               - answer
 *               - title
 *               - mcq
 *               - code
 *     responses:
 *       '200':
 *         description: Quiz added successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

// ROUTE 3: Add a new quiz using : POST "/api/quizs/addquiz" .Login required
quizRouter.post(
  "/addquiz",
  fetchUser, // Use fetchUser middleware to authenticate user
  [
    body("question", "Enter the question properly").isLength({ min: 5 }),
    body("option1", "option1 must be at least 3 characters").isLength({
      min: 3,
    }),
    body("option2", "option2 must be at least 3 characters").isLength({
      min: 3,
    }),
    body("option3", "option3 must be at least 3 characters").isLength({
      min: 3,
    }),
    body("option4", "option4 must be at least 3 characters").isLength({
      min: 3,
    }),
    body("answer", "answer must be at least 3 characters").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const {
        question,
        option1,
        option2,
        option3,
        option4,
        answer,
        title,
        mcq,
        code,
      } = req.body;

      // If there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user ? req.user.id : null; // Get the user ID if authenticated
      const user = req.user ? req.user : null; // Get the user object if authenticated

      const quiz = new Quiz({
        question,
        option1,
        option2,
        option3,
        option4,
        answer,
        title,
        mcq,
        code,
        user: userId, // Save the user ID in the quiz
      });
      const savedQuiz = await quiz.save();

      // Send the saved quiz in the response
      res.json({ quiz: savedQuiz, user });
      console.log(user ? user.id : "Unknown user");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/**
 * @swagger
 * /api/quiz/updatequiz/{id}:
 *   put:
 *     tags: ["quizs"]
 *     summary: Update an existing quiz
 *     description: Update an existing quiz. Login required. This endpoint uses the fetchUser middleware to authenticate the user and attach user information to the request object.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               option1:
 *                 type: string
 *               option2:
 *                 type: string
 *               option3:
 *                 type: string
 *               option4:
 *                 type: string
 *               answer:
 *                 type: string
 *               title:
 *                 type: string
 *               mcq:
 *                 type: string
 *               code:
 *                 type: string
 *             required:
 *               - question
 *               - option1
 *               - option2
 *               - option3
 *               - option4
 *               - answer
 *               - title
 *               - mcq
 *               - code
 *     responses:
 *       '200':
 *         description: Quiz updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

// ROUTE 4: Update an existing quiz using : PUT "/api/quiz/updatequiz/:id" .Login required
quizRouter.put("/updatequiz/:id", fetchUser, async (req, res) => {
  const {
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    title,
    mcq,
    code,
  } = req.body;

  // Create a new quiz object
  const newQuiz = {};
  if (question) {
    newQuiz.question = question;
  }
  if (option1) {
    newQuiz.option1 = option1;
  }
  if (option2) {
    newQuiz.option2 = option2;
  }
  if (option3) {
    newQuiz.option3 = option3;
  }
  if (option4) {
    newQuiz.option4 = option4;
  }
  if (answer) {
    newQuiz.answer = answer;
  }
  if (title) {
    newQuiz.title = title;
  }
  if (mcq) {
    newQuiz.mcq = mcq;
  }
  if (code) {
    newQuiz.code = code;
  }

  // Find the quiz to be updated and update it
  try {
    var quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      res.status(404).send("Not Found");
    }
    // Update the quiz only if the user ID matches
    // You may want to add additional checks here if needed
    if (String(quiz.user) !== String(req.user.id)) {
      return res.status(403).send("Unauthorized"); // Return 403 Forbidden if user is not authorized to update the quiz
    }
    quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { $set: newQuiz },
      { new: true }
    );
    res.json({ quiz });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 5: Update an existing quiz using : PUT "/api/quiz/updatecode/:id" .Login required
quizRouter.put("/updatecode/:id", fetchUser, async (req, res) => {
  const { code } = req.body;

  // Create a new quiz object
  const newQuiz = {};
  if (code) {
    newQuiz.code = code;
  }

  const quizId = req.params.id;

  try {
    // Find the quiz to be updated
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send("Not Found");
    }

    // Update the quiz with the new code
    if (String(quiz.user) !== String(req.user.id)) {
      return res.status(403).send("Unauthorized"); // Return 403 Forbidden if user is not authorized to update the quiz
    }
    await Quiz.updateMany({ _id: quizId }, { $set: newQuiz });

    // Fetch the updated quiz
    const updatedQuiz = await Quiz.findById(quizId);

    res.json({ quiz: updatedQuiz });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 6: Delete an existing quiz using : DELETE "/api/quiz/deletequiz/:id" .Login required
quizRouter.delete("/deletequiz/:id", fetchUser, async (req, res) => {
  // Find the quiz to be deleted and delete it
  try {
    let quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send("Not Found");
    }
    // Delete the quiz
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ success: "Quiz has been deleted" });
    console.log(req.user.id);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = quizRouter;
