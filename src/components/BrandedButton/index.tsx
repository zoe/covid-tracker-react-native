import { colors, fontStyles } from '@theme';
import { Button } from 'native-base';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { ClickableProps } from '../Text';
import { ITest } from '../types';

interface BrandedButtonProps extends ITest {
  buttonProps?: any;
  textProps?: any;
}

export const BrandedButton = ({
  style,
  children,
  onPress,
  enable,
  buttonProps,
  textProps,
  hideLoading,
}: ClickableProps & BrandedButtonProps) => {
  const btnStyle = [styles.button, style];
  const isDisabled = enable === false;
  if (isDisabled) {
    btnStyle.push(styles.buttonDisabled);
  }

  return (
    <Button
      block
      style={btnStyle}
      onPress={() => {
        !isDisabled && onPress();
      }}
      {...buttonProps}>
      <Text style={[fontStyles.bodyLight, styles.buttonText]} {...textProps}>
        {children}
      </Text>
      {isDisabled && !hideLoading && <ActivityIndicator size="small" />}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    height: 56,
    backgroundColor: colors.brand,
    elevation: 0,
  },

  buttonDisabled: {
    backgroundColor: colors.backgroundBrandDisabled,
  },

  buttonText: {
    color: colors.white,
  },
});
