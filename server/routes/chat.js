import express from 'express';
import {authenticate} from '../authenticate.js';
import {updateChat,deleteChat} from '../controllers/chat.js'

const router=express.Router();

//chat routes

router.put('/:id',authenticate,updateChat); //create a new message object and insert it into the respective room
router.put('/delete/:id',authenticate,deleteChat);

export default router;