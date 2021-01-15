const db = require("../models"),
    jwt = require('jsonwebtoken');

exports.signin = async function (req, res, next) {
    try {
        let user = await db.User.findOne({ email: req.body.email});
        let { id, username, profileImage } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign({
                    id,
                    username,
                    profileImage
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImage,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Password."
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid Email."
        });
    }

}

exports.signup = async function (req, res, next) {
    try {
        if (req.body.password === req.body.confirmpassword) {
            console.log(req.body);
            let user = await db.User.create({...req.body});
            let { id, username, profileImage } = user;
            let token = jwt.sign({
                    id,
                    username,
                    profileImage
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImage,
                token
            });
        } else {
            return next({
                status:400,
                message: "Passwords don't match. Please try again!"
            });
        }
        
    } catch (err) {
        console.log("here");
        //if validation fails
        if (err.code === 11000) {
            err.keyPattern.email ?
                err.message = "Sorry, that email is already in use." :
                err.message = "Sorry, that username is already in use.";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}