import React from 'react';
import { View } from 'react-native';

import { colors } from '@theme';

export const PaddingView = (fn: () => React.ReactNode) => <View style={{ marginHorizontal: 16 }}>{fn()}</View>;

export const CenterView = (fn: () => React.ReactNode) => (
  <View style={{ flex: 1, justifyContent: 'center' }}>{fn()}</View>
);

export const DarkBackground = (fn: () => React.ReactNode) => (
  <View style={{ flex: 1, backgroundColor: colors.predict }}>{fn()}</View>
);
