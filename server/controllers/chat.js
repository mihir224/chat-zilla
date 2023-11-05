import Room from '../models/Room.js';
import Message from '../models/Message.js';

//insert message into chat
export const updateChat=async (req,res,next)=>{
    const message=new Message({...req.body,userId:req.data.id});
    try{
        const updatedRoom=await Room.findByIdAndUpdate(req.params.id,{
            $addToSet:{messages:message}
        },{new:true});
        res.status(200).json(updatedRoom);
    }catch(err){
        console.log(err);
    }
}
