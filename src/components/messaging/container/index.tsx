import React from 'react';
import { Text, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import { selectError } from '@covid/core/errors/slice';

import { SContainerView } from './styles';

function MessagingContainer() {
  const { height, width } = Dimensions.get('window');
  const { active } = useSelector(selectError);
  return (
    <SContainerView active={active} height={height} width={width}>
      <Text>MessagingContainer</Text>
    </SContainerView>
  );
}

export default MessagingContainer;
