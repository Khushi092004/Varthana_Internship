module.exports = {
    CREATE_ACTIVITY: `
      INSERT INTO activities (user_id, event_id, duration, distance)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
    GET_USER_ACTIVITIES: `
      SELECT a.*, e.name AS event_name, e.unit
      FROM activities a
      JOIN events e ON a.event_id = e.id
      WHERE a.user_id = $1
      ORDER BY a.recorded_at DESC;
    `
  };
  