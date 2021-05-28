import { IUIMessage, useMessage } from '@covid/common';
import React from 'react';
import { Dimensions } from 'react-native';

import { Banner } from '../banners';
import { Dialog } from '../dialogs';
import { SnackBar } from '../snackbars';
import { SContainerView } from './styles';

function MessagingContainer() {
  const { height, width } = Dimensions.get('window');
  const { message } = useMessage();

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
            action={message.actions ? message.actions[0] : undefined}
            message={message}
            variant="bottom"
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
