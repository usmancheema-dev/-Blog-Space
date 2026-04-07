import { User } from "../models/User.schema.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";


const aboutUpdate = asyncHandler(async (req, res) => {

    const { about } = req.body;

    if (!about) {
        return res.status(409).json({ msg: ' please provided about fields ' })
    }

    const { userId } = req.params;

    if (!userId) {
        res.status(401).json('please find by username or id only');
    }
    
    let profile;

    if (mongoose.Types.ObjectId.isValid(userId)) {
        profile = await User.findById(userId);
    }

    if (!profile) {
        profile = await User.findOneAndUpdate({ username: userId }, {about});
    }
    if (!profile) {
        return res.status(404).json({ msg: 'User not found' });

    }
    
    return res.status(200).json({ msg: '  about updated successfuly ' })



})

const getUserProfile = asyncHandler(async (req, res) => {

    const { usernameorID } = req.params;

    if (!usernameorID) {
        return res.status(400).json({ msg: ' username not match' })
    }

    let userProfile;


    if (mongoose.Types.ObjectId.isValid(usernameorID)) {
        userProfile = await User.findById(usernameorID);
    }

    if (!userProfile) {
        userProfile = await User.findOne({ username: usernameorID });

    }

    if (!userProfile) {
        return res.status(404).json({ msg: 'User not found' });

    }
    res.json(userProfile.followers);

})

export { aboutUpdate, getUserProfile }