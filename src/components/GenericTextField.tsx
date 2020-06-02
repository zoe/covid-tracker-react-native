import { FormikProps } from 'formik';
import { Item, Label, View } from 'native-base';
import React from 'react';
import { KeyboardTypeOptions, StyleSheet } from 'react-native';

import Info from '../../assets/icons/Info';
import { FieldWrapper } from './Screen';
import { LabelText } from './Text';
import { ValidatedTextInput } from './ValidatedTextInput';
import { ValidationError } from './ValidationError';

interface GenericTextFieldProps {
  formikProps: FormikProps<any>;
  name: string;
  label?: string;
  placeholder?: string;
  info?: string;
  keyboardType?: KeyboardTypeOptions;
  showError?: boolean;
  inputProps?: any;
}

export const GenericTextField = (props: GenericTextFieldProps) => {
  const { formikProps, name, label, placeholder, info, keyboardType, showError, ...inputProps } = props;
  return (
    <FieldWrapper>
      {!!label && <LabelText>{label}</LabelText>}
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
      {!!info && (
        <View style={styles.infoContainer}>
          <Info style={styles.infoIcon} />
          <LabelText>{info}</LabelText>
        </View>
      )}
      {showError && !!formikProps.errors[name] && (
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

  infoContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
    paddingHorizontal: 5,
  },
});
