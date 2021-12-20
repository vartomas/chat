import { userActions } from './user/userActions';
import { chatActions } from './chat/chatActions';
import { socketActions } from './socket/socketActions';

export const actions = {
  user: userActions,
  chat: chatActions,
  socket: socketActions,
};
