import React from 'react';
import { View } from 'react-native';

import { CenteredView } from '@covid/components/CenteredView';
import { colors } from '@theme';

export const CenterView = (fn: () => React.ReactNode) => <CenteredView>{fn()}</CenteredView>;

export const DarkBackground = (fn: () => React.ReactNode) => (
  <View style={{ flex: 1, backgroundColor: colors.predict }}>{fn()}</View>
);
