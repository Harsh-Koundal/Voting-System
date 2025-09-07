import express from 'express';
import { authMiddleware, adminOnly } from "../middleware/auth.js";
import Election from "../models/Election.js";
import Vote from '../models/Vote.js';
import Candidate from '../models/Candidate.js';
const router = express.Router();

// Cast Vote
router.post('/', authMiddleware, async (req, res) => {
    const user =req.user;
    const {candidateId} = req.body;
    if(!candidateId) return res.status(400).json({msg:"Candidate ID is required"});

    const election = await Election.findOne();
    if(!election || !election.isOpen) return res.status(400).json({msg:"Election is not open"});

    const existing = await Vote.findOne({voter:user._id});
    if(existing) return res.status(400).json({msg:"You have already voted"});

    const candidate = await Candidate.findById(candidateId);
    if(!candidate) return res.status(400).json({msg:"Candidate not found"});

    const vote = new Vote({voter:user._id,candidate:candidateId});
    await vote.save();
    res.json({msg:"Vote cast successfully",data:{voteId:vote._id}});
});

export default router;