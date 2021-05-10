import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { ErrorText } from './Text';

type ErrorProps = {
  error: string | false | undefined;
  style?: StyleProp<ViewStyle>;
};

export const ValidationError: React.FC<ErrorProps> = ({ error, style }) => {
  return (
    <View style={[styles.validationError, style]}>
      <ErrorText>{error}</ErrorText>
    </View>
  );
};

const styles = StyleSheet.create({
  validationError: {
    marginBottom: 0,
    marginHorizontal: 6,
    marginTop: 4,
  },
});
