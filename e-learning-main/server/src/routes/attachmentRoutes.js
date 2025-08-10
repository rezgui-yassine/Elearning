const express = require("express");
const {
  createAttachment,
  getAllAttachments,
  getAttachmentById,
  updateAttachmentById,
  deleteAttachmentById,
  getAllAttachmentsInCourse,
} = require("../controllers/attachment");

const attachmentRouter = express.Router();


// 1) Create a new attachment
/**
 * @swagger
 * /api/attachments/create:
 *   post:
 *     tags: [Attachment]
 *     summary: Create a new attachment
 *     description: Create a new attachment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *               name:
 *                 type: string
 *               file:
 *                 type: string
 *             required:
 *               - courseId
 *               - name
 *               - file
 *     responses:
 *       '201':
 *         description: Attachment created successfully
 *       '400':
 *         description: Bad request - Invalid inputs
 *       '500':
 *         description: Internal server error
 */


// 2) Get all attachments

/**
 * @swagger
 * /api/attachments/all:
 *   get:
 *     tags: [Attachment]
 *     summary: Get all attachments
 *     description: Retrieve all attachments
 *     responses:
 *       '200':
 *         description: Successfully retrieved all attachments
 *       '500':
 *         description: Internal server error
 */


// 3) Get all attachments in a course

/**
 * @swagger
 * /api/attachments/getAllAttachmentsInCourse/{courseId}:
 *   get:
 *     tags: [Attachment]
 *     summary: Get all attachments in a course
 *     description: Retrieve all attachments in a course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The course ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved all attachments in a course
 *       '500':
 *         description: Internal server error
 */

// 4) Get attachment by ID

/**
 * @swagger
 * /api/attachments/getAttachmentById/{id}:
 *   get:
 *     tags: [Attachment]
 *     summary: Get attachment by ID
 *     description: Retrieve attachment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true 
 *         description: The attachment ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved attachment by ID
 *       '500':
 *         description: Internal server error
 */

// 5) Update attachment by ID

/**
 * @swagger
 * /api/attachments/update/{id}:
 *   put:
 *     tags: [Attachment]
 *     summary: Update attachment by ID
 *     description: Update attachment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The attachment ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *               name:
 *                 type: string
 *               file:
 *                 type: string
 *             required:
 *               - courseId
 *               - name
 *               - file
 *     responses:
 *       '200':
 *         description: Attachment updated successfully
 *       '500':
 *         description: Internal server error
 */


// 6) Delete attachment by ID
/**
 * @swagger
 * /api/attachments/delete/{id}:
 *   delete:
 *     tags: [Attachment]
 *     summary: Delete attachment by ID
 *     description: Delete attachment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The attachment ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Attachment deleted successfully
 *       '500':
 *         description: Internal server error
 */


attachmentRouter.post("/create", createAttachment);
attachmentRouter.get("/all", getAllAttachments);
attachmentRouter.get(
  "/getAllAttachmentsInCourse/:courseId",
  getAllAttachmentsInCourse
);

attachmentRouter.get("/getAttachmentById/:id", getAttachmentById);
attachmentRouter.put("/update/:id", updateAttachmentById);
attachmentRouter.delete("/delete/:id", deleteAttachmentById);

module.exports = attachmentRouter;
