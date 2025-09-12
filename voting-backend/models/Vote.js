import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true,unique:true},
    candidateId:{type:mongoose.Schema.Types.ObjectId, ref:'Candidate', required:true},
    createdAt:{type:Date, default:Date.now}
});

voteSchema.index({userId:1}, {unique:true});

export default mongoose.model('Vote', voteSchema);