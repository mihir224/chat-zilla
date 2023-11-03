import Message from '../models/Message.js';
import {createError} from '../error.js';

//for both these operations it is imp to verify if the user trying to edit the message is the sender of that message or not
export const updateMessage=async(req,res,next)=>{
    const message=await Message.findById(req.params.id);
    if(message.userId===req.data.id){
        try{
            const newMessage=await Message.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
            res.status(200).json(newMessage);
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        return next(createError(401,'Unauthorised'));
    }
}

export const deleteMessage=async(req,res,next)=>{
    const message=await Message.findById(req.params.id);
    if(message.userId===req.data.id){
        try{
            await Message.findByIdAndDelete(req.params.id);
            res.status(200).json("Message deleted.");
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        return next(createError(401,'Unauthorised'));
    }
}