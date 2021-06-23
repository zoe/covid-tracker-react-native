import { requiredFormMarker } from '@covid/components/Forms';
import { FieldWrapper } from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { FormikProps } from 'formik';
import * as React from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

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
      {label ? (
        <RegularText>
          {label} {props.required ? requiredFormMarker : null}
        </RegularText>
      ) : null}
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
