import { colors, fontStyles } from '@theme';
import { Text } from 'native-base';
import React from 'react';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      <TouchableOpacity disabled={props.disable} onPress={props.onPress} testID={props.testID ?? 'button-test-ID'}>
        <View style={styles.bigButton}>
          <Text style={[fontStyles.bodyReg, styles.buttonText]}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </FieldWrapper>
  );
}

const styles = StyleSheet.create({
  bigButton: {
    backgroundColor: colors.white,
    borderColor: colors.brand,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },

  buttonText: {
    color: colors.brand,
    textAlign: 'center',
  },

  fieldWrapper: {
    marginVertical: 16,
  },
});
