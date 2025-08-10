const express = require("express");
const { protectRoutes } = require("../middlewares/protectRoutes");

const path = require("path");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByFirstName,
  updateMyData,
  updateUsers,
  getUserForSideBare,
} = require("../controllers/crudUsers"); // Fix the casing of the file name
const multer = require("multer");
const User = require("../models/userModule"); // Assuming you have a User model defined
const jwt = require("jsonwebtoken"); // For token verification
const bcrypt = require("bcrypt"); // For password hashing

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });
const crudUserRoutes = express.Router();

/**
 * @swagger
 * /api/users/create:
 *  post:
 *    tags: ["users"]
 *    summary: Create a new user
 *    description: Create a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              role:
 *                type: string
 *              telephone:
 *                type: string
 *              address:
 *                type: string
 *              avatar:
 *                type: string
 *              bio:
 *                type: string
 *              isActivee:
 *                type: boolean
 *              activationCode:
 *                type: string
 *    responses:
 *      '201':
 *        description: User created successfully
 *      '404':
 *        description: User not created
 */
/**
 * @swagger
 * /api/users/all:
 *  get:
 *    tags: ["users"]
 *    summary: Get all users
 *    description: Get all users
 *    responses:
 *      '200':
 *        description: All users retrieved successfully
 *      '404':
 *        description: Users not found
 */

/**
 * @swagger
 * /api/users/getUserById/{id}:
 *  get:
 *    tags: ["users"]
 *    summary: Get user by id
 *    description: Get user by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: User retrieved successfully
 *      '404':
 *        description: User not found
 *      '500':
 *        description: Error retrieving user
 */

/**
 * @swagger
 * /api/users/getUserByFirstName/{firstName}:
 *  get:
 *    tags: ["users"]
 *    summary: Get user by firstName
 *    description: Get user by firstName
 *    parameters:
 *      - in: path
 *        name: firstName
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: User retrieved successfully
 *      '404':
 *        description: User not found
 *      '500':
 *        description: Error retrieving user
 */

/**
 * @swagger
 * /api/users/update/{id}:
 *   put:
 *     tags: ["users"]
 *     summary: Update user by id
 *     description: Update user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               telephone:
 *                 type: string
 *               address:
 *                 type: string
 *               isActivee:
 *                 type: boolean
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - role
 *               - telephone
 *               - address
 *               - isActivee
 *               - bio
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/delete/{id}:
 *  delete:
 *    tags: ["users"]
 *    summary: Delete user by id
 *    description: Delete user by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: User deleted successfully
 *      '404':
 *        description: User not deleted
 *      '500':
 *        description: Error deleting user
 */

//updateUserss swagger

/**
 * @swagger
 * /api/users/updateUserss/{id}:
 *   put:
 *     tags: ["users"]
 *     summary: Update user by ID
 *     description: Update user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               telephone:
 *                 type: string
 *               address:
 *                 type: string
 *               bio:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             user:
 *               $ref: '#/definitions/User'
 *       '500':
 *         description: Error updating user
 */

crudUserRoutes.post("/create", createUser);
crudUserRoutes.get("/all", getAllUsers);
crudUserRoutes.get("/getUserforsidebare", protectRoutes, getUserForSideBare);
crudUserRoutes.get("/getUserById/:id", getUserById);
crudUserRoutes.get("/getUserByFirstName/:firstName", getUserByFirstName);
crudUserRoutes.put("/update/:id", updateUserById);
crudUserRoutes.delete("/delete/:id", deleteUserById);
crudUserRoutes.put("/updateMyData", updateMyData);
crudUserRoutes.put("/updateUsers/:id", updateUsers);
crudUserRoutes.put(
  "/updateUserss/:id",
  upload.single("avatar"),
  async (req, res) => {
    try {
      const updatedData = req.body;
      if (req.file) {
        updatedData.avatar = req.file.path;
      }
      if (updatedData.password) {
        const salt = await bcrypt.genSalt(10);
        updatedData.password = await bcrypt.hash(updatedData.password, salt);
      }
      const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
      });
      res.json({ message: "Profile updated successfully", user });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  }
);
crudUserRoutes.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "./uploads", filename);
  res.sendFile(filePath);
});

module.exports = crudUserRoutes;
