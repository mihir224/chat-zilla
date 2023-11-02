import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup=async(req,res,next)=>{
    try{
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword=bcrypt.hashSync(req.body.password,salt);
        const newUser=new User({...req.body,password:hashedPassword});
        const user=await newUser.save();
        const token=jwt.sign({id:user._id},process.env.JWT);
        const {password,...others}=user._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(others);
    }
    catch(err){
        console.log(err);
    }
}

export const signin=async(req,res,next)=>{
    try{
        const user=await User.findOne({name:req.body.name});
        if(!user){
            res.status(404).json('User not found!');
        }
        const isValid=bcrypt.compare(req.body.password,user.password);
        if(!isValid){
            res.status(401).json('Invalid credentials');
        }
        const token=jwt.sign({id:user._id},process.env.JWT);
        const {password,...others}=user._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(others);
    }catch(err){
        console.log(err);
    }
}

export const googleAuth=async(req,res,next)=>{

}