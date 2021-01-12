require('dotenv').config();
const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    db = require('./models/index');
    app = express();
const errorHandler = require('./handlers/error');


app.use(cors());
app.use(bodyParser.json());
    

//* Routes
const authRoutes = require('./routes/auth'),
    messageRoutes = require('./routes/messages'),
    userRoutes = require('./routes/users');

const { loginRequired, ensureCorrectUser } = require('./middlewares/auth');

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, messageRoutes);
app.use('/api/user/:id/', loginRequired, userRoutes);

app.get("/api/messages", loginRequired, async function (req, res, next) {
    try {
        const skip = parseInt(req.query.skip);
        const limit = 20;
        const startIndex = skip+1;
        const endIndex = startIndex + limit;
        const results = {};
        if(endIndex < await db.Message.countDocuments().exec()) {
            results.hasMore = true;
        } else {
            results.hasMore = false;
        }
        results.results = 
            await db.Message.find()
                .lean()
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(startIndex)
                .populate("user", { username: true, profileImage: true })
                .select('text user createdAt likesNumber');
                
        return res.status(200).json(results);
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