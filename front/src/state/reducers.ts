import { AnyAction, CombinedState, combineReducers } from 'redux';

import { User, userReducer } from './user/userReducer';
import { Chat, chatReducer } from './chat/chatReducer';
import { ISocket, socketReducer } from './socket/socketReducer';

interface RootState {
  user: User;
  chat: Chat;
  socket: ISocket;
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  user: userReducer,
  chat: chatReducer,
  socket: socketReducer,
});

export const rootReducer = (state: RootState | undefined, action: AnyAction) => combinedReducer(state, action);
