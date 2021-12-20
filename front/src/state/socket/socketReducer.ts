import { createReducer } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

import { constants } from '../constants';

export interface ISocket {
  socket: Socket | null;
}

export const INITIAL_STATE: ISocket = {
  socket: null,
};

export const socketReducer = createReducer(INITIAL_STATE, {
  [constants.socket.SET_SOCKET]: (state, action) => {
    state.socket = action.socket;
  },
});
