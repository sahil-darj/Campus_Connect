const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    type: { type: String, enum: ["internship", "hackathon", "course"], required: true },
    location: { type: String, required: true },
    duration: { type: String },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    deadline: { type: Date, required: true },
    posted: { type: Date, default: Date.now },
    salary: { type: String }, // For internships
    prizes: { type: String }, // For hackathons
    price: { type: String },  // For courses
    remote: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    applicants: { type: Number, default: 0 },
    participants: { type: Number, default: 0 },
    enrolled: { type: Number, default: 0 },
    image: { type: String },
});

module.exports = mongoose.model("Opportunity", OpportunitySchema);
