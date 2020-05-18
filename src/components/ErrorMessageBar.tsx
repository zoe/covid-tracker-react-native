import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RegularBoldText } from './Text';
import { colors } from '../../theme';

type ErrorMessageBarProps = {
  children: React.ReactNode;
};

export const ErrorMessageBar = ({ children }: ErrorMessageBarProps) => {
  return (
    <View style={styles.errorBar}>
      <RegularBoldText style={styles.errorText}>{children}</RegularBoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  errorBar: {
    backgroundColor: colors.coral,
    color: colors.white,
    padding: 10,
  },
  errorText: {
    backgroundColor: colors.coral,
    color: colors.white,
    textAlign: 'center',
  },
});
