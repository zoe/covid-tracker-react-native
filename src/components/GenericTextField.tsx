import { FormikProps } from 'formik';
import React from 'react';
import { KeyboardTypeOptions, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { text } from 'body-parser';

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
  wrapperStyle?: StyleProp<ViewStyle>;
}

export const GenericTextField = (props: GenericTextFieldProps) => {
  const { formikProps, name, label, placeholder, keyboardType, showError, inputProps, ...otherProps } = props;
  return (
    <FieldWrapper style={[styles.fieldWrapper, props.wrapperStyle]}>
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
        {...otherProps}
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
