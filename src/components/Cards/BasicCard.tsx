import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'native-base';

import { colors } from '@theme';

type CardProps = {
  children: React.ReactNode;
  style?: object;
};

export const BasicCard: React.FC<CardProps> = (c) => {
  return <Card style={[styles.card, c.style]}>{c.children}</Card>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 16,
    padding: 12,
  },
});
