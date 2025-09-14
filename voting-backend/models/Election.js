import mongoose from "mongoose";

const electionSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "Main Election" },
    isOpen: { type: Boolean, default: false }, // fixed typo
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }], // add candidates
    startsAt: Date,
    endsAt: Date,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Election", electionSchema);
