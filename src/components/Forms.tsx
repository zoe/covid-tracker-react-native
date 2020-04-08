import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ErrorText } from './Text';

type FieldProps = {
    children: any
}

export const Field = (props: FieldProps) => {
    return (
        <View style={styles.field}>
            {props.children}
        </View>
    )
}

export const FieldError = (props: FieldProps) => {
    return (
        <View style={styles.fieldError}>
            <ErrorText>{props.children}</ErrorText>
        </View>
    )
}

const styles = StyleSheet.create({
    field: {
        marginHorizontal: 16,
    },

    fieldError: {
    }
})