import express from "express";
import Election from "../models/Election.js";

const router = express.Router();

// Get all elections
router.get("/", async (req, res) => {
  try {
    const elections = await Election.find().populate("candidates");
    res.json(elections);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create election
router.post("/", async (req, res) => {
  try {
    const { name, isOpen, startsAt, endsAt } = req.body;
    const election = new Election({ name, isOpen, startsAt, endsAt });
    await election.save();
    res.status(201).json(election);
  } catch (error) {
    res.status(400).json({ message: "Failed to create election" });
  }
});

export default router;
