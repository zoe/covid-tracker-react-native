import { Button } from 'native-base';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, fontStyles } from '@covid/theme';
import { sizes } from '@covid/themes';

import { IClickableProps } from '../../Text';
import { ITest } from '../../types';

interface IProps extends ITest {
  buttonProps?: any;
  loading?: boolean;
  textProps?: any;
}

function BrandedButton({
  buttonProps,
  children,
  enable,
  loading,
  onPress,
  style,
  textProps,
}: IClickableProps & IProps) {
  const isDisabled = enable === false;

  return (
    <View style={isDisabled ? { opacity: 0.2 } : { opacity: 1 }}>
      <Button
        accessible
        accessibilityRole="button"
        testID="buttonTestID"
        block
        style={[styles.button, style]}
        onPress={() => {
          !isDisabled && onPress();
        }}
        {...buttonProps}>
        {loading ? <ActivityIndicator color={colors.white} style={styles.activityIndicator} /> : null}
        <Text style={[fontStyles.bodyLight, styles.buttonText]} {...textProps}>
          {children}
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    left: sizes.buttonHeight / 2,
  },
  button: {
    borderRadius: sizes.buttonHeight / 2,
    height: sizes.buttonHeight,
    backgroundColor: colors.brand,
    elevation: 0,
  },
  buttonText: {
    color: colors.white,
  },
});

export default BrandedButton;
