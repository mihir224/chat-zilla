import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
    userId:{
        type:Number
    },
    isUser:{
        type:Boolean,
        default:true
    }
})

export default mongoose.model("Message",MessageSchema);