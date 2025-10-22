import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const BookPayment = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:5000/api/events", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) setError(data.message || "Failed to fetch events");
        else setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Server error. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchEvents();
  }, [token]);

  const handleBook = async (eventId) => {
    setSuccess("");
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/payments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || "Booking failed");
      else setSuccess("Event booked successfully!");
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Book Events</h2>

        {loading && <p className="text-gray-600 text-center">Loading events...</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        {!loading && events.length === 0 && (
          <p className="text-gray-500 text-center">No events available for booking.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-gray-500 text-sm mb-1">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(event.date).toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold">Location:</span> {event.location}
                </p>
              </div>
              <button
                onClick={() => handleBook(event._id)}
                className="mt-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPayment;
