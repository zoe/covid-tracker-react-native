import NavigatorService from '@covid/NavigatorService';
import { colors } from '@theme';
import { Icon } from 'native-base';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

type TProps = {
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
};

const HIT_SLOP = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

export function BackButton(props: TProps) {
  return (
    <TouchableOpacity
      hitSlop={HIT_SLOP}
      onPress={NavigatorService.goBack}
      style={props.style}
      testID="button-back-navigation"
    >
      <Icon
        name="chevron-thin-left"
        style={[styles.icon, props.iconColor && { color: props.iconColor }]}
        type="Entypo"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: colors.secondary,
    fontSize: 16,
  },
});
