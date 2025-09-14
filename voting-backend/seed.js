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
const admin = await User.create({ 
  name: "Admin", 
  email: "admin@example.com", 
  password: adminHash,   
  role: "admin" 
});

const user = await User.create({ 
  name: "Voter", 
  email: "voter@example.com", 
  password: userHash,   
  role: "user" 
});

// 1️⃣ Create election first
const election = await Election.create({ 
  name: "College President 2025",
  description: "Election for the college student body president position.",
  isOpen: true,
  startsAt: new Date("2025-09-01T09:00:00Z"),
  endsAt: new Date("2025-09-15T17:00:00Z"),
  votesCast: 0
});

// 2️⃣ Seed candidates with election._id
const candidates = await Candidate.insertMany([
  { name: "Alice Johnson", party: "Unity Party", bio: "Experienced leader", election: election._id },
  { name: "Bob Smith", party: "Progressive", bio: "Community organizer", election: election._id },
  { name: "Charlie Brown", party: "Independent", bio: "Student representative", election: election._id }
]);

// 3️⃣ Update election with candidates list
election.candidates = candidates.map(c => c._id);
await election.save();

console.log("Seeded:", { admin: admin.email, user: user.email });
process.exit(0);
