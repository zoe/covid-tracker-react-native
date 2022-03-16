import Check from '@assets/icons/Check';
import { requiredFormMarker } from '@covid/components/Form';
import { RegularText } from '@covid/components/Text';
import { ITest } from '@covid/components/types';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import { Item } from 'native-base';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface ICheckboxProps extends ITest {
  value: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
  dark?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

interface ICheckboxListProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
}

export function CheckboxItem(props: ICheckboxProps) {
  return (
    <Item style={[styles.checkboxRow, props.style]}>
      <TouchableOpacity
        accessible
        accessibilityRole="checkbox"
        onPress={() => props.onChange(!props.value)}
        style={props.dark ? styles.checkBoxDark : styles.checkBox}
        testID={props.testID}
      >
        {props.value ? <Check /> : null}
      </TouchableOpacity>
      <Item onPress={() => props.onChange(!props.value)} style={styles.checkBoxText}>
        <RegularText style={{ ...styles.checkboxLabel }}>{props.children}</RegularText>
      </Item>
    </Item>
  );
}

export function CheckboxList({ children, label, required }: ICheckboxListProps) {
  const renderLabel = () =>
    required ? (
      <RegularText>
        {label}
        {required ? `${requiredFormMarker}` : null}
      </RegularText>
    ) : null;

  return (
    <View style={styles.checkboxList}>
      {renderLabel()}
      {children}
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
    borderColor: '#C4C4C4',
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
