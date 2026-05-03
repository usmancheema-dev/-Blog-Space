import { User } from "../models/User.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const userFollowersystem = asyncHandler(async (req, res) => {

    const { idA } = req.body;        // acting user (temporary for learning)
    const idB = req.params.id;       // target user to follow

    if (!idA || !idB) {
        return res.status(400).json({ msg: "Both IDs are required" });
    }

    if (idA === idB) {
        return res.status(400).json({ msg: "You cannot follow yourself" });
    }
    const currentUser = await User.findById(idA);
    const targetUser = await User.findById(idB);

    if (!currentUser || !targetUser) {
        return res.status(404).json({ msg: "User not found" });
    }

    const alreadyFollowing = currentUser.following.some(
        (id) => id.toString() === idB
    );

    if (alreadyFollowing) {
        return res.status(400).json({ msg: "You are already following this user" });
    }

    currentUser.following.push(idB);
    targetUser.followers.push(idA);

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({ msg: "User followed successfully" });
});



const userUnFollowersystem = asyncHandler(async (req, res) => {

    const { idA } = req.body;        // acting user (temporary for learning)
    const idB = req.params.id;       // target user to follow

    if (!idA || !idB) {
        return res.status(400).json({ msg: "Both IDs are required" });
    }

    if (idA === idB) {
        return res.status(400).json({ msg: "You cannot follow yourself" });
    }
    const currentUser = await User.findById(idA);
    const targetUser = await User.findById(idB);

    if (!currentUser || !targetUser) {
        return res.status(404).json({ msg: "User not found" });
    }

    const alreadyFollowing = currentUser.following.some(
        (id) => id.toString() === idB
    );

    if (!alreadyFollowing) {
        return res.status(400).json({ msg: "You are already following this user" });
    }

    currentUser.following = currentUser.following.filter(id => id.toString() !== idB)
    targetUser.followers = targetUser.followers.filter(id => id.toString() !== idA)

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({ msg: "User followed successfully" });
});

export { userFollowersystem , userUnFollowersystem};