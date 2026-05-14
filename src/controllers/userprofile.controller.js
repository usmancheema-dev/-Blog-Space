import { User } from "../models/User.schema.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHadler.js";

const aboutUpdate = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const { about } = req.body;

    if (about === undefined) {
        return res.status(400).json({ msg: ' Please provide about text ' })
    }

    const profileUpdated = await User.findByIdAndUpdate(userId, { about }, { new: true }).select("-password");

    if (!profileUpdated) {
        return res.status(404).json({ msg: ' User not found or error in updating profile' });
    }

    return res.status(200).json({ msg: ' about updated successfuly ', user: profileUpdated })
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


const updateAccountDetail = asyncHandler(async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        throw new ApiError(400, ' All  fields are required ');

    }


    const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            username,
            email
        }
    }, { new: true }).select("-password")

    return res.status(200).json({ msg: " Account details updated successfully", user })


})


const currentUser = asyncHandler(async (req, res) => {
    return res.status(200).json({ msg: " Current user fetched successfully", user: req.user });
})

const deleteUser = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        return res.status(404).json({ msg: ' user not found' });
    }

    return res.status(200).json({ msg: ' User deleted successfuly ' });



})



export { aboutUpdate, getUserProfile, currentUser, updateAccountDetail, deleteUser }