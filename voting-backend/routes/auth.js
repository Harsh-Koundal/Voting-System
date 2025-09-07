import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password) return res.status(400).json({msg:"Please enter all fields"});
        const existingUser = await User.findOne({email});
        if(exists) return res.status(400).json({msg:"User already exists"});

        const salt  = await bcrypt.genSalt(10);
        const passwordHarsh = await bcrypt.hash(password, salt);
        const user = new User({name,email,password:passwordHarsh});
        await user.save();
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
        res.json({token, user:{id:user._id,name:user.name,email:user.email,role:user.role}});
    }catch(e){
        res.status(500).json({msg:"Server error",error:e.message});
    }
});

router.post('/login', async (req, res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg:"Invalid credentials"});
        const ok = await bcrypt.compare(password, user.password);
        if(!ok) return res.status(400).json({msg:"Invalid credentials"});
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
        res.json({token, user:{id:user._id,name:user.name,email:user.email,role:user.role}});
    }catch(e){
        res.status(500).json({msg:"Server error",error:e.message});
    }   
});

export default router;