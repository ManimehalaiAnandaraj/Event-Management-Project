import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
