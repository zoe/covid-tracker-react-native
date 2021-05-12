import { useContext } from 'react';

import { MessageContext } from '../../providers';

function useMessage() {
  const { message, addMessage, removeMessage } = useContext(MessageContext);
  return { addMessage, message, removeMessage };
}

export default useMessage;
