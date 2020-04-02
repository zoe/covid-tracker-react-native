import React from "react";
import {TouchableOpacity} from "react-native-gesture-handler";
import {View, Text, StyleSheet} from "react-native";
import {colors} from "../../theme";


type ButtonProps = {
    onPress: any;
    children: any;
}

export const BigButton = (props: ButtonProps) => {
    return (
      <TouchableOpacity onPress={props.onPress}>
          <View style={butStyles.bigButton}>
              <Text style={butStyles.buttonText}>{props.children}</Text>
          </View>
      </TouchableOpacity>
    )
}
const butStyles = StyleSheet.create({
    bigButton: {
        borderRadius: 28,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: colors.white,
        fontSize: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
    },

    buttonText: {
        color: colors.primary,
        textAlign: "center",
    }
})
