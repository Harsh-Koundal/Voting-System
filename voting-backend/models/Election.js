import mongoose from "mongoose";

const electionSchema = new mongoose.Schema({
    name:{type:String,required:true,default:"Main Election"},
    isOPen:{type:Boolean,default:false},
    startsAt:Date,
    endsAT:Date,
    createdAt:{type:Date,default:Date.now}
});
export default mongoose.model('Election', electionSchema);