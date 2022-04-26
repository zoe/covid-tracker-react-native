import React from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

interface Props {
  children: any;
}

export const CenterView = ({ children }: Props) => {
  SplashScreen.hide();
  return <View style={styles.main}>{children}</View>;
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
});
