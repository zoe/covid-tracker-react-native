import { Label, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, PickerProps } from 'react-native';

import { colors } from '@theme';
import { SelectableButton } from '@covid/components/SelectableButton';

import { FieldWrapper } from '../Screen';
import { ValidationError } from '../ValidationError';

export interface ISingleButton {
  label?: string;
  value: string;
}

interface IProps {
  label?: string;
  selectedValue: string;
  items: ISingleButton[];
  onValueChange: any;
  onlyPicker?: boolean;
  pickerProps?: PickerProps;
  error?: any;
}

export function ButtonsGroup({ label, selectedValue, items, error, onValueChange, onlyPicker }: IProps) {
  const [selected, setSelected] = useState<string>(selectedValue);

  const onSelect = (value: string) => {
    setSelected(value);
    onValueChange(value);
  };

  return (
    <FieldWrapper style={styles.fieldWrapper}>
      {onlyPicker ? null : <Label style={styles.labelStyle}>{label}</Label>}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 8,
        }}
      >
        {items.map((item) => (
          <SelectableButton
            key={item.value}
            style={{ flex: 1, marginEnd: 8 }}
            selected={selected === item.value}
            onPress={() => onSelect(item.value)}
          >
            {item.label}
          </SelectableButton>
        ))}
      </View>

      {!!error && (
        <View style={{ marginTop: 4, marginHorizontal: 4 }}>
          <ValidationError error={error} />
        </View>
      )}
    </FieldWrapper>
  );
}

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
  },
  labelStyle: {
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    color: colors.primary,
  },
});

export default ButtonsGroup;
