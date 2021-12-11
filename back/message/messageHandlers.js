module.exports = (io, socket) => {
  const newMessage = (payload) => {
    socket.broadcast.emit('message:new', payload);
  };

  socket.on('message:new', newMessage);
};
