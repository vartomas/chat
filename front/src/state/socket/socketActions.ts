import { constants } from '../constants';
import { Socket } from 'socket.io-client';

const setSocket = (socket: Socket) => ({
  type: constants.socket.SET_SOCKET,
  socket,
});

export const socketActions = {
  setSocket,
};
