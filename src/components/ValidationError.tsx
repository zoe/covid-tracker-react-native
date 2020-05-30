import i18n from '@covid/locale/i18n';
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

type ErrorsProps = {
  errors: object;
};

export const ValidationErrors: React.FC<ErrorsProps> = ({ errors }) => (
  <View style={styles.validationErrors}>
    <ErrorText>
      {i18n.t('validation-error-text', {
        info: Object.keys(errors).join(', '),
      })}
    </ErrorText>
  </View>
);

const styles = StyleSheet.create({
  validationError: {
    marginHorizontal: 16,
    marginVertical: 0,
  },

  validationErrors: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
});
