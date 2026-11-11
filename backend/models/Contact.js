const mongoose = require("mongoose");
module.exports = mongoose.model("Contact", new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, maxlength: 150 },
  subject: { type: String, required: true, trim: true, maxlength: 150 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
}, { timestamps: true }));
