import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
import { io } from 'socket.io-client';

import { User } from '../App';

interface MessageResponse {
  _id?: string;
  id: string;
  body: string;
  date: Date;
  socketId: string;
  username: string;
}

const socket = io('http://localhost:5000');

export const useChat = (name: string, setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
  const [input, setInput] = useState<string>('');
  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageResponse[]>([]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('user:connect', name);
    });
    socket.on('user:connect', (user) => {
      setUsers((prev) => [user, ...prev]);
    });
    socket.on('user:disconnect', (socketId) => {
      setUsers((prev) => prev.filter((x) => x.socketId !== socketId));
    });
    socket.on('user:list', (users) => {
      setUsers(users);
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
      username: name,
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
