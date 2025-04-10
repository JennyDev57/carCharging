import express from "express";
import { authenticateToken } from "../config/Authentification";
import RechargeControllers from "../controllers/RechargeControllers";
const router = express.Router();

const serviceRechargeControllers = new RechargeControllers();

/**
 * @swagger
 * components:
 *      schemas:
 *          Recharge:
 *              type: object
 *              required: 
 *                  - off_pick_hour
 *              properties:
 *                  is_success:
 *                      type: boolean
 *                  data: 
 *                      type: object
 *                      properties:
 *
 */

/**
 * @openapi
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
 *               start_off_pick_hour: 
 *                  type: string
 *               end_off_pick_hour: 
 *                  type: string
 *               start_full_hour: 
 *                  type: string
 *               end_full_hour: 
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