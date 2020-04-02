import React from "react";
import {StyleSheet, View} from "react-native";
import {ErrorText} from "./Text";

type ErrorProps = {
    error: string,
}

export const ValidationError = (props: ErrorProps) => {
    return (
      <View style={styles.validationError}>
          <ErrorText>{props.error}</ErrorText>
      </View>
    );
}

type ErrorsProps = {
    errors: object,
}

export const ValidationErrors = (props: ErrorsProps) => {
    return (
      <View style={styles.validationErrors}>
          <ErrorText>
              Please fill in or correct the above information:{" "}
              {Object.keys(props.errors).join(", ")}
          </ErrorText>
      </View>
    );
}


const styles = StyleSheet.create({
    validationError: {
        marginHorizontal: 16,
        marginVertical: 0,
    },

    validationErrors: {
        marginVertical: 8,
        marginHorizontal: 8
    }
})