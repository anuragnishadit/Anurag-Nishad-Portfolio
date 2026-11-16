
const router = require("express").Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

// ========================================
// PUBLIC: Submit Contact Form
// ========================================
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body || {};

    // Required field validation
    if (
      ![name, email, phone, message].every(
        (value) =>
          typeof value === "string" && value.trim().length > 0
      )
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        message: "Invalid email address"
      });
    }

    // Phone validation
    const phoneRegex = /^\+?[0-9\s()-]{10,15}$/;

    if (!phoneRegex.test(phone.trim())) {
      return res.status(400).json({
        message: "Please enter a valid phone number"
      });
    }

    // Save contact message in MongoDB
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim()
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact
    });

  } catch (error) {
    console.error("Contact Form Error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not save message"
    });
  }
});


// ========================================
// ADMIN: Get All Contact Messages
// ========================================
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1
    });

    return res.status(200).json(contacts);

  } catch (error) {
    console.error("Fetch Contacts Error:", error);

    return res.status(500).json({
      message: "Failed to fetch contact messages"
    });
  }
});


// ========================================
// ADMIN: Delete Contact Message
// ========================================
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(
      req.params.id
    );

    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact message not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully"
    });

  } catch (error) {
    console.error("Delete Contact Error:", error);

    return res.status(400).json({
      message: "Invalid contact ID"
    });
  }
});

module.exports = router;
