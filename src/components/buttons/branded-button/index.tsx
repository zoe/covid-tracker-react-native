import { ITest } from '@covid/components/types';
import { colors, fontStyles } from '@theme';
import * as React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

// @todo: replace the 'enabled' prop with the 'disabled' prop. Reason is because then it matches
// with the property from the TouchableOpacity.

export interface IBrandedButtonProps extends ITest {
  children: React.ReactNode;
  disabled?: boolean;
  enabled?: boolean;
  indicatorColor?: string;
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

export default function BrandedButton({ indicatorColor = colors.white, ...props }: IBrandedButtonProps) {
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      activeOpacity={0.6}
      disabled={props.enabled === false}
      onPress={props.enabled === false ? undefined : props.onPress}
      style={[props.enabled === false ? styles.buttonDisabled : styles.button, props.style]}
      testID={props.testID ?? 'button-test-ID'}
    >
      {props.loading ? <ActivityIndicator color={indicatorColor} style={styles.activityIndicator} /> : null}
      <Text style={[fontStyles.bodyLight, styles.text, props.textStyle]}>{props.children}</Text>
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
