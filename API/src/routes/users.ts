import express from "express";
const router = express.Router();

import UserControllers from "../controllers/UsersControllers.ts";
import { authenticateToken } from "../config/Authentification.ts";
const serviceUserControllers = new UserControllers();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *          is_success:
 *              type: boolean
 *          data: 
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: Email of user
 *                  password:
 *                      type: string
 *                      format: password
 *                  role:
 *                      type: string
 *                      enum: [USER, ADMIN]
 *       example:
 *          {
 *              data: {
 *                  email: user1@yopmail.com,
 *                  password: $2b$10$sdHYFz3A69ZHgwUVwaCar.2rNQTxhLAN7NJg5QTSLIDLPHM/WapnC,
 *                  role: USER,
 *              },
 *              is_success: true
 *          }
 */

/**
 * @openapi
 * /user/register:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                  type: string
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
 *         description: Token
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
 *         description: User details
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/User'
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     tags: [Users]
 *     summary: User update
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags: [Users]
 *     summary: User delete
 */
 
router.get("/me", authenticateToken, serviceUserControllers.getUser);
// router.patch("/me", authenticateToken, serviceUserControllers.updateUser);
router.delete("/me", authenticateToken, serviceUserControllers.deleteUser);

/**
* @openapi
* /user/users:
*   get:
*     security:
*      - bearerAuth: [] 
*     tags: [Users]
*     summary: Users information
*     description:
*     responses:
*       200:
*         description: List of users
*         content:
*           application/json:
*              schema:
*               $ref: '#/components/schemas/User'
*/
// router.post("/refreshToken", serviceUserControllers.refreshToken);
router.get("/users", authenticateToken, serviceUserControllers.getUserList);

export default router;
