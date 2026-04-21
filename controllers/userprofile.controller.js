import { User } from "../models/User.schema.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";


const aboutUpdate = asyncHandler(async (req, res) => {

    const { username } = req.params;   //  this is use  for geting data from parameters 
    const { about }    = req.body;     //   this is use  for geting data from body .json , form etc 


    if (!username) {
        return res.status(400).json({ msg: ' username not found' })
    }

    const user = await User.findOne({ username });  // this will retun full document 

    if (!user) {
        return res.status(404).json({ msg: ' User not exists ' });

    }


    const profileUpdated = await User.findByIdAndUpdate(user._id, { about });

    if (!profileUpdated) {
        return res.status(404).json({ msg: ' error occur in updating profile' });
    }

    return res.status(200).json({ msg: '  about updated successfuly ' })



})

const getUserProfile = asyncHandler(async (req, res) => {

    const { username } = req.params;

    if (!username) {
        return res.status(400).json({ msg: ' username not found' })
    }

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ msg: ' User not exists ' });

    }

    res.json(user.email);

})

export { aboutUpdate, getUserProfile }