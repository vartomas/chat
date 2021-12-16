import { AnyAction, CombinedState, combineReducers } from 'redux';

import { User, userReducer } from './user/userReducer';
import { Chat, chatReducer } from './chat/chatReducer';

interface RootState {
  user: User;
  chat: Chat;
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  user: userReducer,
  chat: chatReducer,
});

export const rootReducer = (state: RootState | undefined, action: AnyAction) => combinedReducer(state, action);
