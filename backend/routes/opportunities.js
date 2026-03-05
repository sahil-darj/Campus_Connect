const express = require("express");
const Opportunity = require("../models/Opportunity");
const router = express.Router();

// Get all opportunities
router.get("/", async (req, res) => {
    try {
        const opportunities = await Opportunity.find();
        res.json(opportunities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single opportunity
router.get("/:id", async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) return res.status(404).json({ message: "Not found" });
        res.json(opportunity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new opportunity (Admin)
router.post("/", async (req, res) => {
    const opportunity = new Opportunity({
        title: req.body.title,
        company: req.body.company,
        type: req.body.type,
        location: req.body.location,
        duration: req.body.duration,
        description: req.body.description,
        requirements: req.body.requirements,
        deadline: req.body.deadline,
        salary: req.body.salary,
        prizes: req.body.prizes,
        price: req.body.price,
        remote: req.body.remote,
        trending: req.body.trending,
        image: req.body.image,
    });

    try {
        const newOpportunity = await opportunity.save();
        res.status(201).json(newOpportunity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
