import React from "react";
import {StyleSheet} from "react-native";
import {Item, CheckBox, View} from "native-base";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {RegularText} from "./Text";

type CheckboxProps = {
    value: any;
    onChange: any;
    children: any;
}

export const CheckboxItem = (props: CheckboxProps) => {
    return (
      <Item style={cbStyles.checkboxRow}>
          <CheckBox
            checked={props.value}
            onPress={() => props.onChange(!props.value)}
          />
          <TouchableWithoutFeedback onPress={() => props.onChange(!props.value)}>
              <RegularText style={cbStyles.checkboxLabel}>{props.children}</RegularText>
          </TouchableWithoutFeedback>
      </Item>
    );
};

type CheckboxListProps = {
    children: any;
}

export const CheckboxList = (props: CheckboxListProps) => {
    return (
      <View style={cbStyles.checkboxList}>
          {props.children}
      </View>
    )
};

const cbStyles = StyleSheet.create({
    checkboxList: {
        marginVertical: 16,
        width: '100%'
    },

    checkboxRow: {
        paddingVertical: 6,
        borderColor: "transparent",
    },

    checkboxLabel: {
        marginLeft: 16
    }
});
