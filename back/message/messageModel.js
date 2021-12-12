const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    socketId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'messages',
  }
);

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;
