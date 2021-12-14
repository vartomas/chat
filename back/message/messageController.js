const Message = require('./messageModel');

const createMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.json({ success: true, _id: message._id });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const getMessages = async (req, res) => {
  const count = req.params.count;

  const messages = await Message.find().skip(count).limit(20).sort('field -createdAt');

  res.json(messages);

  try {
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports = {
  createMessage,
  getMessages,
};
