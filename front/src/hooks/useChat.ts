import { useState, FormEvent, KeyboardEvent } from 'react';

export const useChat = () => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = () => {
    console.log(message);
    setMessage('');
  };

  const catchEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return {
    message,
    onMessageChange: setMessage,
    onSubmit: handleSubmit,
    catchEnter,
  };
};
