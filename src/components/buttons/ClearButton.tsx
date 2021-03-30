import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';

import { ClickableText } from '../Text';

interface IProps {
  text: string;
  onPress: VoidFunction;
  styles?: any;
}

export function ClearButton({ text, onPress, styles: containerStyles }: IProps) {
  return (
    <View style={[styles.container, containerStyles]}>
      <ClickableText onPress={onPress} style={styles.text}>
        {text}
      </ClickableText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 24,
    marginBottom: 8,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: colors.red,
  },
});
