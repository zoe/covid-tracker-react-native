import {GestureResponderEvent, StyleSheet} from "react-native";
import {FieldWrapper} from "./Screen";
import {BigButton} from "./Button";
import {Text} from "native-base";
import {colors, fontStyles} from "../../theme";
import React from "react";

interface SelectorButtonProps {
    onPress?: (event: GestureResponderEvent) => void;
    text: string;
}

export const SelectorButton = (props: SelectorButtonProps) => (
  <FieldWrapper style={styles.fieldWrapper}>
      <BigButton onPress={props.onPress}>
          <Text style={[fontStyles.bodyLight, styles.buttonText]}>{props.text}</Text>
      </BigButton>
  </FieldWrapper>
);

const styles = StyleSheet.create({
    fieldWrapper: {
        // marginVertical: 32,
    },

    buttonText: {
        color: colors.primary,
    },
});