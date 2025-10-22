import React from "react";
import '../styles/Events.css';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition duration-200 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        <p className="text-gray-600 mt-2">{event.description}</p>
        <p className="text-gray-500 mt-1 text-sm">
          Date: {new Date(event.date).toLocaleString()}
        </p>
        <p className="text-gray-500 mt-1 text-sm">Location: {event.location}</p>
      </div>
    </div>
  );
};

export default EventCard;
