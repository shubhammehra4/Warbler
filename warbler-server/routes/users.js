const express = require('express'),
    router = express.Router({
        mergeParams: true
    });

const { followUser, unfollowUser } = require('../handlers/users');

router.route("/follow/:fid")
    .post(followUser);

router.route("/unfollow/:fid")
    .post(unfollowUser);

module.exports = router;