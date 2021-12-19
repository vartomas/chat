import { constants } from '../constants';
import { User, Message } from '../../Types';

const setUsers = (users: User[]) => ({
  type: constants.chat.SET_USERS,
  users,
});

const setMessages = (messages: Message[]) => ({
  type: constants.chat.SET_MESSAGES,
  messages,
});

const addMessage = (message: Message) => ({
  type: constants.chat.ADD_MESSAGE,
  message,
});

const removeLastMessage = () => ({
  type: constants.chat.REMOVE_LAST_MESSAGE,
});

const setMessagesLoading = (loading: boolean) => ({
  type: constants.chat.SET_MESSAGES_LOADING,
  loading,
});

export const chatActions = {
  setUsers,
  setMessages,
  addMessage,
  removeLastMessage,
  setMessagesLoading,
};
