import React, { ReactNode, useState, useCallback } from 'react';

interface IMessageContext {
  message: string;
  addMessage: (msg: string) => void;
  removeMessage: () => void;
}

export const MessageContext = React.createContext<IMessageContext>({
  message: '',
  addMessage: () => {},
  removeMessage: () => {},
});

interface IProps {
  children: ReactNode;
}

function MessageProvider({ children }: IProps) {
  const [message, setMessage] = useState('');
  const removeMessage = () => setMessage('');
  const addMessage = (message: string) => setMessage(message);

  const contextValue: IMessageContext = {
    message,
    addMessage: useCallback((message) => addMessage(message), []),
    removeMessage: useCallback(() => removeMessage(), []),
  };

  return <MessageContext.Provider value={contextValue}>{children}</MessageContext.Provider>;
}

export default MessageProvider;
