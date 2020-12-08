import { Text } from 'native-base';
import React from 'react';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors, fontStyles } from '@theme';

import { FieldWrapper } from './Screen';

export type IButtonPress = ((event: GestureResponderEvent) => void) | undefined;

interface SelectorButtonProps {
  onPress?: IButtonPress;
  text: string;
}

export const NewButton: React.FC<SelectorButtonProps> = (props) => (
  <FieldWrapper style={styles.fieldWrapper}>
    <TouchableOpacity onPress={props.onPress} testID="buttonTestID">
      <View style={styles.bigButton}>
        <Text style={[fontStyles.bodyReg, styles.buttonText]}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  </FieldWrapper>
);

const styles = StyleSheet.create({
  fieldWrapper: {
    marginVertical: 16,
  },

  buttonText: {
    color: colors.brand,
    textAlign: 'center',
  },

  bigButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.brand,
    backgroundColor: colors.white,
    padding: 16,
  },
});
