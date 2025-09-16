import express from 'express'
import User from '../models/User.js'

const router = express.Router();

//  Get all users
router.get('/',async(req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.status(500).json({message:"Error fetching users",error});
    }
});

// get single user by id
router.get('/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message:"User not found"})
    }catch(error){
res.status(500).json({message:"Error fetching user",error})
}
});

// Update user
router.put('/:id',async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {name,email,password},
            {new:true}
        );
        if(!user) return res.status(404).json({message:"User not found"});
        res.json(user)
    }catch(error){
        res.status(400).json({ message: "Error updating user", error });
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).json({message:"User not found"});
        res.json({message:"User deleted successfully"})
    }catch(error){
        res.status(500).json({message:"Error deleting user",error});
    }
});

export default router