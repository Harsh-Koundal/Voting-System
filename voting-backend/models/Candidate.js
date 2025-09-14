// models/Candidate.js
import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  bio: {   
    type: String,
    default: "",
  },
  votes: {
    type: Number,
    default: 0,
  },
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Election", 
    required: true,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
