import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import Profile from "../models/profile.js"  

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Create profile
    let profile;
    try {
      profile = new Profile({
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email
      });
      await profile.save();
    } catch (err) {
      console.error("❌ Profile creation failed:", err.message);
      return res.status(400).json({ message: "Profile creation failed", error: err.message });
    }

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      profile
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Sign JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
