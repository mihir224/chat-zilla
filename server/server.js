import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app=express();
const server=createServer(app);
const io=new Server(server,{
    cors:{
        origin:'*'
    }
});

io.on("connection",(socket)=>{
    console.log("user connected")
    socket.on("chat",(payload)=>{
        console.log("payload is: ",payload);
        io.emit("chat",payload);
    })
});

server.listen(5000,()=>{
    console.log("server started on port 5000");
});


