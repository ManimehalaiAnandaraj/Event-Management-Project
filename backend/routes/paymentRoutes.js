import express from "express";
import { createPayment, getPayments } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getPayments).post(protect, createPayment);

export default router;
