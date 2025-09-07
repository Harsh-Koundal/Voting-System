import express from 'express';
import Candidate from '../models/Candidate.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const candidates = await Candidate.find().select("name party votes").sort({votes:-1});
    const totalVotes = candidates.reduce((s,c)=>(c.votes || 0),0)
    res.json({data:{candidates,totalVotes}});
});

export default router