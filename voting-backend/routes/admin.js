import express from 'express';
import Candidate from '../models/Candidate.js';
import Election from '../models/Election.js';
import { authMiddleware,adminOnly } from '../middleware/auth.js';

const router = express.Router();
// Add Candidate
router.post('/candidates', authMiddleware, adminOnly, async (req, res) => {
        const {name,party,bio,photoUrl} = req.body;
        if(!name) return res.status(400).json({msg:"Name is required"});
        const cand = new Candidate({name,party,bio,photoUrl});
        await cand.save();
        res.json({msg:"Candidate added", candidate:cand});
    });

    //open/close election
    router.post('/election', authMiddleware, adminOnly, async (req, res) => {
        const {isOpen} = req.body;
        let election = await Election.findOne();
        if(!election) election = new Election({name:"Main Election",isOpen: !!isOpen});
        else election.isOpen = !!isOpen;
        await election.save();
        res.json({data:election});
    })

    export default router;