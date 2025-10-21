import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).populate("event");
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTransaction = async (req, res) => {
  const { eventId, amount } = req.body;
  try {
    const transaction = await Transaction.create({
      user: req.user._id,
      event: eventId,
      amount,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    transaction.amount = req.body.amount || transaction.amount;
    transaction.status = req.body.status || transaction.status;

    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    await transaction.remove();
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
