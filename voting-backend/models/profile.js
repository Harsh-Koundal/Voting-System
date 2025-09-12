import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId :{type:mongoose.Schema.Types.ObjectId, ref:"User",required:true,unique:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    // voterId:{type:String,required:true,unique:true},
    // age:{type:Number,required:true},
    // address:{type:String},
    hasVoted:{type:Boolean,default:false},
});

export default mongoose.model('Profile',profileSchema);