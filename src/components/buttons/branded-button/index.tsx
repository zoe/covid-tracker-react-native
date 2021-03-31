import { Button } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fontStyles } from '@theme';

import { IClickableProps } from '../../Text';
import { ITest } from '../../types';

interface IProps extends ITest {
  buttonProps?: any;
  textProps?: any;
  testID?: string;
}

function BrandedButton({
  style,
  children,
  onPress,
  enable,
  buttonProps,
  textProps,
  hideLoading,
  testID,
}: IClickableProps & IProps) {
  const isDisabled = enable === false;

  return (
    <View style={isDisabled ? { opacity: 0.2 } : { opacity: 1 }}>
      <Button
        testID={testID ?? 'buttonTestID'}
        block
        style={[styles.button, style]}
        onPress={() => {
          !isDisabled && onPress();
        }}
        {...buttonProps}>
        <Text style={[fontStyles.bodyLight, styles.buttonText]} {...textProps}>
          {children}
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    height: 56,
    backgroundColor: colors.brand,
    elevation: 0,
  },

  buttonText: {
    color: colors.white,
  },
});

export default BrandedButton;
