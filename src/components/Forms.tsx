import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ErrorText } from './Text';

type FieldProps = {
  children: React.ReactNode;
};

export const Field: React.FC<FieldProps> = (props) => <View style={styles.field}>{props.children}</View>;

export const FieldError = (props: FieldProps) => (
  <View style={styles.fieldError}>
    <ErrorText>{props.children}</ErrorText>
  </View>
);

const styles = StyleSheet.create({
  field: {
    marginHorizontal: 16,
  },
  fieldError: {},
});
