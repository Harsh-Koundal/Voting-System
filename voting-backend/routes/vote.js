import express from "express"
import Vote from "../models/Vote.js"
import Election from "../models/Election.js"
import Candidate from "../models/Candidate.js"
import {authMiddleware} from "../middleware/auth.js"

const router = express.Router();

//Post a Vote
router.post("/:electionId/:candidateId",authMiddleware,async(req,res)=>{
    try{
        const {electionId,candidateId} = req.params;
        const userId = req.user.id;
        
        //check if election exists
        const election = await Election.findById(electionId);
        if(!election) return res.status(400).json({message:"Election Not Found"});

        //check if candidate belogn to this election
        const candidate = await Candidate.findOne({_id:candidateId,election:electionId});
        if(!candidate) return res.status(400).json({message:"Invalid Candidate"});

        // Vote
        const vote = new Vote({user:userId,election:electionId,candidate:candidateId})
        await vote.save();

        res.status(201).json({message:"Vote cast successfully!",vote});
    }catch(error){
        if(error.code === 11000){
            return res.status(400).json({message:"You have already voted in this election"});
        }
        res.status(500).json({message:"server error ",error})
    }
})

export default router