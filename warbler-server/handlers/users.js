const db = require('../models');

exports.followUser = async function (req, res, next) {
    try {
        let foundUser = await db.User.findById(req.params.id);
        let followUser = await db.User.findById(req.params.fid);
        let hasUpdated = foundUser.following.addToSet(followUser.id);
        if (hasUpdated.length) {
            followUser.followers.addToSet(foundUser.id);
            await followUser.save();
            await foundUser.save();
            return res.status(200).json({
                follow: "Successful"
            })
        } else {
            return res.status(200).json({
                follow: "Already Following!"
            })
        }
    } catch (err) {
        next(err);
    }
}

exports.unfollowUser = async function (req, res, next) {
    try {
        let foundUser = await db.User.findById(req.params.id);
        let unfollowUser = await db.User.findById(req.params.fid);
        let unchanged = foundUser.following.length;
        foundUser.following.pull(unfollowUser.id);
        let changed = foundUser.following.length;
        if (changed < unchanged) {
            unfollowUser.followers.pull(foundUser.id);
            await unfollowUser.save();
            await foundUser.save();
            return res.status(200).json({
                unfollow: "Successful"
            })
        } else {
            return res.status(200).json({
                unfollow: "Already UnFollowed!"
            })
        }
    } catch (err) {
        next(err);
    }
}