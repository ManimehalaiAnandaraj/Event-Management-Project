import React from "react";

const CalendarEvent = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {events.map((e) => (
        <div
          key={e._id}
          className="bg-indigo-100 p-3 rounded shadow hover:bg-indigo-200 transition duration-200"
        >
          <h4 className="font-semibold">{e.title}</h4>
          <p className="text-sm">{new Date(e.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CalendarEvent;
