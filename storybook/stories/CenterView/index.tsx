import { colors } from '@tracer/branding/colors';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

interface Props {
  children: any;
  style?: StyleProp<ViewStyle>;
}

export const CenterView = (props: Props) => {
  SplashScreen.hide();
  return <View style={[styles.main, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: colors.surface.subdued,
    flex: 1,
    justifyContent: 'center',
  },
});
