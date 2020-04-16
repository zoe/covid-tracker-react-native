import React from "react";
import {StyleSheet, View} from "react-native";
import {ErrorText} from "./Text";
import i18n from "../locale/i18n";

type ErrorProps = {
    error: string,
}

export const ValidationError = (props: ErrorProps) => {
    return (
      <View style={styles.validationError}>
          <ErrorText>{props.error}</ErrorText>
      </View>
    );
};

type ErrorsProps = {
    errors: object,
}

export const ValidationErrors = (props: ErrorsProps) => {
    const info = Object.keys(props.errors).join(", ");
    return (
      <View style={styles.validationErrors}>
          <ErrorText>
              {i18n.t('validation-error-text', {'info': info})}
          </ErrorText>
      </View>
    );
};


const styles = StyleSheet.create({
    validationError: {
        marginHorizontal: 16,
        marginVertical: 0,
    },

    validationErrors: {
        marginVertical: 8,
        marginHorizontal: 8
    }
});