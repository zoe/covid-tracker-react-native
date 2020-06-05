import { colors } from '@theme';
import React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type IButtonPress = ((event: GestureResponderEvent) => void) | undefined;

type ButtonProps = {
  onPress: IButtonPress;
  children: React.ReactNode;
};

const buttonStyles = StyleSheet.create({
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
    textAlign: 'center',
  },
});

export const BigButton: React.FC<ButtonProps> = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={buttonStyles.bigButton}>
      <Text style={buttonStyles.buttonText}>{props.children}</Text>
    </View>
  </TouchableOpacity>
);
