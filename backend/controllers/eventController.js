import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  const { title, date, location } = req.body;
  try {
    const event = await Event.create({
      title,
      date,
      location,
      createdBy: req.user._id
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
