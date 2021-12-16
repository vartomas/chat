import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';

import { User } from '../Types';
import { RootState } from '../state/store';
import { actions } from '../state/actions';

interface MessageResponse {
  _id?: string;
  id: string;
  body: string;
  date: Date;
  socketId: string;
  username: string;
}

const socket = io('http://localhost:5000');

export const useChat = () => {
  const name = useSelector((state: RootState) => state.user.name);
  const users = useSelector((state: RootState) => state.chat.users);

  const [input, setInput] = useState<string>('');
  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageResponse[]>([]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('user:connect', name);
      dispatch(actions.user.setSocketId(socket.id));
    });
    socket.on('user:connect', (user) => {
      dispatch(actions.chat.setUsers([user, ...users]));
    });
    socket.on('user:disconnect', (socketId) => {
      dispatch(actions.chat.setUsers(users.filter((x) => x.socketId !== socketId)));
    });
    socket.on('user:list', (users) => {
      dispatch(actions.chat.setUsers(users));
    });
    socket.on('message:new', (message) => {
      setMessages((prev) => [message, ...prev]);
      scrollToBottom();
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getMessages = async () => {
    setMessagesLoading(true);

    try {
      const response = await axios.get<MessageResponse[]>(`http://localhost:5000/messages/${messages.length}`);
      setMessages((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error(error);
    }

    setMessagesLoading(false);
  };

  const sendMessage = async (message: Omit<MessageResponse, '_id'>) => {
    setMessages((prev) => [message, ...prev]);

    try {
      const response = await axios.post<{ success: boolean; _id: string }>('http://localhost:5000/message/', message);

      if (response.data.success) {
        setMessages((prev) => prev.map((x) => (x.id === message.id ? { ...x, _id: response.data._id } : x)));
        socket?.emit('message:new', { ...message, _id: response.data._id });
        scrollToBottom();
      }
    } catch (error) {
      setMessages((prev) => [...prev.slice(1, 0)]);
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
    loading: messagesLoading,
    messages,
    socketId: socket?.id,
    messagesEndRef,
    onInputChange: setInput,
    onSubmit: handleSubmit,
    catchEnter,
    getMessages,
  };
};
