import express from 'express';
import {authMiddleware} from '../Middlewares/AuthMiddleware.js';
import { profile,userLogin,userRegister } from '../Controllers/userController.js';
const router = express.Router();
router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/profile',authMiddleware,profile)

export default router