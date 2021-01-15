const mongoose = require('mongoose'),
    User = require('./user');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 100
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
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

messageSchema.pre('remove', async function (next) {
    try {
        let user = await User.findById(this.user);
        user.messages.remove(this.id);
        await User.update({}, { $pull: { likedMessages: { $in: this.id } } });
        await user.save();
        
        return next();
    } catch (err) {
        return next(err);
    }
});

messageSchema.index({ createdAt: -1 })

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;