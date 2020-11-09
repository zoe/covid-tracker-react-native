import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import { selectError, set } from '@covid/core/errors/slice';

import { SnackBar } from '../snackbars';

import { SContainerView } from './styles';

function MessagingContainer() {
  const { height, width } = Dimensions.get('window');
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(set({ active: false }));
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      dispatch(set({ active: !state.isConnected, dissmissable: false }));
    });

    const cleanUp = () => {
      unsubscribe();
    };

    return cleanUp;
  }, []);

  return (
    <SContainerView active={error.active} height={height} width={width}>
      {error.active && (
        <SnackBar
          active={error.active}
          iconName="iconName"
          message="There is an error"
          onClose={error.dissmissable ? handleClose : undefined}
          variant={error.variant ? error.variant : 'bottom'}
          button={{
            title: 'push',
            onPress: handleClose,
            buttonColorPalette: 'blue',
            buttonColorShade: 'main',
          }}
        />
      )}
    </SContainerView>
  );
}

export default MessagingContainer;
