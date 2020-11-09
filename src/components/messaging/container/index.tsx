import React from 'react';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { selectError, set } from '@covid/core/errors/slice';

import { SnackBar } from '../snackbars';

import { SContainerView } from './styles';

function MessagingContainer() {
  const { height, width } = Dimensions.get('window');
  const { active } = useSelector(selectError);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(set({ active: false }));
  };
  return (
    <SContainerView active={active} height={height} width={width}>
      {active && (
        <SnackBar active={active} iconName="iconName" message="There is an error" onClose={handleClose} variant="top" />
      )}
    </SContainerView>
  );
}

export default MessagingContainer;
