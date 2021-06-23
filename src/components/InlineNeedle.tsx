import Needle from '@assets/icons/Needle';
import * as React from 'react';
import { View } from 'react-native';

export const InlineNeedle: React.FC = (props) => (
  <View style={{ marginRight: 8, top: -2 }}>
    <Needle />
  </View>
);
