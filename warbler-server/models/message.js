const mongoose = require('mongoose'),
    User = require('./user');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 200
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    likesNumber: {
        type: Number,
        default: 0,
        min:0
    }
},{
    timestamps: true,
});

messageSchema.pre('remove', async function (next) {
    try {
        let user = await User.findById(this.user);
        user.messages.remove(this.id);
        await User.update({},{$pull:{likedMessages:{$in: this.id}}});
        await user.save();
        return next();
    } catch (err) {
        return next(err);
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;