import express from 'express';
import {authenticate} from '../authenticate.js';
import {updateChat} from '../controllers/chat.js'

const router=express.Router();

//chat routes

router.put('/:id',authenticate,updateChat); //create a new message object and insert it into the respective room

export default router;