import express from "express";
import Election from "../models/Election.js";

const router = express.Router();

// Get all elections
router.get("/", async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create election
router.post("/", async (req, res) => {
  try {
    const { name, isOpen, startsAt, endsAt,description ,candidates } = req.body;
    const election = new Election({ name,description, isOpen, startsAt, endsAt,candidates });
    await election.save();
    res.status(201).json(election);
  } catch (error) {
    res.status(400).json({ message: "Failed to create election" });
  }
});

// Delete election
router.delete('/:id',async(req,res)=>{
  try{
    const election = await Election.findByIdAndDelete(req.params.id);
    if(!election) return res.status(400).json({message:"election not found"});
    res.json({message:"Election deleted successfully"})
  }catch(error){
    res.status(500).json({message:"Error deleting election"})
  }
})

export default router;
