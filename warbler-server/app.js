require('dotenv').config();
const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express();

app.use(cors());
app.use(bodyParser.json());
    
const errorHandler = require('./handlers/error');

//* Routes
const authRoutes = require('./routes/auth'),
    messageRoutes = require('./routes/messages');

const db = require('./models');

const {
    loginRequired,
    ensureCorrectUser
} = require('./middlewares/auth');

app.use('/api/auth', authRoutes);
app.use(
    '/api/users/:id/messages',
    loginRequired,
    ensureCorrectUser,
    messageRoutes
);

app.get("/api/messages", loginRequired, async function (req, res, next) {
    try {
        let messages =
            await db.Messages
            .find()
            .sort({
                createdAt: "desc"
            })
            .populate("user", {
                username: true,
                profileImage: true
            });
        return res.status(200).json(messages);
    } catch (err) {
        return next(err);
    }
});

//*Errors
app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404
    next(err);
});
app.use(errorHandler);


app.listen(process.env.PORT, function () {
    console.log(`Running on ${process.env.PORT} in ${process.env.NODE_ENV} ENV`);
});