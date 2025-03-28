import express from "express";
const router = express.Router();

import parkingControllers from "../controllers/parkingControllers";
import { authenticateToken } from "../config/Authentification";
const serviceParkingControllers = new parkingControllers();

/**
 * @swagger
 * components:
 *   schemas:
 *     Parking:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - city
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the parking
 *         name:
 *           type: string
 *           description: The name of the parking
 *         type:
 *           type: string
 *           enum: [AIRPORT]
 *           description:
 *         city:
 *           type: string
 *           description:
 *       example:
 *         id: 1
 *         name: Parking 1
 *         type: AIRPORT
 *         city: LILLE
 */

/**
 * @openapi
 * tags:
 *   name: Parkings
 *   description: The parkings managing API
 * /parking:
 *   get:
 *     security:
 *      - bearerAuth: [] 
 *     tags: [Parkings]
 *     summary: Lists all the parkings
 *     description:
 *     responses:
 *       200:
 *         description: The list of the parkings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parking'
 */
router.get("/", authenticateToken, serviceParkingControllers.getParkingsList);

/**
 * @openapi
 * /parking/{id}:
 *   get:
 *     tags: [Parkings]
 *     summary: Get the parking by id
 *     description:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The parking id
 *     responses:
 *       200:
 *         description: The parking response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parking'
 */
router.get("/:id", serviceParkingControllers.getParkingById);

/**
 * @openapi
 * /parking:
 *   post:
 *     tags: [Parkings]
 *     summary: Create a new parking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The parking's name.
 *                 example: Parking 1
 *               type:
 *                 type: string
 *                 enum: [AIRPORT, CITY, SHOPPING_CENTER]
 *                 description: The parking's type.
 *                 example: AIRPORT
 *               city:
 *                 type: string
 *                 description: The parking's city.
 *                 example: BEAUVAIS
 *     description:
 *     responses:
 *       200:
 *         description: The list of the parkings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parking'
 */
router.post("/", serviceParkingControllers.insertParking);

/**
 * @openapi
 * /parking/{id}:
 *   put:
 *     tags: [Parkings]
 *     summary: Update a parking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The parking's name.
 *                 example: Parking 1
 *               type:
 *                 type: string
 *                 enum: [AIRPORT, CITY, SHOPPING_CENTER]
 *                 description: The parking's type.
 *                 example: AIRPORT
 *               city:
 *                 type: string
 *                 description: The parking's city.
 *                 example: BEAUVAIS
 *     description:
 *     responses:
 *       200:
 *         description: The list of the parkings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parking'
 */
router.put("/:id", serviceParkingControllers.updateParking);

/**
 * @openapi
 * /parking/{id}:
 *   delete:
 *     tags: [Parkings]
 *     summary: Delete a parking
 *     requestBody:
 *       required: true
 *     description:
 *     responses:
 *       200:
 *         description: The list of the parkings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parking'
 */
router.delete("/:id", serviceParkingControllers.deleteParking);

// export default router;
