import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface IProps {
  number?: number;
  style?: StyleProp<ViewStyle>;
}

export function NumberIndicator({ number, style }: IProps) {
  return <View style={[styles.dot, style]}>{number != null ? <Text style={styles.label}>{number}</Text> : null}</View>;
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: colors.coral,
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  label: {
    alignSelf: 'center',
    color: colors.white,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 14,
    paddingLeft: 2,
  },
});
