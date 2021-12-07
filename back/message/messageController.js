const Message = require('./messageModel');

const createMessage = async (req, res) => {
  try {
    console.log(req.body);
    const message = new Message(req.body);
    console.log(message);
    await message.save();
    res.json({ success: true });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const getMessages = async (req, res) => {
  const dose = req.params.dose;
  const skip = 10 * (dose - 1);
  const limit = 10;

  console.log(skip);

  const messages = await Message.find().skip(skip).limit(limit).sort('field -date');

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
