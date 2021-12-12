import { useState, useEffect, KeyboardEvent } from 'react';
import { useLocalStorageValue } from '@mantine/hooks';
import axios from 'axios';
import { v1 as uuid } from 'uuid';

interface MessageResponse {
  _id?: string;
  id: string;
  body: string;
  date: Date;
  socketId: string;
  username: string;
}

export const useChat = () => {
  const [name] = useLocalStorageValue<string>({ key: 'name' });
  const [input, setInput] = useState<string>('');
  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageResponse[]>([]);

  const getMessages = async (dose: number) => {
    setMessagesLoading(true);

    try {
      const response = await axios.get<MessageResponse[]>(`http://localhost:5000/messages/${dose}`);
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }

    setMessagesLoading(false);
  };

  const sendMessage = async (message: Omit<MessageResponse, '_id'>) => {
    setMessages((prev) => [message, ...prev]);

    try {
      const response = await axios.post<{ success: boolean; _id: string }>('http://localhost:5000/message/', message);
      if (response.data.success) setMessages((prev) => prev.map((x) => (x.id === message.id ? { ...x, _id: response.data._id } : x)));
    } catch (error) {
      setMessages((prev) => [...prev.slice(1, 0)]);
      console.error(error);
    }
  };

  useEffect(() => {
    getMessages(1);
  }, []);

  const handleSubmit = () => {
    const message = {
      id: uuid(),
      body: input,
      date: new Date(),
      socketId: 'bla',
      username: name,
    };

    sendMessage(message);
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
    onInputChange: setInput,
    onSubmit: handleSubmit,
    catchEnter,
  };
};
