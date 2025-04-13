const express = require("express");
const router = express.Router();
const friendshipController = require("../controllers/friendshipController");
const verifyToken = require('../middleware/authMiddleware');

// All routes require the user to be authenticated
router.use(verifyToken);

// Send a friend request
router.post("/send-request", friendshipController.sendFriendRequest);

// Accept a friend request
router.post("/accept-request", friendshipController.acceptFriendRequest);

// Reject a friend request
router.post("/reject-request", friendshipController.rejectFriendRequest);

// Get all friends of the logged-in user
router.get("/friends", friendshipController.getUserFriends);

// Get all pending friend requests received by the user
router.get("/pending-requests", friendshipController.getPendingRequests);

module.exports = router;
