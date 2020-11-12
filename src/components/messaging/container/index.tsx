import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import NetInfo from '@react-native-community/netinfo';

import { selectError, set } from '@covid/core/errors/slice';

import { SnackBar } from '../snackbars';

import { SContainerView } from './styles';

function MessagingContainer() {
  const { height, width } = Dimensions.get('window');
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(set({ active: false, message: '' }));
  };

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     console.log('connection: ', state.isConnected);
  //     dispatch(
  //       set({
  //         active: !state.isConnected,
  //         dissmissable: false,
  //         variant: 'top',
  //         message: 'No internet connection',
  //       })
  //     );
  //   });

  //   const cleanUp = () => {
  //     unsubscribe();
  //   };

  //   return cleanUp;
  // }, []);

  return (
    <SContainerView active={error.active} height={height} width={width}>
      {error.active && (
        <SnackBar
          active={error.active}
          message={error.message}
          variant={error.variant ? error.variant : 'bottom'}
          cta={{ label: ' X ', action: handleClose }}
        />
      )}
    </SContainerView>
  );
}

export default MessagingContainer;
