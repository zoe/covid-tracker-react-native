import { FieldWrapper } from '@covid/components/Screen';
import { SelectableButton } from '@covid/components/SelectableButton';
import { ValidationError } from '@covid/components/ValidationError';
import { colors } from '@theme';
import { Label } from 'native-base';
import React, { useState } from 'react';
import { PickerProps, StyleSheet, View } from 'react-native';

export interface ISingleButton {
  label?: string;
  value: string;
}

interface IProps {
  error?: any;
  items: ISingleButton[];
  label?: string;
  onValueChange: any;
  onlyPicker?: boolean;
  pickerProps?: PickerProps;
  selectedValue: string;
  testID?: string;
}

export function ButtonsGroup({ label, selectedValue, items, error, onValueChange, onlyPicker, testID }: IProps) {
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
            onPress={() => onSelect(item.value)}
            selected={selected === item.value}
            style={{ flex: 1, marginEnd: 8 }}
            testID={`button-${item.value}${testID ? `-${testID}` : ''}`}
          >
            {item.label}
          </SelectableButton>
        ))}
      </View>

      {error ? (
        <View style={{ marginHorizontal: 4, marginTop: 4 }}>
          <ValidationError error={error} />
        </View>
      ) : null}
    </FieldWrapper>
  );
}

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
  },
  labelStyle: {
    color: colors.primary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
});

export default ButtonsGroup;
