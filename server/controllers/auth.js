import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {createError} from '../error.js';

export const signup=async(req,res,next)=>{
    try{
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword=bcrypt.hashSync(req.body.password,salt);
        const newUser=new User({...req.body,password:hashedPassword});
        const user=await newUser.save();
        const token=jwt.sign({id:user._id},process.env.JWT);
        const {password,...others}=user._doc;
        res.cookie('access_token',token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'none',secure:true}).status(200).json(user._doc);
    }
    catch(err){
        console.log(err);
    }
}
export const signin=async(req,res,next)=>{
    try{
        const user=await User.findOne({name:req.body.name});
        if(!user){
            return next(createError(404,'user not found'));
        }
        const isValid=bcrypt.compare(req.body.password,user.password);
        if(!isValid){
            return next(createError(401,'invalid credentials'));
        }
        const token=jwt.sign({id:user._id},process.env.JWT);
        const {password,...others}=user._doc;
        res.cookie('access_token',token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'none',secure:true}).status(200).json(user._doc);
    }catch(err){
        console.log(err);
    }
}

export const googleAuth=async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT);
            res.cookie('access_token',token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'none',secure:true}).status(200).json(user._doc);
        }
        else{
            const newUser=new User({
                ...req.body,
                fromGoogle:true
            });
            const user=await newUser.save();
            const token=jwt.sign({id:user._id},process.env.JWT)
            res.cookie('access_token',token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'none',secure:true}).status(200).json(user._doc);
        }
    }catch(err){
        console.log(err);
    }
}

export const logout=async (req,res,next)=>{
    try{
        res.clearCookie('access_token',{sameSite:'none',secure:true}).status(200).json('logout successful')
    }catch(err){
        console.log(err);
    }
}