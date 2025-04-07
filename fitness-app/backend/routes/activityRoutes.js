const express = require("express");
const { createActivity, getUserActivities } = require("../controllers/activityController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", verifyToken, createActivity);
router.get("/my", verifyToken, getUserActivities);

module.exports = router;
