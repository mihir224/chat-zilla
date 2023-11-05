import express from 'express';
import {authenticate} from '../authenticate.js';
import {getRoom,createRoom,updateRoom,deleteRoom,addUser,removeUser,showRandom,search} from '../controllers/room.js';

const router=express.Router();

//room routes (whenever user will click on a particular room among the retreived options from search, the room details will be fetched similar to how we did in mst tube(room id will be appended to the url and then we can extract that id and emit that in the payload while joining the room so that user is joined in the room with this id))
router.get('/:id',authenticate,getRoom); //fetch room details based on room id, can be used to know about room and get access to the messages of the room
router.post('/create',authenticate,createRoom); //create new room
router.put('/update/:id',authenticate,updateRoom); //update room details
router.delete('/delete/:id',authenticate,deleteRoom);
router.put('/addUser/:id',authenticate,addUser); //add user to room  
router.put('/leave/:id',authenticate,removeUser)
router.get('/get/random',showRandom); //will show a random list of current rooms
router.get('/get/search',search); //search rooms

export default router;