import Check from '@assets/icons/Check';
import { requiredFormMarker } from '@covid/components/Forms';
import { colors } from '@theme/colors';
import { Item } from 'native-base';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { RegularText } from './Text';
import { ITest } from './types';

interface ICheckboxProps extends ITest {
  value: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
  dark?: boolean;
  testID?: string;
}

interface ICheckboxListProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
}

export function CheckboxItem(props: ICheckboxProps) {
  return (
    <Item style={styles.checkboxRow}>
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
  borderRadius: 8,
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
    marginLeft: 16,
    marginRight: 32,
    paddingTop: 4,
  },
  checkboxList: {
    width: '100%',
  },
  checkboxRow: {
    alignItems: 'flex-start',
    borderColor: 'transparent',
    flexDirection: 'row',
    paddingVertical: 6,
  },
});
