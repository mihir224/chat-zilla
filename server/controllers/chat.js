import Room from '../models/Room.js';
import Message from '../models/Message.js';

//insert message into chat
export const updateChat=async (req,res,next)=>{
    const message=new Message({...req.body,userId:req.data.id});
    try{
        const room=await Room.findByIdAndUpdate(req.params.id,{
            $push:{messages:message}
        });
        res.status(200).json(room);
    }catch(err){
        console.log(err);
    }
}
