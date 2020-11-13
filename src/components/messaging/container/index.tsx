import React, { useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import { selectUIMessages, addMessage, IUIMessage } from '@covid/core/ui-messaging';

import { SnackBar } from '../snackbars';
import { Dialog } from '../dialogs';

import { SContainerView } from './styles';

function MessagingContainer() {
  const { height, width } = Dimensions.get('window');
  const uiMessageCollection = useSelector(selectUIMessages);
  const dispatch = useDispatch();

  const handleClose = () => {
    // dispatch(set({ active: false, message: '' }));
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('connection: ', state.isConnected);
      dispatch(
        addMessage({
          messageType: 'SNACKBAR',
          message: 'No internet connection',
        })
      );
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
        return <SnackBar active message={message.message} variant="top" />;
    }
  };

  return (
    <SContainerView height={1} width={width}>
      {message ? getMessage(message) : null}
    </SContainerView>
  );
}

export default MessagingContainer;
