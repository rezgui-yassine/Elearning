const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getAllCoursesInCategory,
  getImage,
  joinCategory,
  getJoinedCategories,
} = require("../controllers/categories");
const { upload } = require("../controllers/categories.js");

const categoryRouter = express.Router();
const authentificateToken = require("../middlewares/fetchUser.js");

categoryRouter.post("/create", upload.single("imageUrl"), createCategory);

// ------------------- Swagger Documentation ------------------------
// 1)get all category en utulisant swagger
/**
 * @swagger
 * /api/categories/all:
 *  get:
 *   tags: [Categories]
 *   summary: Get all categories
 *   description: Get all categories
 *   responses:
 *     200:
 *       description: A list of categories
 */

// 2)get category by id en utulisant swagger

/**
 * @swagger
 * /api/categories/getCategoryById/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get category by id
 *     description: Get category by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       '200':
 *         description: A category by id
 */

// 3)get all courses in category en utulisant swagger
/**
 * @swagger
 * /api/categories/getAllCoursesInCategory/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get all courses in category
 *     description: Get all courses in a category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category
 *     responses:
 *       '200':
 *         description: A list of courses in the category
 */

// 4)update category by id en utulisant swagger

/**
 * @swagger
 * /api/categories/update/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Update category by id
 *     description: Update category by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A category updated
 */

// 5)delete category by id en utulisant swagger

/**
 *@swagger
 * /api/categories/delete/{id}:
 *  delete:
 *   tags: [Categories]
 *  summary: Delete category by id
 *  description: Delete category by id
 *  parameters:
 *   - in: path
 *     name: id
 *  schema:
 *   type: string
 *   required: true
 *   description: Category ID
 *  responses:
 *    '200':
 *     description: A category deleted
 */

// 6)get image of a specific category en utulisant swagger

/**
 * @swagger
 * /api/categories/getImage/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get image of a specific category
 *     description: Get image of a specific category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       '200':
 *         description: Successful response
 */

// 7)join category en utulisant swagger
/**
 * @swagger
 * /api/categories/join/{categoryId}:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Join a category
 *     description: Join a specific category by its ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to join
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully joined the category
 *       '401':
 *         description: Unauthorized - Missing or invalid authentication token
 */

// 8)get joined categories en utulisant swagger
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/categories/joined:
 *   get:
 *     tags: [Categories]
 *     summary: Get joined categories
 *     description: Get the categories that the user has joined
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved joined categories
 *       '401':
 *         description: Unauthorized - Missing or invalid authentication token
 */

categoryRouter.get("/all", getAllCategories);
categoryRouter.get("/getCategoryById/:id", getCategoryById);
categoryRouter.get("/getAllCoursesInCategory/:id", getAllCoursesInCategory);
categoryRouter.put("/update/:id", updateCategoryById);
categoryRouter.delete("/delete/:id", deleteCategoryById);

// Route for getting image of a specific category
categoryRouter.get("/getImage/:id", getImage); // Include ':id' as a parameter
categoryRouter.post("/join/:categoryId", authentificateToken, joinCategory);
categoryRouter.get("/joined", authentificateToken, getJoinedCategories); // Define route for getting joined categories

module.exports = categoryRouter;
