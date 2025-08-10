const express = require("express");
const {
  signup,
  login,
  authentificateToken,
  verifyUser,
  activateUser,
  deactivateUser,
  getNotifications,
  getNewUsers,
  logout,
} = require("../controllers/authConstroller");

const authRouter = express.Router();
//YAML
//itha fama haja fi west haja eb3ed zouz hrouf
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: ["auth"]
 *     summary: Create a new user
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *     responses:
 *       201:
 *         description: User created successfully
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    tags: ["auth"]
 *    summary: Login to the application
 *    description: Login to the application
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: User logged in successfully
 *      '401':
 *        description: Invalid credentials
 *      '500':
 *        description: Server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/auth/me:
 *  get:
 *    tags: ["auth"]
 *    summary: Get current user by token
 *    description: Get current user by token
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: A user object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    firstName:
 *                      type: string
 *                    lastName:
 *                      type: string
 *      '404':
 *        description: User not found
 *      '401':
 *        description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/verif/{activationCode}:
 *  post:
 *    tags: ["auth"]
 *    summary: Verify user
 *    description: Verify user
 *    parameters:
 *      - in: path
 *        name: activationCode
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: User verified successfully
 */
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: ["auth"]
 *     summary: Logout user
 *     description: Logout user
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 */
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", authentificateToken);
authRouter.post("/verif/:activationCode", verifyUser);
authRouter.put("/:userId/activate", activateUser);
// authRouter.post("/verifyuser/:activationCode", verifyUser);
// routes.js

  authRouter.put('/:userId/deactivate', deactivateUser);

module.exports = authRouter;
