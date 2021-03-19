import React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors } from '@theme';

export type IButtonPress = ((event: GestureResponderEvent) => void) | undefined;

type IProps = {
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

function BigButton(props: IProps) {
  return (
    <TouchableOpacity onPress={props.onPress} testID="buttonTestID">
      <View style={buttonStyles.bigButton}>
        <Text style={buttonStyles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default BigButton;
