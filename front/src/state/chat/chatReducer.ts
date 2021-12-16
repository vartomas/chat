import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';
import { User } from '../../Types';

export interface Chat {
  users: User[];
}

export const INITIAL_STATE: Chat = {
  users: [],
};

export const chatReducer = createReducer(INITIAL_STATE, {
  [constants.chat.SET_USERS]: (state, action) => {
    state.users = action.users;
  },
});
