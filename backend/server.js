const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Home route
app.get("/", (req, res) => {
    res.send("Student Skill Management System Backend is Running");
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Node.js and Express are working successfully"
    });
});

// Student routes
const studentRoutes = require("./routes/students");
app.use("/api/students", studentRoutes);

const skillRoutes = require("./routes/skills");
app.use("/api/skills", skillRoutes);

const mySkillsRoutes = require("./routes/mySkills");
app.use("/api/my-skills", mySkillsRoutes);

const requestRoutes = require("./routes/requests");
app.use("/api/requests", requestRoutes);

const reportRoutes = require("./routes/reports");
app.use("/api/reports", reportRoutes);

// Server port
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});