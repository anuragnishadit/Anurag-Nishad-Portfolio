const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const auth = require("../middleware/auth");

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (typeof email !== "string" || typeof password !== "string") return res.status(400).json({ message: "Email and password required" });
  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin || !(await bcrypt.compare(password, admin.password))) return res.status(401).json({ message: "Wrong email or password" });
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
});
router.get("/me", auth, (req, res) => res.json({ id: req.admin.id }));
module.exports = router;
