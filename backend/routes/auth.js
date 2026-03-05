const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Opportunity = require("../models/Opportunity");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, university, year, major } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      university,
      year,
      major,
    });

    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      "secret",
      { expiresIn: "1h" }
    );

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).populate('applications.opportunityId');
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ user: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// Apply to Opportunity
router.post("/apply", async (req, res) => {
  const { userId, opportunityId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) return res.status(404).json({ message: "Opportunity not found" });

    // Check if already applied
    const alreadyApplied = user.applications.some(app =>
      app.opportunityId && app.opportunityId.toString() === opportunityId
    );
    if (alreadyApplied) return res.status(400).json({ message: "Already applied" });

    // Add to user applications
    user.applications.push({ opportunityId });
    await user.save();

    // Increment count on opportunity
    if (opportunity.type === 'internship') {
      opportunity.applicants = (opportunity.applicants || 0) + 1;
    } else if (opportunity.type === 'hackathon') {
      opportunity.participants = (opportunity.participants || 0) + 1;
    } else if (opportunity.type === 'course') {
      opportunity.enrolled = (opportunity.enrolled || 0) + 1;
    }
    await opportunity.save();

    const updatedUser = await User.findById(userId).populate('applications.opportunityId');
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error("Application error:", err);
    res.status(500).json({ message: "Application failed", error: err.message });
  }
});

// Get Profile (Refreshes user data)
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('applications.opportunityId');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
});

// Withdraw from Opportunity
router.post("/withdraw", async (req, res) => {
  const { userId, opportunityId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if applied
    const appIndex = user.applications.findIndex(app =>
      app.opportunityId && app.opportunityId.toString() === opportunityId
    );
    if (appIndex === -1) return res.status(400).json({ message: "Application not found" });

    // Remove application
    user.applications.splice(appIndex, 1);
    await user.save();

    // Decrement count on opportunity
    const opportunity = await Opportunity.findById(opportunityId);
    if (opportunity) {
      if (opportunity.type === 'internship') {
        opportunity.applicants = Math.max(0, (opportunity.applicants || 0) - 1);
      } else if (opportunity.type === 'hackathon') {
        opportunity.participants = Math.max(0, (opportunity.participants || 0) - 1);
      } else if (opportunity.type === 'course') {
        opportunity.enrolled = Math.max(0, (opportunity.enrolled || 0) - 1);
      }
      await opportunity.save();
    }

    const updatedUser = await User.findById(userId).populate('applications.opportunityId');
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error("Withdrawal error:", err);
    res.status(500).json({ message: "Withdrawal failed", error: err.message });
  }
});

module.exports = router;

