import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

export interface User {
  name: string | null;
  socketId: string | null;
}

export const INITIAL_STATE: User = {
  name: localStorage.getItem('name') || 'Guest',
  socketId: null,
};

export const userReducer = createReducer(INITIAL_STATE, {
  [constants.user.SET_NAME]: (state, action) => {
    state.name = action.name;
  },
  [constants.user.SET_SOCKET_ID]: (state, action) => {
    state.socketId = action.socketId;
  },
});
