import i18n from '@covid/locale/i18n';
import { Form } from 'native-base';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

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

// The space character is added in this way to prevent the asterisk from being word-wrapped at the end of the line.
export const requiredFormMarker = '\u00a0*';

type TFormWrapperProps = {
  children: React.ReactNode;
  hasRequiredFields?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const FormWrapper = (props: TFormWrapperProps) => (
  <Form style={props.style}>
    {props.hasRequiredFields ? (
      <RegularText style={styles.requiredFieldHeader}>
        {requiredFormMarker} {i18n.t('required-field')}
      </RegularText>
    ) : null}
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
  },
});
