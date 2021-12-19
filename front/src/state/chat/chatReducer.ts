import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';
import { User, Message } from '../../Types';

export interface Chat {
  users: User[];
  messages: Message[];
  loading: boolean;
}

export const INITIAL_STATE: Chat = {
  users: [],
  messages: [],
  loading: false,
};

export const chatReducer = createReducer(INITIAL_STATE, {
  [constants.chat.SET_USERS]: (state, action) => {
    state.users = action.users;
  },
  [constants.chat.SET_MESSAGES]: (state, action) => {
    state.messages = action.messages;
  },
  [constants.chat.ADD_MESSAGE]: (state, action) => {
    state.messages = [action.message, ...state.messages];
  },
  [constants.chat.REMOVE_LAST_MESSAGE]: (state) => {
    state.messages = [...state.messages.slice(1, 0)];
  },
  [constants.chat.SET_MESSAGES_LOADING]: (state, action) => {
    state.loading = action.loading;
  },
});
