const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");


router.use(verifyToken);

router.get("/random", userController.getRandomUsers);

module.exports = router;
