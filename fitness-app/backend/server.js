require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const activityRoutes = require("./routes/activityRoutes");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes); 
app.use("/api/events", eventRoutes);
app.use("/api/activities", activityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
