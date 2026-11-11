const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

const pick = (b) => ({ title: b.title, description: b.description, tech: b.tech, image: b.image, liveUrl: b.liveUrl, githubUrl: b.githubUrl });

router.get("/", async (req, res) => res.json(await Project.find().sort({ createdAt: 1 })));
router.get("/:id", async (req, res) => {
  try { const p = await Project.findById(req.params.id); p ? res.json(p) : res.status(404).json({ message: "Not found" }); }
  catch { res.status(400).json({ message: "Bad id" }); }
});
router.post("/", auth, async (req, res) => {
  try { res.status(201).json(await Project.create(pick(req.body))); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.put("/:id", auth, async (req, res) => {
  try { res.json(await Project.findByIdAndUpdate(req.params.id, pick(req.body), { new: true, runValidators: true })); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.delete("/:id", auth, async (req, res) => {
  try { await Project.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); }
  catch { res.status(400).json({ message: "Bad id" }); }
});
module.exports = router;
