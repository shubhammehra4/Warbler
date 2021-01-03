const db = require('../models'),
    User = require('../models/user'),
    Message = require('../models/message');

exports.createMessage = async function (req, res, next) {
    try {
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        
        let foundMessage = await db.Message.findById(message._id).populate("user", {
            username: true,
            profileImage: true
        });
        
        return res.status(200).json(foundMessage);
    } catch (err) {
        next(err);
    }
};

exports.likeMessage = async function (req, res, next) {
    try {
        let foundMessage = await db.Message.findById(req.params.message_id);
        let foundUser = await db.User.findById(req.params.id);
        foundUser.likedMessages.addToSet(foundMessage.id);
        await foundUser.save();
        
        let hasUpdated = foundMessage.likes.addToSet(foundUser.id);
        if(hasUpdated.length)
        {
            foundMessage.likesNumber = foundMessage.likesNumber+1;
        }
        await foundMessage.save();
        
        return res.status(200).json({
            like: "Successful"
        });
    } catch (err) {
        next(err);
    }
};

exports.unlikeMessage = async function (req, res, next) {
    try {
        let foundMessage = await db.Message.findById(req.params.message_id);
        let foundUser = await db.User.findById(req.params.id);
        foundUser.likedMessages.pull(foundMessage.id);
        await foundUser.save();
        
        let unchanged = foundMessage.likes.length; 
        foundMessage.likes.pull(foundUser.id);
        let changed = foundMessage.likes.length;
        if(changed<unchanged)
        {
            foundMessage.likesNumber = foundMessage.likesNumber-1;
        }
        await foundMessage.save();
        
        return res.status(200).json({
            unlike: "Successful"
        });
    } catch (err) {
        next(err);
    }
}

exports.getMessage = async function (req, res, next)  {
    try {
        let message = await db.Message.findById(req.params.message_id);
        
        return res.status(200).json(message);
    } catch (err) {
        return next(err);
    }
};

exports.deleteMessage = async function (req, res, next) {
    try {
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};