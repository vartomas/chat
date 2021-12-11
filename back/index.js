const express = require('express');
const { createServer } = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const routes = require('./routes');
const registerMessageHandlers = require('./message/messageHandlers');

mongoose
  .connect('mongodb://localhost/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

app.use(express.json());

app.use('/', routes);

const onConnection = (socket) => {
  registerMessageHandlers(io, socket);
};

io.on('connection', onConnection);

server.listen(5000, () => console.log('listening'));
