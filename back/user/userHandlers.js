let users = [];

module.exports = (io, socket) => {
  const userConnected = (name) => {
    const user = { name, socketId: socket.id };
    users = [...users, user];
    socket.emit('user:list', users);
    socket.broadcast.emit('user:connect', users);
  };

  const userDisconnected = () => {
    users = users.filter((x) => x.socketId !== socket.id);
    socket.broadcast.emit('user:disconnect', users);
  };

  const handleNameChange = (name) => {
    io.emit('name:change', { name, socketId: socket.id });
    users = [...users.filter((x) => x.socketId !== socket.id), { name, socketId: socket.id }];
  };

  socket.on('user:connect', userConnected);
  socket.on('disconnect', userDisconnected);
  socket.on('name:change', handleNameChange);
};
