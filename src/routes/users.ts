import express from "express";
const router = express.Router();

import UserControllers from "../controllers/UserControllers";
import { authenticateToken } from "../config/Authentification";
const serviceUserControllers = new UserControllers();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         email:
 *           type: string
 *           description: Email of user
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         email: user1@yopmail.com
 *         password: 1234
 */

/**
 * @openapi
 * /user/register:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user and return token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     description:
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/register", serviceUserControllers.register);

/**
 * @openapi
 * /user/login:
 *   post:
 *     tags: [Users]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                  type: string
 *     description:
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/login", serviceUserControllers.login);

/**
 * @openapi
 * /user/me:
 *   get:
 *     security:
 *      - bearerAuth: [] 
 *     tags: [Users]
 *     summary: User information
 *     description:
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/User'
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     tags: [Users]
 *     summary: Update User 
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags: [Users]
 *     summary: Delete User
 */
 
router.get("/me", authenticateToken, serviceUserControllers.getUser);
// router.patch("/me", authenticateToken, serviceUserControllers.updateUser);
router.delete("/me", authenticateToken, serviceUserControllers.deleteUser);

// router.post("/refreshToken", serviceUserControllers.refreshToken);
router.get("/users", authenticateToken, serviceUserControllers.getUserList);


export default router;
