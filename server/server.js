import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';

const app=express();
var currentUser={
    userName:"",
    room:""
};
dotenv.config();

const server=createServer(app);
const io=new Server(server,{
    cors:{
        origin:['http://localhost:3000','https://chat-zilla.netlify.app']
    }
});
const setUserName=(user)=>{
    currentUser={
        userName:user.userName,
        room:user.room
    }
}
const PORT=process.env.PORT || 5000;
io.on("connection",(socket)=>{
    console.log("user connected")
    socket.on("room",({userName,room})=>{
        setUserName({userName:userName,room:room});
        socket.join(room);
        socket.broadcast.to(room).emit("generated",`${userName} joined the chat`)
    })
    socket.on("chat",(payload)=>{
        console.log("payload is: ",payload);
        io.to(currentUser.room).emit("chat",payload);
    })
});

server.listen(PORT,()=>{
    console.log("server started on port ", PORT);
});


