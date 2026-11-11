// Main backend file: connects MongoDB, mounts routes, creates the admin user.
require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "100kb" }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/contact", require("./routes/contact"));
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Create the admin from .env values if none exists (password is stored hashed)
async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return console.log("No ADMIN_EMAIL/ADMIN_PASSWORD set; skipping admin seed.");
  if (await Admin.findOne({ email: ADMIN_EMAIL })) return;
  await Admin.create({ email: ADMIN_EMAIL, password: await bcrypt.hash(ADMIN_PASSWORD, 10) });
  console.log("Admin user created:", ADMIN_EMAIL);
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await seedAdmin();
    app.listen(process.env.PORT || 5000, () => console.log("Server running on port " + (process.env.PORT || 5000)));
  })
  .catch((err) => { console.error("MongoDB connection failed:", err.message); process.exit(1); });
