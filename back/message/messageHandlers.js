module.exports = (io, socket) => {
  const newMessage = (message) => {
    socket.broadcast.emit('message:new', message);
  };

  socket.on('message:new', newMessage);
};
