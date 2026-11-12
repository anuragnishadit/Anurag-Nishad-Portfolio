
// Load environment variables
require("dotenv").config({
  path: require("path").join(__dirname, ".env")
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Admin Model
const Admin = require("./models/Admin");

// Initialize Express
const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json({ limit: "100kb" }));

// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).send(`
    <h1>Anurag Nishad - MERN Portfolio Backend</h1>
    <h2>Backend is Running Successfully!</h2>
    <p>MongoDB API Server is Live.</p>
    <p>Health Check: <a href="/api/health">/api/health</a></p>
  `);
});

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/contact", require("./routes/contact"));

// ==========================================
// HEALTH CHECK ROUTE
// ==========================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio Backend is Running!",
    database: mongoose.connection.readyState === 1
      ? "Connected"
      : "Disconnected"
  });
});

// ==========================================
// CREATE ADMIN USER
// ==========================================

async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log("Admin credentials not provided. Skipping admin creation.");
    return;
  }

  const existingAdmin = await Admin.findOne({
    email: ADMIN_EMAIL
  });

  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await Admin.create({
    email: ADMIN_EMAIL,
    password: hashedPassword
  });

  console.log("Admin user created successfully.");
}

// ==========================================
// CONNECT MONGODB AND START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in backend/.env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected Successfully!");

    await seedAdmin();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health URL: /api/health`);
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

// Start Application
startServer();
