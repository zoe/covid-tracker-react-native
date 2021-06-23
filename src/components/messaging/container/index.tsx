import { IUIMessage, useMessage } from '@covid/common';
import { Banner } from '@covid/components/messaging/banners';
import { Dialog } from '@covid/components/messaging/dialogs';
import { SnackBar } from '@covid/components/messaging/snackbars';
import * as React from 'react';
import { Dimensions } from 'react-native';

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
