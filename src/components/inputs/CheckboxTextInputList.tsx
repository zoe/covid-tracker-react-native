import Check from '@assets/icons/Check';
import { Text } from '@covid/components';
import { requiredFormMarker } from '@covid/components/Forms';
import { styling } from '@covid/themes';
import { colors } from '@theme/colors';
import { Textarea } from 'native-base';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface IOption {
  label: string;
  value?: string;
}

interface IProps {
  dark?: boolean;
  options: IOption[];
  label?: string;
  onChange: (value: string | undefined, index: number) => void;
  required?: boolean;
  testID?: string;
}

export function CheckboxTextInputList(props: IProps) {
  return (
    <View>
      {props.required || props.label ? (
        <Text inverted colorPalette="uiDark" colorShade="darker" rhythm={16} textClass="p">
          {props.label}
          {props.required ? `${requiredFormMarker}` : null}
        </Text>
      ) : null}
      {(props.options || []).map((option, index) => (
        <>
          <TouchableOpacity
            accessible
            accessibilityRole="checkbox"
            onPress={() => props.onChange(option.value === undefined ? '' : undefined, index)}
            style={styles.touchable}
            testID={`${props.testID}-${option.value}`}
          >
            <View style={props.dark ? styles.checkBoxDark : styles.checkBox}>
              {option.value !== undefined ? <Check color={colors.purple} /> : null}
            </View>
            <Text rhythm={16} style={styles.text} textClass="pLight">
              {option.label}
            </Text>
          </TouchableOpacity>
          {option.value !== undefined ? (
            <Textarea
              bordered={false}
              onChangeText={(text) => props.onChange(text, index)}
              placeholder="Please add any comments"
              placeholderTextColor={colors.tertiary}
              rowSpan={5}
              style={[styling.textarea, styles.textarea]}
              underline={false}
              value={option.value}
            />
          ) : null}
        </>
      ))}
    </View>
  );
}

const checkBoxStyle: ViewStyle = {
  alignItems: 'center',
  backgroundColor: colors.backgroundTertiary,
  borderRadius: 8,
  height: 32,
  justifyContent: 'center',
  marginRight: 16,
  width: 32,
};

const styles = StyleSheet.create({
  checkBox: checkBoxStyle,
  checkBoxDark: {
    ...checkBoxStyle,
    borderColor: '#C4C4C4',
  },
  text: {
    flex: 1,
    marginBottom: 0,
  },
  textarea: {
    marginBottom: 24,
  },
  touchable: {
    flexDirection: 'row',
    marginBottom: 16,
  },
});
