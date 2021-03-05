import React from 'react';
import { Dimensions } from 'react-native';

import { IUIMessage } from '@covid/core/state/';
import { useMessage } from '@covid/common';

// import { Banner } from '../banners';
// import { Dialog } from '../dialogs';
import { SnackBar } from '../snackbars';

import { SContainerView } from './styles';

function MessagingContainer() {
  const { height, width } = Dimensions.get('window');
  const { message, removeMessage } = useMessage();
  const msg: IUIMessage = { messageType: 'SNACKBAR', message: { title: '', body: message } };

  return (
    <SContainerView active={!!message} height={height} width={width}>
      {message ? <SnackBar active message={msg} variant="bottom" action={() => removeMessage()} /> : null}
    </SContainerView>
  );
}

export default MessagingContainer;
