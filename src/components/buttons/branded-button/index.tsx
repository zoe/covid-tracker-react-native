import { Button } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fontStyles } from '@theme';

import { IClickableProps } from '../../Text';
import { ITest } from '../../types';

interface IProps extends ITest {
  buttonProps?: any;
  textProps?: any;
}

function BrandedButton({ style, children, onPress, enable, buttonProps, textProps }: IClickableProps & IProps) {
  return (
    <View style={enable === false ? { opacity: 0.2 } : { opacity: 1 }}>
      <Button
        accessible
        accessibilityRole="button"
        testID="buttonTestID"
        block
        style={[styles.button, style]}
        onPress={() => {
          if (enable !== false) {
            onPress();
          }
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
