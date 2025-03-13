import express from "express";
import { authenticateToken } from "../config/Authentification";
import RechargeControllers from "../controllers/RechargeControllers";
const router = express.Router();

const serviceRechargeControllers = new RechargeControllers();


router.post("/add", authenticateToken, serviceRechargeControllers.add);


export default router;