import { ClickableText } from '@covid/components/Text';
import { colors } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    paddingBottom: 24,
    paddingTop: 15,
  },
  text: {
    color: colors.red,
  },
});
