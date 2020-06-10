import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export const CenteredView: React.FC<Props> = (props) => {
  return <View style={styles.flexView}>{props.children}</View>;
};

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    justifyContent: 'center',
  },
});
