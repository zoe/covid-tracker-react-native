import { colors } from '@tracer/branding/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

interface Props {
  children: any;
}

export const CenterView = (props: Props) => {
  SplashScreen.hide();
  return <View style={styles.main}>{props.children}</View>;
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: colors.surface.subdued,
    flex: 1,
    justifyContent: 'center',
  },
});
