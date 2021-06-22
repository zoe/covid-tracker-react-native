import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import React from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

import { FieldWrapper } from './Screen';
import { RegularText } from './Text';
import { ValidatedTextInput } from './ValidatedTextInput';
import { ValidationError } from './ValidationError';

interface IProps extends TextInputProps {
  formikProps: FormikProps<any>;
  name: string;
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  showError?: boolean;
  inputProps?: TextInputProps;
  wrapperStyle?: StyleProp<ViewStyle>;
  required?: boolean;
}

export function GenericTextField(props: IProps) {
  const { formikProps, name, label, placeholder, keyboardType, showError, inputProps, ...otherProps } = props;

  return (
    <FieldWrapper style={[styles.fieldWrapper, props.wrapperStyle]}>
      {label ? <RegularText>{label}</RegularText> : null}
      <ValidatedTextInput
        error={formikProps.touched[name] && formikProps.errors[name]}
        keyboardType={keyboardType}
        onBlur={formikProps.handleBlur(name)}
        onChangeText={formikProps.handleChange(name)}
        onSubmitEditing={() => {}}
        placeholder={props.placeholder}
        required={props.required}
        returnKeyType="next"
        value={formikProps.values[name]}
        {...inputProps}
        {...otherProps}
      />

      {showError && !!formikProps.touched[name] && !!formikProps.errors[name] ? (
        <ValidationError
          // @ts-ignore - need to solve type for ValidationError error prop
          error={formikProps.errors[name]}
        />
      ) : null}
    </FieldWrapper>
  );
}

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
  },
});
