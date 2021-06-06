import { MessageContext } from '@covid/common/providers';
import { useContext } from 'react';

function useMessage() {
  const { message, addMessage, removeMessage } = useContext(MessageContext);
  return { addMessage, message, removeMessage };
}

export default useMessage;
