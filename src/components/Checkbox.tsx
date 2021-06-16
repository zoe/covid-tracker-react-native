import Check from '@assets/icons/Check';
import { colors } from '@theme/colors';
import { Item } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { RegularText } from './Text';
import { ITest } from './types';

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

interface ICheckboxProps extends ITest {
  value: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
  dark?: boolean;
}

interface ICheckboxListProps {
  children: React.ReactNode;
}

export function CheckboxItem(props: ICheckboxProps) {
  return (
    <Item style={styles.checkboxRow}>
      <TouchableOpacity
        accessible
        accessibilityRole="checkbox"
        onPress={() => props.onChange(!props.value)}
        style={props.dark ? styles.checkBoxDark : styles.checkBox}
      >
        {props.value ? <Check /> : null}
      </TouchableOpacity>
      <Item onPress={() => props.onChange(!props.value)} style={styles.checkBoxText}>
        <RegularText style={{ ...styles.checkboxLabel }}>{props.children}</RegularText>
      </Item>
    </Item>
  );
}

export function CheckboxList({ children }: ICheckboxListProps) {
  return <View style={styles.checkboxList}>{children}</View>;
}
