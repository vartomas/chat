import { useState, useEffect, useMemo, KeyboardEvent, useRef } from 'react';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
import { io, Socket } from 'socket.io-client';

interface MessageResponse {
  _id?: string;
  id: string;
  body: string;
  date: Date;
  socketId: string;
  username: string;
}

export const useChat = (name: string) => {
  const [input, setInput] = useState<string>('');
  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [socket, setSocket] = useState<Socket>();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('connect', () => {
      setSocket(socket);
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
