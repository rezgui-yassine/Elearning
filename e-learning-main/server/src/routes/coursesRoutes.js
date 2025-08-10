const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const Attachment = require("../models/Attachments");
const Course = require("../models/Courses");
const Review = require("../models/Review");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  getAllCoursesInCategory,
} = require("../controllers/courses");
const User = require("../models/userModule");
const mongoose = require("mongoose");
const courseRouter = express.Router();

const dir = "./files";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
// 1) Create a new course

/**
 * @swagger
 * /api/courses/create:
 *   post:
 *     tags: [Courses]
 *     summary: Create a new course
 *     description: Create a new course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the course
 *               categoryIds:
 *                 type: string
 *                 description: The ID of the category to which the course belongs
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the attachment
 *                     name:
 *                       type: string
 *                       description: The name of the attachment
 *     responses:
 *       '201':
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '500':
 *         description: Internal server error
 */

// 2) Get all courses

/**
 * @swagger
 * /api/courses/all:
 *   get:
 *     tags: [Courses]
 *     summary: Get all courses
 *     description: Retrieve all courses
 *     responses:
 *       '200':
 *         description: Successfully retrieved all courses
 */

// 3) Get a course by ID

/**
 * @swagger
 * /api/courses/getCoursById/{id}:
 *   get:
 *     tags: [Courses]
 *     summary: Get a course by ID
 *     description: Retrieve a course by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the course
 */

// 4) Update a course by ID

/**
 * @swagger
 * /api/courses/update/{id}:
 *   put:
 *     tags: [Courses]
 *     summary: Update a course by ID
 *     description: Update a course by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the course
 *               categoryIds:
 *                 type: string
 *                 description: The ID of the category to which the course belongs
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the attachment
 *                     name:
 *                       type: string
 *                       description: The name of the attachment
 *     responses:
 *       '200':
 *         description: Course updated successfully
 *       '500':
 *         description: Internal server error
 */

// 5) Delete a course by ID

/**
 * @swagger
 * /api/courses/delete/{id}:
 *   delete:
 *     tags: [Courses]
 *     summary: Delete a course by ID
 *     description: Delete a course by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Course deleted successfully
 *       '500':
 *         description: Internal server error
 */

// 6) Get all courses in a category

/**
 * @swagger
 * /api/courses/getAllCoursesInCategory/{categoryId}:
 *   get:
 *     tags: [Courses]
 *     summary: Get all courses in a category
 *     description: Retrieve all courses in a category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved all courses in the category
 *       '404':
 *         description: No courses found in the category
 *       '500':
 *         description: Internal server error
 */

// 7) Upload a file to a course
/**
 * @swagger
 * /api/courses/upload/{courseId}:
 *   post:
 *     tags: [Courses]
 *     summary: Upload a file to a course
 *     description: Upload a file to a course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: binary
 *     responses:
 *       '201':
 *         description: File uploaded successfully
 *       '400':
 *         description: Bad request - No file was uploaded or invalid file format. Name and course ID are required.
 *       '500':
 *         description: Internal server error
 */

// 8) Get files for a course

/**
 * @swagger
 * /api/courses/get-files/{courseId}:
 *   get:
 *     tags: [Courses]
 *     summary: Get files for a course
 *     description: Retrieve files for a course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved files for the course
 *       '404':
 *         description: Files not found
 *       '500':
 *         description: Internal server error
 */

// 9) Get a file for a course

/**
 * @swagger
 * /api/courses/get-file/{file}:
 *   get:
 *     tags: [Courses]
 *     summary: Get a file for a course
 *     description: Retrieve a file for a course
 *     parameters:
 *       - in: path
 *         name: file
 *         required: true
 *         description: The name of the file to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the file
 */

// 10) Add a review to a course
/**
 * @swagger
 * /api/courses/add-review/{courseId}:
 *   post:
 *     tags: [Courses]
 *     summary: Add a review to a course
 *     description: Add a review to a course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review:
 *                 type: string
 *                 description: The review
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *     responses:
 *       '201':
 *         description: Review added successfully
 *       '400':
 *         description: Bad request - Invalid inputs
 *       '404':
 *         description: Course not found
 *       '500':
 *         description: Internal server error
 */

// 11) Get reviews for a course
/**
 * @swagger
 * /api/courses/get-reviews/{courseId}:
 *   get:
 *     tags: [Courses]
 *     summary: Get reviews for a course
 *     description: Retrieve reviews for a course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved reviews for the course
 *       '404':
 *         description: No reviews found for this course
 *       '500':
 *         description: Internal server error
 */

// 12) Get all reviews

/**
 * @swagger
 * /api/courses/all-reviews:
 *   get:
 *     tags: [Courses]
 *     summary: Get all reviews
 *     description: Retrieve all reviews
 *     responses:
 *       '200':
 *         description: Successfully retrieved all reviews
 *       '500':
 *         description: Internal server error
 */

courseRouter.post("/create", createCourse);
courseRouter.get("/all", getAllCourses);
courseRouter.get("/getCoursById/:id", getCourseById);
courseRouter.put("/update/:id", updateCourseById);
courseRouter.delete("/delete/:id", deleteCourseById);
courseRouter.get(
  "/getAllCoursesInCategory/:categoryId",
  getAllCoursesInCategory
);

courseRouter.post(
  "/upload/:courseId",
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file was uploaded" });
    }

    const name = req.body.name;
    const file = req.file.path;
    const courseId = req.params.courseId;

    if (!name || !courseId) {
      return res
        .status(400)
        .json({ message: "Name and course ID are required" });
    }

    try {
      const attachment = await Attachment.create({
        name: name,
        file: file,
        courseId: courseId,
      });

      const course = await Course.findById(courseId);

      if (!course) {
        return res
          .status(404)
          .json({ status: "error", message: "Course not found" });
      }

      course.attachments.push({ id: attachment._id, name: attachment.name });
      await course.save();

      res
        .status(201)
        .json({ status: "ok", message: "File uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: error.toString() });
    }
  }
);

courseRouter.get("/get-files/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const attachments = await Attachment.find({ courseId: courseId });

    if (attachments.length === 0) {
      return res
        .status(404)
        .send({ status: "error", message: "Files not found" });
    }

    res.send({ status: "ok", data: attachments });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

courseRouter.get("/get-file/:file", function (req, res) {
  var file = req.params.file;
  var fileLocation = path.join(__dirname, "../../files", file);
  res.sendFile(fileLocation, {
    headers: { "Content-Type": "application/pdf" },
  });
});

courseRouter.post("/add-review/:courseId", async (req, res) => {
  console.log("Request body:", req.body); // Log the request body

  try {
    const courseId = req.params.courseId;
    const { review, userId } = req.body;

    // Validate inputs
    if (
      !mongoose.Types.ObjectId.isValid(courseId) ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      typeof review !== "string"
    ) {
      return res.status(400).json({
        status: "error",
        message: "Invalid inputs",
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        status: "error",
        message: "Course not found",
      });
    }

    // Create new review
    const newReview = await Review.create({
      courseId: courseId,
      review: review,
      userId: userId,
    });

    res.status(201).json({ status: "ok", data: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.toString() });
  }
});

// Ajoutez une nouvelle route pour récupérer les avis
courseRouter.get("/get-reviews/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Assurez-vous que courseId est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res
        .status(400)
        .send({ status: "error", message: "Invalid course ID" });
    }

    // Recherchez les avis correspondants au cours spécifié
    const reviews = await Review.find({ courseId: courseId });

    // Vérifiez s'il y a des avis trouvés
    if (reviews.length === 0) {
      return res
        .status(404)
        .send({ status: "error", message: "No reviews found for this course" });
    }

    // Renvoie les avis trouvés
    res.status(200).send({ status: "ok", data: reviews });
  } catch (error) {
    // Gérer les erreurs
    console.error(error);
    res.status(500).send({ status: "error", message: error.message });
  }
});

// get all reviews
courseRouter.get("/all-reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).send({ status: "ok", data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", message: error.message });
  }
});

module.exports = courseRouter;
