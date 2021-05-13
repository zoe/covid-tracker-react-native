import Check from '@assets/icons/Check';
import { colors } from '@theme/colors';
import { Item, View } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { RegularText } from './Text';
import { ITest } from './types';

const checkboxStyles = StyleSheet.create({
  checkBox: {
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderColor: 'transparent',
    borderRadius: 8,
    display: 'flex',
    height: 32,
    justifyContent: 'space-evenly',
    width: 32,
  },

  checkBoxText: {
    borderColor: 'transparent',
  },

  checkboxLabel: {
    marginLeft: 16,
    marginRight: 32,
  },

  checkboxList: {
    width: '100%',
  },

  checkboxRow: {
    borderColor: 'transparent',
    paddingVertical: 6,
  },
});

interface ICheckboxProps extends ITest {
  value: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
}

interface ICheckboxListProps {
  children: React.ReactNode;
}

export function CheckboxItem(props: ICheckboxProps) {
  return (
    <Item style={checkboxStyles.checkboxRow}>
      <TouchableOpacity
        accessible
        accessibilityRole="checkbox"
        onPress={() => props.onChange(!props.value)}
        style={checkboxStyles.checkBox}
      >
        {props.value ? <Check /> : null}
      </TouchableOpacity>
      <Item onPress={() => props.onChange(!props.value)} style={checkboxStyles.checkBoxText}>
        <RegularText style={{ ...checkboxStyles.checkboxLabel }}>{props.children}</RegularText>
      </Item>
    </Item>
  );
}

export function CheckboxList({ children }: ICheckboxListProps) {
  return <View style={checkboxStyles.checkboxList}>{children}</View>;
}
