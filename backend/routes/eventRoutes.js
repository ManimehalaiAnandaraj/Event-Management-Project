import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createEvent, getEvents } from "../controllers/eventController.js";

const router = express.Router();

router.post("/create", protect, createEvent);
router.get("/", protect, getEvents);

export default router;
