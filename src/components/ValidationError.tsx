import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ErrorText } from './Text';

type ErrorProps = {
  error: string;
};

export const ValidationError: React.FC<ErrorProps> = ({ error }) => {
  return (
    <View style={styles.validationError}>
      <ErrorText>{error}</ErrorText>
    </View>
  );
};

const styles = StyleSheet.create({
  validationError: {
    marginBottom: 0,
    marginTop: 4,
    marginHorizontal: 6,
  },
});
