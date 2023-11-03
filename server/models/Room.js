import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
    userId:{
        type:Number
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

const RoomSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    messages:{
        type:[MessageSchema],
        default:[]
    },
    members:{
        type:[String],
        default:[]
    },
    desc:{
        type:String,
        default:"a ChatZilla room"
    }
},{timestamps:true});

export default mongoose.model("Room",RoomSchema);