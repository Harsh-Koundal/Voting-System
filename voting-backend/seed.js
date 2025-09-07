import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Candidate from "./models/Candidate.js";
import Election from "./models/Election.js";
import bcrypt from "bcryptjs";

dotenv.config();
const DB = process.env.DB_URI;

await mongoose.connect(DB);
console.log("Connected");

// Clear old data
await User.deleteMany({});
await Candidate.deleteMany({});
await Election.deleteMany({});

// Hash passwords
const salt = await bcrypt.genSalt(10);
const adminHash = await bcrypt.hash("adminpass", salt);
const userHash = await bcrypt.hash("userpass", salt);

// Seed users
// Seed users
const admin = await User.create({ 
  name: "Admin", 
  email: "admin@example.com", 
  password: adminHash,   // <-- must match schema
  role: "admin" 
});

const user = await User.create({ 
  name: "Voter", 
  email: "voter@example.com", 
  password: userHash,   // <-- must match schema
  role: "user" 
});


// Seed candidates
const candidates = await Candidate.insertMany([
  { name: "Alice Johnson", party: "Unity Party", bio: "Experienced leader" },
  { name: "Bob Smith", party: "Progressive", bio: "Community organizer" },
  { name: "Charlie Brown", party: "Independent", bio: "Student representative" }
]);

// Seed election
await Election.create({ 
  name: "College President 2025", 
  isOpen: true,
  candidates: candidates.map(c => c._id) // link candidates if schema allows
});

console.log("Seeded:", { admin: admin.email, user: user.email });
process.exit(0);
