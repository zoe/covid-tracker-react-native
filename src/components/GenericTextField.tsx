import { FormikProps } from 'formik';
import React from 'react';
import { KeyboardTypeOptions, StyleSheet } from 'react-native';

import { FieldWrapper } from './Screen';
import { ValidatedTextInput } from './ValidatedTextInput';
import { ValidationError } from './ValidationError';
import { RegularText } from './Text';

interface GenericTextFieldProps {
  formikProps: FormikProps<any>;
  name: string;
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  showError?: boolean;
  inputProps?: any;
}

export const GenericTextField = (props: GenericTextFieldProps) => {
  const { formikProps, name, label, placeholder, keyboardType, showError, ...inputProps } = props;
  return (
    <FieldWrapper style={styles.fieldWrapper}>
      {!!label && <RegularText>{label}</RegularText>}
      <ValidatedTextInput
        placeholder={placeholder ?? ''}
        value={formikProps.values[name]}
        onChangeText={formikProps.handleChange(name)}
        onBlur={formikProps.handleBlur(name)}
        error={formikProps.touched[name] && formikProps.errors[name]}
        returnKeyType="next"
        onSubmitEditing={() => {}}
        keyboardType={keyboardType}
        {...inputProps}
      />

      {showError && !!formikProps.touched[name] && !!formikProps.errors[name] && (
        <ValidationError
          // @ts-ignore - need to solve type for ValidationError error prop
          error={formikProps.errors[name]}
        />
      )}
    </FieldWrapper>
  );
};

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
    marginHorizontal: 16,
  },
});
