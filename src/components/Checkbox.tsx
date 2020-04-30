import { Item, CheckBox, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { RegularText } from './Text';

const checkboxStyles = StyleSheet.create({
  checkboxList: {
    marginVertical: 16,
    width: '100%',
  },

  checkboxRow: {
    paddingVertical: 6,
    borderColor: 'transparent',
  },

  checkboxLabel: {
    marginLeft: 16,
  },
});

type CheckboxProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
};

type CheckboxListProps = {
  children: React.ReactNode;
};

export const CheckboxItem: React.FC<CheckboxProps> = (props) => {
  return (
    <Item style={checkboxStyles.checkboxRow}>
      <CheckBox checked={props.value} onPress={() => props.onChange(!props.value)} />
      <TouchableWithoutFeedback onPress={() => props.onChange(!props.value)}>
        <RegularText style={checkboxStyles.checkboxLabel}>{props.children}</RegularText>
      </TouchableWithoutFeedback>
    </Item>
  );
};

export const CheckboxList: React.FC<CheckboxListProps> = ({ children }) => (
  <View style={checkboxStyles.checkboxList}>{children}</View>
);
