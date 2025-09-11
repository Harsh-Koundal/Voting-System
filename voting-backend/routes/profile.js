import express from "express";
import mongoose from "mongoose";
import Profile from "../models/profile.js";

const router = express.Router();

// 📌 Get profile
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const profile = await Profile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profile not found" });

        res.json(profile);
    } catch (error) {
        console.error("❌ GET profile error:", error);
        res.status(500).json({ error: error.message });
    }
});

// 📌 Create profile
router.post("/", async (req, res) => {
  try {
    const { userId, name, email } = req.body;

    if (!userId || !name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = new Profile({ userId, name, email });
    await profile.save();

    res.status(201).json(profile);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }
    res.status(400).json({ error: error.message });
  }
});


// 📌 Update profile
router.put("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const profile = await Profile.findOneAndUpdate(
            { userId },
            req.body,
            { new: true }
        );

        if (!profile) return res.status(404).json({ message: "Profile not found" });

        res.json(profile);
    } catch (error) {
        console.error("❌ PUT profile error:", error);
        res.status(400).json({ error: error.message });
    }
});

// 📌 Delete profile
router.delete("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const profile = await Profile.findOneAndDelete({ userId });
        if (!profile) return res.status(404).json({ message: "Profile not found" });

        res.json({ message: "Profile deleted" });
    } catch (error) {
        console.error("❌ DELETE profile error:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
