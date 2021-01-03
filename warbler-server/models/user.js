const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName : {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
    likedMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    try {
        //If password is not changed
        if (!this.isModified("password")) {
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 15);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;