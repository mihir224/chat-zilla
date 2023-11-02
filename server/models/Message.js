import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
    userId:{
        type:Number,
        required:true
    },
    content:{
        type:String,
        default:""
    },
    isUser:{
        type:Boolean,
        default:true
    }
})

export default mongoose.model("Message",MessageSchema);