import { FormikProps } from 'formik';
import { Item, Label } from 'native-base';
import React from 'react';
import { KeyboardTypeOptions, StyleSheet } from 'react-native';

import { FieldWrapper } from './Screen';
import { ValidatedTextInput } from './ValidatedTextInput';
import { ValidationError } from './ValidationError';

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
    <FieldWrapper>
      <Item stackedLabel style={styles.textItemStyle}>
        {!!label && <Label>{label}</Label>}
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
      </Item>

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
  textItemStyle: {
    borderColor: 'transparent',
  },
});
