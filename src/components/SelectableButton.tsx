import { Button } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

import { colors, fontStyles } from '@covid/theme';
import { RegularText } from '@covid/components/Text';

interface IProps {
  buttonProps?: any;
  textProps?: any;
  selected: boolean;
  children: React.ReactNode;
  style?: any;
  onPress: () => void;
}

export function SelectableButton({ style, children, onPress, buttonProps, textProps, selected }: IProps) {
  const backgroundColor = selected ? colors.brand : colors.backgroundTertiary;
  const textColor = selected ? colors.white : colors.primary;
  const btnStyle = [styles.button, style, { backgroundColor }];

  return (
    <Button style={btnStyle} onPress={onPress} {...buttonProps}>
      <RegularText style={[fontStyles.bodyLight, styles.label, { color: textColor }]} {...textProps}>
        {children}
      </RegularText>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 48,
    elevation: 0,
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 20,
  },
});
