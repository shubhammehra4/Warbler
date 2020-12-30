const express = require('express'),
    router = express.Router({
        mergeParams: true
    });

const { createMessage, getMessage, deleteMessage, likeMessage, unlikeMessage } = require('../handlers/messages');

router.route("/")
    .post(createMessage);

router.route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage);

router.route("/:message_id/like")
    .post(likeMessage);

router.route("/:message_id/unlike")
    .post(unlikeMessage);

module.exports = router;