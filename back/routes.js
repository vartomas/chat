const router = require('express').Router();

const MessageController = require('./message/messageController');

router.post('/message', MessageController.createMessage);
router.get('/messages/:dose', MessageController.getMessages);

module.exports = router;
