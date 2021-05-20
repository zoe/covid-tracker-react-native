import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, Text, ViewStyle } from 'react-native';

import { colors, fontStyles } from '@theme';
import { IClickableProps } from '@covid/components/Text';
import { ITest } from '@covid/components/types';

interface IProps extends IClickableProps, ITest {
  loading?: boolean;
}

export default function BrandedButton(props: IProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      accessible
      accessibilityRole="button"
      disabled={props.enable === false}
      testID="buttonTestID"
      style={[props.enable === false ? styles.buttonDisabled : styles.button, props.style]}
      onPress={props.enable === false ? undefined : props.onPress}>
      {props.loading ? <ActivityIndicator color={colors.white} style={styles.activityIndicator} /> : null}
      <Text style={[fontStyles.bodyLight, styles.text]}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const buttonStyle: ViewStyle = {
  alignItems: 'center',
  borderRadius: 56 / 2,
  elevation: 0,
  height: 56,
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  activityIndicator: {
    left: 56 / 2,
    position: 'absolute',
  },
  button: {
    ...buttonStyle,
    backgroundColor: colors.brand,
  },
  buttonDisabled: {
    ...buttonStyle,
    backgroundColor: colors.transparentBrand,
  },
  text: {
    color: colors.white,
  },
});
