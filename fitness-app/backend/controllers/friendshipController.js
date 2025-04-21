const pool = require("../config/db");
const queries = require("../queries/friendshipQueries");

// Send Friend Request
exports.sendFriendRequest = async (req, res) => {
  const requester_id = req.user.id;
  const { receiver_id } = req.body;

  try {
    // Check for existing request
    const existing = await pool.query(queries.CHECK_EXISTING_REQUEST, [requester_id, receiver_id]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Friend request already exists or you're already friends." });
    }

    const result = await pool.query(queries.CREATE_FRIEND_REQUEST, [requester_id, receiver_id]);
    res.status(201).json({ message: "Friend request sent", friendship: result.rows[0] });
  } catch (error) {
    console.error("Send Friend Request Error:", error);
    res.status(500).json({ message: "Error sending friend request", error: error.message });
  }
};

// Accept Friend Request
exports.acceptFriendRequest = async (req, res) => {
  const receiver_id = req.user.id;
  const { requester_id } = req.body;

  try {
    const result = await pool.query(queries.ACCEPT_FRIEND_REQUEST, [requester_id, receiver_id]);
    res.status(200).json({ message: "Friend request accepted", friendship: result.rows[0] });
  } catch (error) {
    console.error("Accept Friend Request Error:", error);
    res.status(500).json({ message: "Error accepting friend request", error: error.message });
  }
};

// Reject Friend Request
exports.rejectFriendRequest = async (req, res) => {
  const receiver_id = req.user.id;
  const { requester_id } = req.body;

  try {
    const result = await pool.query(queries.REJECT_FRIEND_REQUEST, [requester_id, receiver_id]);
    res.status(200).json({ message: "Friend request rejected", friendship: result.rows[0] });
  } catch (error) {
    console.error("Reject Friend Request Error:", error);
    res.status(500).json({ message: "Error rejecting friend request", error: error.message });
  }
};

// Get User Friends
exports.getUserFriends = async (req, res) => {
  const user_id = req.user.id;

  try {
    const friends = await pool.query(queries.GET_USER_FRIENDS, [user_id]);
    res.status(200).json(friends.rows);
  } catch (error) {
    console.error("Get Friends Error:", error);
    res.status(500).json({ message: "Error fetching friends", error: error.message });
  }
};

// Get Pending Friend Requests
exports.getPendingRequests = async (req, res) => {
  const user_id = req.user.id;

  try {
    const pending = await pool.query(queries.GET_PENDING_REQUESTS, [user_id]);
    res.status(200).json(pending.rows);
  } catch (error) {
    console.error("Get Pending Requests Error:", error);
    res.status(500).json({ message: "Error fetching pending requests", error: error.message });
  }
};

// Get Sent Pending Friend Requests
exports.getSentRequests = async (req, res) => {
  const user_id = req.user.id;

  try {
    const sent = await pool.query(queries.GET_SENT_REQUESTS, [user_id]);
    res.status(200).json(sent.rows);
  } catch (error) {
    console.error("Get Sent Requests Error:", error);
    res.status(500).json({ message: "Error fetching sent requests", error: error.message });
  }
};
