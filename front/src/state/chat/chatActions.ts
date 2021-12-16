import { constants } from '../constants';
import { User } from '../../Types';

const setUsers = (users: User[]) => ({
  type: constants.chat.SET_USERS,
  users,
});

export const chatActions = {
  setUsers,
};
