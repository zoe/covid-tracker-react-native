import { colors } from '@theme';
import { Card } from 'native-base';
import * as React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const BasicCard: React.FC<CardProps> = (c) => {
  return <Card style={[styles.card, c.style]}>{c.children}</Card>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 16,
    padding: 12,
    width: '100%',
  },
});
