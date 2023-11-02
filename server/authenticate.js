import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const authenticate=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authorised"));
    }
    jwt.verify(token,process.env.JWT,(err,decodedData)=>{
        if(err){
            return next(createError(403,"Token invalid"));
        }
        req.data=decodedData;
        next();
    });

}