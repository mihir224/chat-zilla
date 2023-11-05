import Room from '../models/Room.js';

//get room info
export const getRoom=async(req,res,next)=>{
    try{
        const room=await Room.findById(req.params.id);
        if(!room){
            return next(createError(401,'Room not found'));
        }
        res.status(200).json(room);
    }catch(err){
        console.log(err);
    }
}

//create room
export const createRoom=async(req,res,next)=>{
    const newRoom=new Room(req.body);
    try{
        const savedRoom=await newRoom.save();
        res.status(200).json(savedRoom);
    }catch(err){
        console.log(err);
    }
}

//update room 
export const updateRoom=async(req,res,next)=>{
    try{
        const updatedUser=await Room.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(updatedUser);
    }catch(err){
        console.log(err);
    }
}

//delete room
export const deleteRoom=async(req,res,next)=>{
    try{
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json("Room has been deleted.");
    }
    catch(err){
        console.log(err);
    }
}

//add user to room
export const addUser=async(req,res,next)=>{
    const userId=req.data.id;
    const roomId=req.params.id;
    try{
        const updatedRoom=await Room.findByIdAndUpdate(roomId,{
            $addToSet:{members:userId} //add user to members list of room
        },{new:true});
        res.status(200).json(updatedRoom);
    }catch(err){
        console.log(err);
    }
}

//remove user from room
export const removeUser=async(req,res,next)=>{
    const userId=req.data.id;
    const roomId=req.params.id;
    try{
        const updatedRoom=await Room.findByIdAndUpdate(roomId,{
            $pull:{members:userId}
        },{new:true})
        res.status(200).json(updatedRoom);
    }catch(err){
        console.log(err);
    }
}

//show random list of rooms
export const showRandom=async(req,res,next)=>{
    try{
        const rooms=await Room.find({});
        res.status(200).json(rooms);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

//search rooms
export const search=async(req,res,next)=>{
    const query=req.query.q;
    try{
        const rooms=await Room.find({name:{$regex:query,$options:"i"}});
        res.status(200).json(rooms);
    }catch(err){
        console.log(err);
    }
}