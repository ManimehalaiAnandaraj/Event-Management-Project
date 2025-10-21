import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", protect, getTransactions);
router.post("/create", protect, createTransaction);
router.put("/:id", protect, updateTransaction);
router.delete("/:id", protect, deleteTransaction);

export default router;
