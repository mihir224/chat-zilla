import express from 'express';
import { googleAuth, signin, signup, logout } from '../controllers/auth.js';

const router=express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',googleAuth);
router.post('/logout',logout);

export default router;