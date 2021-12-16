let users = [];

module.exports = (io, socket) => {
  const userConnected = (name) => {
    const user = { name, socketId: socket.id };
    users = [...users, user];
    socket.emit('user:list', users);
    socket.broadcast.emit('user:connect', user);
  };

  const userDisconnected = () => {
    socket.broadcast.emit('user:disconnect', socket.id);
    users = users.filter((x) => x.socketId !== socket.id);
  };

  socket.on('user:connect', userConnected);
  socket.on('disconnect', userDisconnected);
};
