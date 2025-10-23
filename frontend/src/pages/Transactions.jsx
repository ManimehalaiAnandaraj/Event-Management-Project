import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingAmount, setEditingAmount] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Dynamic backend URL
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  // Fetch events for booking
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchEvents();
  }, [token]);

  // Create transaction
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!eventId || !amount) return;
    try {
      const res = await fetch(`${BASE_URL}/api/transactions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId, amount }),
      });
      if (!res.ok) throw new Error("Failed to create transaction");
      await res.json();
      setAmount("");
      setEventId("");
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete transaction
  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing
  const handleEdit = (id, currentAmount) => {
    setEditingId(id);
    setEditingAmount(currentAmount);
  };

  // Save edited transaction
  const handleSave = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/transactions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: editingAmount }),
      });
      setEditingId(null);
      setEditingAmount("");
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingAmount("");
  };

  return (
    <div className="transactions-container">
      <h2>Transactions</h2>

      <form onSubmit={handleCreate} className="transaction-form">
        <select value={eventId} onChange={(e) => setEventId(e.target.value)} required>
          <option value="">Select Event</option>
          {events.map((e) => (
            <option key={e._id} value={e._id}>
              {e.title}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add Transaction</button>
      </form>

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          transactions.map((t) => (
            <div className="transaction-card" key={t._id}>
              <p>Event: {t.event?.title || "Deleted Event"}</p>
              {editingId === t._id ? (
                <>
                  <input
                    type="number"
                    value={editingAmount}
                    onChange={(e) => setEditingAmount(e.target.value)}
                  />
                  <button onClick={() => handleSave(t._id)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <p>Amount: ${t.amount ?? 0}</p>
                  <p>Status: {t.status || "Pending"}</p>
                  <button onClick={() => handleEdit(t._id, t.amount)}>Edit</button>
                  <button onClick={() => handleDelete(t._id)}>Delete</button>
                </>
              )}
            </div>
          ))
        )}
      </div>

      <button onClick={() => navigate("/dashboard")} className="back-btn">
        Back to Dashboard
      </button>
    </div>
  );
};

export default Transactions;
