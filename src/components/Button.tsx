import React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors } from '@theme';

export type IButtonPress = ((event: GestureResponderEvent) => void) | undefined;

type ButtonProps = {
  onPress: IButtonPress;
  children: React.ReactNode;
};

const buttonStyles = StyleSheet.create({
  bigButton: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: colors.white,
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  buttonText: {
    color: colors.secondary,
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
