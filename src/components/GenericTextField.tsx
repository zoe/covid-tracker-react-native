import { FormikProps } from "formik";
import { Item, Label } from "native-base";
import React from "react";
import { KeyboardTypeOptions, StyleSheet } from "react-native";

import { FieldWrapper } from "./Screen";
import { ValidatedTextInput } from "./ValidatedTextInput";

interface GenericTextFieldProps {
    formikProps: FormikProps<any>;
    name: string;
    label?: string;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    inputProps?: any;
}

export const GenericTextField = (props: GenericTextFieldProps) => {
    const {
        formikProps,
        name,
        label,
        placeholder,
        keyboardType,
        ...inputProps
    } = props;
    return (
        <FieldWrapper>
            <Item stackedLabel style={styles.textItemStyle}>
                {!!label && <Label>{label}</Label>}
                <ValidatedTextInput
                    placeholder={placeholder ?? ""}
                    value={formikProps.values[name]}
                    onChangeText={formikProps.handleChange(name)}
                    onBlur={formikProps.handleBlur(name)}
                    error={
                        formikProps.touched[name] && formikProps.errors[name]
                    }
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                    keyboardType={keyboardType}
                    {...inputProps}
                />
            </Item>
        </FieldWrapper>
    );
};

const styles = StyleSheet.create({
    textItemStyle: {
        borderColor: "transparent",
    },
});
