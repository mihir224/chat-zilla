import User from '../models/User.js';

//update user
export const updateUser=async(req,res,next)=>{
    if(req.params.id===req.data.id){
        try{
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
            res.status(200).json(updatedUser);
        }catch(err){
            console.log(err);
        }
    }
    else{
        res.status(401).json("You are not authorised to do this operation")
    }
}

//delete user
export const deleteUser=async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted.");
    }
    catch(err){
        console.log(err);
    }
}

//find user
export const findUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        const{password,...others}=user._doc; //extracting password from the user data as we don't want it to be visible to other users while they try to fetch this users data
        res.status(200).json(others);
    }
    catch(err){
        console.log(err);
    }
}

//add room to user rooms list
export const addRoom=async(req,res,next)=>{
    try{
        const updatedUser=await User.findByIdAndUpdate(req.data.id,{
            $addToSet:{rooms:req.params.id}
        },{new:true});
        res.status(200).json(updatedUser);
    }
    catch(err){
        console.log(err);
    }
}