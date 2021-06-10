import { FormikProps } from 'formik';
import React from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

import { FieldWrapper } from './Screen';
import { RegularText } from './Text';
import { ValidatedTextInput } from './ValidatedTextInput';
import { ValidationError } from './ValidationError';

interface IProps extends TextInputProps {
  formikProps: FormikProps<any>;
  textInputProps?: TextInputProps;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  name: string;
  placeholder?: string;
  showError?: boolean;
  testID?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export function GenericTextField(props: IProps) {
  return (
    <FieldWrapper style={[styles.fieldWrapper, props.wrapperStyle]}>
      {props.label ? <RegularText>{props.label}</RegularText> : null}
      <ValidatedTextInput
        error={!!(props.formikProps.touched[props.name] && props.formikProps.errors[props.name])}
        keyboardType={props.keyboardType}
        onBlur={props.formikProps.handleBlur(props.name)}
        onChangeText={props.formikProps.handleChange(props.name)}
        onSubmitEditing={() => {}}
        placeholder={props.placeholder ?? ''}
        returnKeyType="next"
        testID={props.testID}
        value={props.formikProps.values[props.name]}
        {...props.textInputProps}
      />

      {props.showError && !!props.formikProps.touched[props.name] && !!props.formikProps.errors[props.name] ? (
        <ValidationError error={props.formikProps.errors[props.name]} />
      ) : null}
    </FieldWrapper>
  );
}

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
  },
});
