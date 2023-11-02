import express from 'express';
import {authenticate} from '../authenticate.js';
import { updateMessage,deleteMessage } from '../controllers/message.js';

const router=express.Router();

//messages

router.put('/update/:id',authenticate,updateMessage);
router.delete('/delete/:id',authenticate,deleteMessage);

export default router;
