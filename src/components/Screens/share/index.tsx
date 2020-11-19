import React from 'react';
import { Dimensions, Text, View } from 'react-native';

import ShareContainer from './container';
import ShareLabel from './label';
import { SContainerView } from './styles';

function ShareScreen() {
  const { height, width } = Dimensions.get('window');
  return (
    <SContainerView height={height} width={width}>
      <ShareContainer />
      <ShareLabel />
    </SContainerView>
  );
}

export default ShareScreen;
