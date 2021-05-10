import { colors, fontStyles } from '@theme';
import { Button } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IClickableProps } from '../../Text';
import { ITest } from '../../types';

interface IProps extends ITest {
  buttonProps?: any;
  textProps?: any;
}

function BrandedButton({
  style,
  children,
  onPress,
  enable,
  buttonProps,
  textProps,
  hideLoading,
}: IClickableProps & IProps) {
  const isDisabled = enable === false;

  return (
    <View style={isDisabled ? { opacity: 0.2 } : { opacity: 1 }}>
      <Button
        accessible
        block
        accessibilityRole="button"
        onPress={() => {
          !isDisabled && onPress();
        }}
        style={[styles.button, style]}
        testID="buttonTestID"
        {...buttonProps}
      >
        <Text style={[fontStyles.bodyLight, styles.buttonText]} {...textProps}>
          {children}
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.brand,
    borderRadius: 100,
    elevation: 0,
    height: 56,
  },

  buttonText: {
    color: colors.white,
  },
});

export default BrandedButton;
