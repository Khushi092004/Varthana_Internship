module.exports = {
    CREATE_EVENT: "INSERT INTO events (name, unit) VALUES ($1, $2) RETURNING id",
    GET_ALL_EVENTS: "SELECT * FROM events",
    GET_EVENT_BY_ID: "SELECT * FROM events WHERE id = $1"
  };
  