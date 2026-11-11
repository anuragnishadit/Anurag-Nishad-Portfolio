const router = require("express").Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

// Public: visitors send a message
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (![name, email, subject, message].every((v) => typeof v === "string" && v.trim()))
    return res.status(400).json({ message: "All fields are required" });
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: "Invalid email" });
  try { await Contact.create({ name, email, subject, message }); res.status(201).json({ message: "Message sent" }); }
  catch (e) { res.status(400).json({ message: "Could not save message" }); }
});
// Admin only
router.get("/", auth, async (req, res) => res.json(await Contact.find().sort({ createdAt: -1 })));
router.delete("/:id", auth, async (req, res) => {
  try { await Contact.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); }
  catch { res.status(400).json({ message: "Bad id" }); }
});
module.exports = router;
