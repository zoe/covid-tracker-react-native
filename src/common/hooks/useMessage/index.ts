import { useContext } from 'react';

import { MessageContext } from '../../providers';

function useMessage() {
  const { message, addMessage, removeMessage } = useContext(MessageContext);
  return { message, addMessage, removeMessage };
}

export default useMessage;
