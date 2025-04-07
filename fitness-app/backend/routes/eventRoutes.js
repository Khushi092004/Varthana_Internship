const express = require("express");
const { createEvent, getAllEvents } = require("../controllers/eventController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", verifyToken, createEvent);
router.get("/all", verifyToken, getAllEvents);

module.exports = router;
