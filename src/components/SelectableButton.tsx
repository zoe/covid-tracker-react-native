import { RegularText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import { Button } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

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
    <Button onPress={onPress} style={btnStyle} {...buttonProps}>
      <RegularText style={[fontStyles.bodyLight, styles.label, { color: textColor }]} {...textProps}>
        {children}
      </RegularText>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    elevation: 0,
    height: 48,
    justifyContent: 'center',
  },
  label: {
    lineHeight: 20,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
});
