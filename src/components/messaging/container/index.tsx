import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import { selectUIMessages, addMessage, IUIMessage } from '@covid/core/ui-messaging';

import { Banner } from '../banners';
import { Dialog } from '../dialogs';
import { SnackBar } from '../snackbars';

import { SContainerView } from './styles';

function MessagingContainer() {
  const { height, width } = Dimensions.get('window');
  const uiMessageCollection = useSelector(selectUIMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        // dispatch(
        //   addMessage({
        //     messageType: 'SNACKBAR',
        //     message: { title: '', body: 'No internet connection' },
        //   })
        // );
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
        return <Banner message={message} />;
      case 'DIALOG':
        return <Dialog active message={message} />;
      default:
        return (
          <SnackBar
            active
            message={message}
            variant="bottom"
            action={message.actions ? message.actions[0] : undefined}
          />
        );
    }
  };

  return (
    <SContainerView active={!!message} height={height} width={width}>
      {message ? getMessage(message) : null}
    </SContainerView>
  );
}

export default MessagingContainer;
