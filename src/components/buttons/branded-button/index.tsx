import { ITest } from '@covid/components/types';
import { colors, fontStyles } from '@theme';
import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface IProps extends ITest {
  children: React.ReactNode;
  enable?: boolean;
  loading?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function BrandedButton(props: IProps) {
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      activeOpacity={0.6}
      disabled={props.enable === false}
      onPress={props.enable === false ? undefined : props.onPress}
      style={[props.enable === false ? styles.buttonDisabled : styles.button, props.style]}
      testID="buttonTestID"
    >
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
