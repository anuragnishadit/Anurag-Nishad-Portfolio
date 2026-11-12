
require("dotenv").config({
  path: require("path").join(__dirname, ".env")
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json({ limit: "100kb" }));

// Root Route
app.get("/", (req, res) => {
  res.status(200).send(`
    <h1>Anurag Nishad - MERN Portfolio</h1>
    <h2>Backend is Running Successfully!</h2>
    <p>MongoDB API Server is Live.</p>
    <a href="/api/health">Check API Health</a>
  `);
});

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio Backend is Running!",
    database: mongoose.connection.readyState === 1
      ? "Connected"
      : "Disconnected"
  });
});

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/contact", require("./routes/contact"));

// Create Admin
async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log("Admin credentials missing. Skipping seed.");
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

  console.log("Admin user created:", ADMIN_EMAIL);
}

// Start Server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Keep MONGO_URI as used in your original backend
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing!");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    await seedAdmin();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Root route: /");
      console.log("Health route: /api/health");
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
