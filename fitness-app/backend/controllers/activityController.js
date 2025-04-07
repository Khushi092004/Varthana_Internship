const pool = require("../config/db");
const queries = require("../queries/activityQueries");

exports.createActivity = async (req, res) => {
  const { event_id, duration, distance } = req.body;
  const user_id = req.user.id;

  try {
    const newActivity = await pool.query(queries.CREATE_ACTIVITY, [
      user_id,
      event_id,
      duration,
      distance
    ]);

    res.status(201).json({
      message: " Activity recorded",
      activity: newActivity.rows[0]
    });
  } catch (error) {
    console.error("Create Activity Error:", error);
    res.status(500).json({ message: "Error saving activity", error: error.message });
  }
};

exports.getUserActivities = async (req, res) => {
  const user_id = req.user.id;

  try {
    const activities = await pool.query(queries.GET_USER_ACTIVITIES, [user_id]);
    res.status(200).json({ activities: activities.rows });
  } catch (error) {
    console.error("Get Activities Error:", error);
    res.status(500).json({ message: " Error fetching activities", error: error.message });
  }
};
