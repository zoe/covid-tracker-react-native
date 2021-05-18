import { Button } from 'native-base';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { colors, fontStyles } from '@covid/theme';
import { sizes } from '@covid/themes';
import { IClickableProps } from '@covid/components/Text';
import { ITest } from '@covid/components/types';

interface IProps extends IClickableProps, ITest {
  loading?: boolean;
}

export default function BrandedButton({ children, enable, loading, onPress, style }: IProps) {
  const isDisabled = enable === false;

  return (
    <Button
      activeOpacity={isDisabled ? 0.1 : 0.6}
      accessible
      accessibilityRole="button"
      testID="buttonTestID"
      block
      color={colors.brand}
      style={[styles.button, isDisabled && styles.opacity, style]}
      onPress={() => {
        !isDisabled && onPress();
      }}>
      {loading ? <ActivityIndicator color={colors.white} style={styles.activityIndicator} /> : null}
      <Text style={[fontStyles.bodyLight, styles.text]}>{children}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    left: sizes.buttonHeight / 2,
    position: 'absolute',
  },
  button: {
    backgroundColor: colors.brand,
    borderRadius: sizes.buttonHeight / 2,
    elevation: 0,
    height: sizes.buttonHeight,
  },
  text: {
    color: colors.white,
  },
  opacity: {
    opacity: 0.2,
  },
});
