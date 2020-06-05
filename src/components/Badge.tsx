import { colors } from '@theme';
import { Badge } from 'native-base';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

type BadgeProps = {
  children: React.ReactNode;
};

export const CoralBadge: React.FC<BadgeProps> = (props) => (
  <Badge style={styles.badge}>
    <Text style={styles.badgeText}>{props.children}</Text>
  </Badge>
);

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'center',
    backgroundColor: colors.coral,
    borderRadius: 5,
    height: 30,
    marginBottom: 10,
  },
  badgeText: {
    color: colors.white,
    paddingHorizontal: 10,
  },
});
