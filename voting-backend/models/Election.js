import mongoose from "mongoose";

const electionSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "Main Election" },
  description: { type: String, default: "No description provided." },
  isOpen: { type: Boolean, default: false },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }], 
  startsAt: { type: Date },
  endsAt: { type: Date },
  votesCast: { type: Number, default: 0 } 
}, { timestamps: true }); 

export default mongoose.model("Election", electionSchema);
