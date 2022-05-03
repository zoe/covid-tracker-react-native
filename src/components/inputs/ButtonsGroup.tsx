import { SelectableButton } from '@covid/components/SelectableButton';
import { ValidationError } from '@covid/components/ValidationError';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { Label } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { requiredFormMarker } from '../Form';

export interface ISingleButton {
  label?: string;
  value: string;
}

interface IProps {
  label?: string;
  selectedValue: string;
  items: ISingleButton[];
  onValueChange: any;
  hideLabel?: boolean;
  error?: any;
  testID?: string;
  required?: boolean;
}

export function ButtonsGroup({
  label,
  selectedValue,
  items,
  error,
  onValueChange,
  hideLabel,
  testID,
  required,
}: IProps) {
  const [selected, setSelected] = React.useState<string>(selectedValue);

  const onSelect = (value: string) => {
    setSelected(value);
    onValueChange(value);
  };

  return (
    <View>
      {hideLabel ? null : (
        <Label style={styles.label}>
          {label}
          {required ? requiredFormMarker : null}
        </Label>
      )}
      <View style={styles.row}>
        {items.map((item, index) => (
          <SelectableButton
            key={item.value}
            onPress={() => onSelect(item.value)}
            selected={selected === item.value}
            style={{ flex: 1, marginLeft: index !== 0 ? 8 : 0 }}
            testID={`button-${item.value}${testID ? `-${testID}` : ''}`}
          >
            {item.label}
          </SelectableButton>
        ))}
      </View>

      {error ? (
        <View style={{ marginHorizontal: sizes.xxs, marginTop: sizes.xxs }}>
          <ValidationError error={error} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.primary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: sizes.xs,
    marginTop: sizes.l,
  },
  row: {
    flexDirection: 'row',
  },
});
