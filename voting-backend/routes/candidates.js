import express from 'express';
import Candidate from '../models/Candidate.js';
const router = express.Router();

router.get('/',async (req, res) => {
    const list = await Candidate.find().sort({createdAt:1});
    res.json({data:list});
});

export default router;