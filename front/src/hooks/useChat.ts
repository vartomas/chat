import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../state/store';
import { actions } from '../state/actions';
import { Message, User } from '../Types';

const socket = io('http://localhost:5000');

export const useChat = () => {
  const name = useSelector((state: RootState) => state.user.name);
  const chat = useSelector((state: RootState) => state.chat);

  const [input, setInput] = useState<string>('');

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getMessages();
  }, []); // eslint-disable-line

  useEffect(() => {
    dispatch(actions.socket.setSocket(socket));

    socket.on('connect', () => {
      socket.emit('user:connect', name);
      dispatch(actions.user.setSocketId(socket.id));
    });
    socket.on('user:connect', (users) => {
      dispatch(actions.chat.setUsers(users));
    });
    socket.on('user:disconnect', (users) => {
      dispatch(actions.chat.setUsers(users));
    });
    socket.on('user:list', (users) => {
      dispatch(actions.chat.setUsers(users));
    });
    socket.on('message:new', (message) => {
      dispatch(actions.chat.addMessage(message));
      scrollToBottom();
    });
    socket.on('name:change', (user: User) => {
      const newUserList = [...chat.users.filter((x) => x.socketId !== user.socketId), user];
      dispatch(actions.chat.setUsers(newUserList));
    });
  }, []); // eslint-disable-line

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getMessages = async () => {
    dispatch(actions.chat.setMessagesLoading(true));

    try {
      const response = await axios.get<Message[]>(`http://localhost:5000/messages/${chat.messages.length}`);
      dispatch(actions.chat.setMessages(response.data));
    } catch (error) {
      console.error(error);
    }

    dispatch(actions.chat.setMessagesLoading(false));
  };

  const sendMessage = async (message: Message) => {
    dispatch(actions.chat.addMessage(message));
    console.log(chat.users);

    try {
      const response = await axios.post<{ success: boolean; _id: string }>('http://localhost:5000/message/', message);

      if (response.data.success) {
        socket?.emit('message:new', { ...message, _id: response.data._id });
        scrollToBottom();
      }
    } catch (error) {
      dispatch(actions.chat.removeLastMessage());
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!socket?.id || !input) return;

    const message = {
      id: uuid(),
      body: input,
      date: new Date(),
      socketId: socket.id,
      username: name || 'Guest',
    };

    await sendMessage(message);
    setInput('');
  };

  const catchEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return {
    input,
    messagesEndRef,
    onInputChange: setInput,
    onSubmit: handleSubmit,
    catchEnter,
    getMessages,
  };
};
