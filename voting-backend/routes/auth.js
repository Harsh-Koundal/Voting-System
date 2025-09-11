import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/User.js"

const router = express.Router();

router.post('/signup',async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();

        res.status(201).json({message:"User registered sucessfully!"});
    }catch(error){
        res.status(500).json({error:error.message})
    }
});

router.post('/signin', async(req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid credentials"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"})
            const token = jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );
    res.json({
        message:"Login successful",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        }
    });
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

export default router