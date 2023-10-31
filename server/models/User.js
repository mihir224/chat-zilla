import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    imgUrl:{
        type:String
    },
    status:{
        type:String,
        default:"Online"
    },
    bio:{
        type:String,
        default:"Just joined ChatZilla, let's chat!"
    },
    rooms:{
        type:[String],
        default:[]
    },
    fromGoogle:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export default mongoose.model('User',UserSchema);