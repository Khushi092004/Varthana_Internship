module.exports = {
    CREATE_ACTIVITY: `
      INSERT INTO activities (user_id, event_id, duration, distance)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
    
  };
  