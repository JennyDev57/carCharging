import express from "express";
import { authenticateToken } from "../config/Authentification.ts";
import RechargeControllers from "../controllers/RechargeControllers.ts";
const router = express.Router();

const serviceRechargeControllers = new RechargeControllers();

/**
 * @swagger
 * components:
 *      schemas:
 *          Recharge:
 *              type: object
 *              required: 
 *                  - start_date
 *                  - end_date
 *              properties:
 *                  is_success:
 *                      type: boolean
 *                  data: 
 *                      type: object
 *                      properties:
 *
 */

/**
 * @swagger
 * /recharge/add:
 *   post:
 *     tags: [Recharge]
 *     summary: Add new recharge time
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date: 
 *                  type: string
 *               end_date: 
 *                  type: string
 *     description: Add new recharge time
 *     responses:
 *       200:
 *         description: Success / Error Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recharge'
 */
router.post("/add", authenticateToken, serviceRechargeControllers.add);


export default router;