// user main routes
import { Router } from "express";
import {loginUser, registerUser} from '../controllers/userAuth.controler.js';
import  {aboutUpdate , getUserProfile} from '../controllers/userprofile.controller.js';
import {userFollowersystem , userUnFollowersystem} from  '../controllers/userFollow.controller.js'

const router = Router();


router.post('/auth/register' , registerUser);
router.post('/auth/login' , loginUser);
router.post('/:userId',aboutUpdate);
router.get('/:usernameorID',getUserProfile);
router.post('/followers/:id',userFollowersystem);
router.post('/followers/:id',userUnFollowersystem);
export {router};
