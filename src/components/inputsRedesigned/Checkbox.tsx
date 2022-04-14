import Check from '@assets/icons/Check';
import { Text } from '@covid/components';
import { requiredFormMarker } from '@covid/components/Form';
import { FieldLabelRedesigned } from '@covid/components/Text';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface ICheckboxProps {
  value: boolean;
  onChange: (value: any) => void;
  children: React.ReactNode;
  dark?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

interface ICheckboxListProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  testID?: string;
}

export function CheckboxItem(props: ICheckboxProps) {
  return (
    <View style={[styles.checkboxRow, props.style]}>
      <TouchableOpacity
        accessible
        accessibilityRole="checkbox"
        onPress={() => props.onChange(!props.value)}
        style={props.dark ? styles.checkBoxDark : styles.checkBox}
        testID={props.testID}
      >
        {props.value ? <Check color={colors.purple} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onChange(!props.value)} style={styles.checkBoxText}>
        <Text inverted colorPalette="uiDark" colorShade="darker" style={{ ...styles.checkboxLabel }} textClass="pLight">
          {props.children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function CheckboxList(props: ICheckboxListProps) {
  return (
    <View style={styles.checkboxList} testID={props.testID}>
      <>
        <FieldLabelRedesigned>
          {props.label}
          {props.required ? `${requiredFormMarker}` : null}
        </FieldLabelRedesigned>
        {props.children}
      </>
    </View>
  );
}

const checkBoxStyle: ViewStyle = {
  alignItems: 'center',
  backgroundColor: colors.backgroundTertiary,
  borderColor: 'transparent',
  borderRadius: sizes.xs,
  borderWidth: 1,
  display: 'flex',
  height: 32,
  justifyContent: 'space-evenly',
  width: 32,
};

const styles = StyleSheet.create({
  checkBox: checkBoxStyle,
  checkBoxDark: {
    ...checkBoxStyle,
    borderColor: colors.backgroundFive,
  },
  checkBoxText: {
    borderColor: 'transparent',
  },
  checkboxLabel: {
    marginLeft: sizes.m,
    marginRight: sizes.xl,
    paddingTop: sizes.xxs,
  },
  checkboxList: {
    width: '100%',
  },
  checkboxRow: {
    alignItems: 'flex-start',
    borderColor: 'transparent',
    flexDirection: 'row',
    paddingVertical: sizes.xs,
  },
});
