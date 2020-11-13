import React, { useEffect } from 'react';
import { Dimensions, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import { selectUIMessages, addMessage, IUIMessage, reset } from '@covid/core/ui-messaging';

import { SnackBar } from '../snackbars';
import { Dialog } from '../dialogs';

import { SContainerView } from './styles';

function MessagingContainer() {
  const { width } = Dimensions.get('window');
  const uiMessageCollection = useSelector(selectUIMessages);
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(reset());
  };

  const serializeFunction = (func) => func.toString();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        dispatch(
          addMessage({
            actions: [{ label: 'close', action: serializeFunction(handleReset) }],
            messageType: 'SNACKBAR',
            message: 'No internet connection',
          })
        );
      }
    });

    const cleanUp = () => {
      unsubscribe();
    };

    return cleanUp;
  }, []);

  const message = uiMessageCollection.messages[0];

  const getMessage = (message: IUIMessage) => {
    switch (message.messageType) {
      case 'BANNER':
        return <Text>BANNER</Text>;
      case 'DIALOG':
        return <Dialog message={message} />;
      default:
        return (
          <SnackBar
            active
            message={message.message}
            variant="top"
            action={message.actions ? message.actions[0] : undefined}
          />
        );
    }
  };

  return <SContainerView width={width}>{message ? getMessage(message) : null}</SContainerView>;
}

export default MessagingContainer;
