import {FieldWrapper} from "./Screen";
import {Item, Label} from "native-base";
import {ValidatedTextInput} from "./ValidatedTextInput";
import React from "react";
import {KeyboardTypeOptions, StyleSheet} from "react-native";

interface GenericTextFieldProps {
    formikProps: any,
    name: string,
    label?: string,
    placeholder?: string | undefined,
    keyboardType?: KeyboardTypeOptions
    inputProps?: any,
}

export const GenericTextField = (props: GenericTextFieldProps) => {
    const {formikProps, name, label, placeholder, keyboardType, ...inputProps} = props;
    return (
      <FieldWrapper>
          <Item stackedLabel style={styles.textItemStyle}>
              {!!label && (<Label>{label}</Label>)}
              <ValidatedTextInput
                placeholder={placeholder || ''}
                value={formikProps.values[name]}
                onChangeText={formikProps.handleChange(name)}
                onBlur={formikProps.handleBlur(name)}
                error={formikProps.touched[name] && formikProps.errors[name]}
                returnKeyType="next"
                onSubmitEditing={() => {
                }}
                keyboardType={keyboardType}
                {...inputProps}
              />
          </Item>
      </FieldWrapper>
    )
};

const styles = StyleSheet.create({
    textItemStyle: {
        borderColor: 'transparent'
    },
})