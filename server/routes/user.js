import express from 'express';
import { authenticate } from '../authenticate.js';
import {updateUser,deleteUser,findUser,addRoom} from '../controllers/user.js';

const router=express.Router();

router.put('/update/:id',authenticate,updateUser);
router.delete('/delete/:id',authenticate,deleteUser);
router.get('/find/:id',findUser); //can be used to obtain info regarding a user and their joined rooms
router.put('/addRoom/:id',authenticate,addRoom);

export default router;