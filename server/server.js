import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import messageRoutes from './routes/message.js'
import roomRoutes from './routes/room.js';
import userRoutes from './routes/user.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app=express();

dotenv.config();

const allowedOrigins=['http://localhost:3000','https://chat-zilla.netlify.app'];

app.use(cors({
    origin:allowedOrigins,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}))

var currentUser={
    userName:"",
    room:""
};

const connect=()=>{
    mongoose.connect(`mongodb+srv://${process.env.MONGO}@cluster0.ly91ewg.mongodb.net/ChatZillaDB?retryWrites=true&w=majority`).then(()=>{
        console.log('DB Connected');
    }).catch(err=>{
        console.log(err);
    });
}

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/room',roomRoutes);
app.use('/api/user',userRoutes);

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
    connect();
    console.log("server started on port ", PORT);
});


