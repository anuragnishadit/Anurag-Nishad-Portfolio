
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 15,
      match: /^\+?[0-9\s()-]{10,15}$/
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Contact", messageSchema);
