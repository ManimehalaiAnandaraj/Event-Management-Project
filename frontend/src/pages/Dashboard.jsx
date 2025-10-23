import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Dynamic backend URL
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [token]); // include token dependency

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav>
        <div className="logo">Eventify</div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/create-event">Create Event</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-container">
        <h1>All Events</h1>
        <div className="event-list">
          {events.length === 0 ? (
            "No events yet"
          ) : (
            events.map((e) => (
              <div className="event-card" key={e._id}>
                <h3>{e.title}</h3>
                <p>📅 {new Date(e.date).toLocaleString()}</p>
                <p>📍 {e.location}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
