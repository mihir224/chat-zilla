import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        default:"bot"
    },
    content:{
        type:String,
        default:""
    },
    time:{
        type:String,
        required:true
    },
    isUser:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

export default mongoose.model("Message",MessageSchema);