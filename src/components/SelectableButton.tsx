import { Button } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { colors, fontStyles } from '@theme';
import { RegularText } from '@covid/components/Text';

interface SelectableButtonButtonProps {
  buttonProps?: any;
  textProps?: any;
  selected: boolean;
  children: React.ReactNode;
  style?: any;
  onPress: () => void;
}

export const SelectableButton = ({
  style,
  children,
  onPress,
  buttonProps,
  textProps,
  selected,
}: SelectableButtonButtonProps) => {
  const backgroundColor = selected ? colors.brand : colors.backgroundTertiary;
  const textColor = selected ? colors.white : colors.primary;
  const btnStyle = [styles.button, style, { backgroundColor }];

  return (
    <Button style={btnStyle} onPress={onPress} {...buttonProps}>
      <RegularText style={[fontStyles.bodyLight, { color: textColor }]} {...textProps}>
        {children}
      </RegularText>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 48,
    elevation: 0,
    justifyContent: 'center',
  },
});
