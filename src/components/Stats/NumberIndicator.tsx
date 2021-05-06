import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { View } from 'native-base';

import { colors } from '@covid/theme';

interface IProps {
  number?: number;
  style?: StyleProp<ViewStyle>;
}

export function NumberIndicator({ number, style }: IProps) {
  return <View style={[styles.dot, style]}>{number != null && <Text style={styles.label}>{number}</Text>}</View>;
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: colors.coral,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
  },
  label: {
    color: colors.white,
    alignSelf: 'center',
    paddingLeft: 2,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 14,
  },
});
