import { Text } from 'native-base';
import React from 'react';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors, fontStyles } from '@theme';

import { FieldWrapper } from './Screen';

type IButtonPress = ((event: GestureResponderEvent) => void) | undefined;

interface IProps {
  onPress?: IButtonPress;
  text: string;
  testID?: string;
  disable?: boolean;
}

export function SelectorButton(props: IProps) {
  return (
    <FieldWrapper style={styles.fieldWrapper}>
      <TouchableOpacity onPress={props.onPress} testID={props.testID ?? 'buttonTestID'} disabled={props.disable}>
        <View style={styles.bigButton}>
          <Text style={[fontStyles.bodyReg, styles.buttonText]}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </FieldWrapper>
  );
}

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
