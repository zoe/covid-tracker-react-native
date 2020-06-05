import { colors, fontStyles } from '@theme';
import { Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

import { BigButton, IButtonPress } from './Button';
import { FieldWrapper } from './Screen';

interface SelectorButtonProps {
  onPress?: IButtonPress;
  text: string;
}

export const SelectorButton = (props: SelectorButtonProps) => (
  <FieldWrapper style={styles.fieldWrapper}>
    <BigButton onPress={props.onPress}>
      <Text style={[fontStyles.bodyLight, styles.buttonText]}>{props.text}</Text>
    </BigButton>
  </FieldWrapper>
);

const styles = StyleSheet.create({
  fieldWrapper: {},

  buttonText: {
    color: colors.primary,
  },
});
