import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';

import { ClickableText } from '../Text';

interface Props {
  text: string;
  onPress: VoidFunction;
  styles?: any;
}

export const ClearButton: React.FC<Props> = ({ text, onPress, styles: containerStyles }) => (
  <View style={[styles.container, containerStyles]}>
    <ClickableText onPress={onPress} style={styles.text}>
      {text}
    </ClickableText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 24,
    marginBottom: 8,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: colors.primary,
  },
});
