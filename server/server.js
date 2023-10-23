import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';

const app=express();
dotenv.config();

const server=createServer(app);
const io=new Server(server,{
    cors:{
        origin:['http://localhost:3000','https://chat-zilla.netlify.app']
    }
});

const PORT=process.env.PORT || 5000;
io.on("connection",(socket)=>{
    console.log("user connected")
    socket.on("chat",(payload)=>{
        console.log("payload is: ",payload);
        io.emit("chat",payload);
    })
});

server.listen(PORT,()=>{
    console.log("server started on port ", PORT);
});


