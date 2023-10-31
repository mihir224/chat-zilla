import mongoose from "mongoose";

const RoomSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    messages:{
        type:[String],
        default:[]
    },
    members:{
        type:[String],
        default:[]
    },
    desc:{
        type:String
    }
},{timestamps:true});

export default mongoose.model("Room",RoomSchema);