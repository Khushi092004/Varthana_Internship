const pool = require("../config/db");
const queries = require("../queries/eventQueries");

exports.createEvent = async (req, res) => {
  const { name, unit } = req.body;

  try {
    const newEvent = await pool.query(queries.CREATE_EVENT, [name, unit]);
    res.status(201).json({ 
      message: "Event created successfully", 
      event: newEvent.rows[0] 
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};


exports.getAllEvents = async (req, res) => {
  try {
    const events = await pool.query(queries.GET_ALL_EVENTS);
    res.status(200).json(events.rows);
  } catch (error) {
    console.error("Get Events Error:", error);
    res.status(500).json({ message: " Error fetching events", error: error.message });
  }
};
