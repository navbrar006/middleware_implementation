import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getDashboard } from "../controllers/protectedController.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, getDashboard);

export default router;