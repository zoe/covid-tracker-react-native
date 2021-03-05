import React from 'react';
import { Dimensions } from 'react-native';

import { useMessage, IUIMessage } from '@covid/common';

import { Banner } from '../banners';
import { Dialog } from '../dialogs';
import { SnackBar } from '../snackbars';

import { SContainerView } from './styles';

function MessagingContainer() {
  const { height, width } = Dimensions.get('window');
  const { message, removeMessage } = useMessage();

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
