import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type FlexViewProps = {
  children?: React.ReactNode;
};

export const FlexView = ({ children }: FlexViewProps) => {
  return <View style={styles.flexView}>{children}</View>;
};

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
  },
});
