import { FormikProps } from 'formik';
import { Item, Label, View } from 'native-base';
import React from 'react';
import { KeyboardTypeOptions, StyleSheet } from 'react-native';

import Info from '../../assets/icons/Info';
import { FieldWrapper } from './Screen';
import { LabelText } from './Text';
import { ValidatedTextInput } from './ValidatedTextInput';

interface GenericTextFieldProps {
  formikProps: FormikProps<any>;
  name: string;
  label?: string;
  placeholder?: string;
  info?: string;
  keyboardType?: KeyboardTypeOptions;
  inputProps?: any;
}

export const GenericTextField = (props: GenericTextFieldProps) => {
  const { formikProps, name, label, placeholder, info, keyboardType, ...inputProps } = props;
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
