import i18n from '@covid/locale/i18n';
import { Form } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ErrorText, RegularText } from './Text';

type FieldProps = {
  children: React.ReactNode;
};

export const Field: React.FC<FieldProps> = (props) => <View style={styles.field}>{props.children}</View>;

export const FieldError = (props: FieldProps) => (
  <View style={styles.fieldError}>
    <ErrorText>{props.children}</ErrorText>
  </View>
);

export const requiredFormMarker = `*`;

type FormWrapperProps = {
  children: React.ReactNode;
  hasRequiredFields?: boolean;
};

export const FormWrapper = (props: FormWrapperProps) => (
  <Form>
      { props.hasRequiredFields ? (
        <RegularText style={styles.requiredFieldHeader}>
          {requiredFormMarker} {i18n.t('required-field')}
        </RegularText>) : null 
      }
    {props.children}
  </Form>
);

const styles = StyleSheet.create({
  field: {
    marginHorizontal: 16,
  },
  fieldError: {},
  requiredFieldHeader: {
    margin: 16,
    marginBottom: 0,
  }
});