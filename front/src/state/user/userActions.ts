import { constants } from '../constants';

const setName = (name: string) => ({
  type: constants.user.SET_NAME,
  name,
});

const setSocketId = (socketId: string) => ({
  type: constants.user.SET_SOCKET_ID,
  socketId,
});

export const userActions = {
  setName,
  setSocketId,
};
