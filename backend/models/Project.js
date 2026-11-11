const mongoose = require("mongoose");
module.exports = mongoose.model("Project", new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  tech: [String],
  image: { type: String, default: "" },
  liveUrl: { type: String, default: "" },   // leave empty until a real link exists
  githubUrl: { type: String, default: "" },
}, { timestamps: true }));
