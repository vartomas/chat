const router = require('express').Router();

const MessageController = require('./message/messageController');

router.post('/message', MessageController.createMessage);
router.get('/messages/:count', MessageController.getMessages);

module.exports = router;
