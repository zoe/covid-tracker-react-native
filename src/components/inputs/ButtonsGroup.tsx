import { FieldWrapper } from '@covid/components/Screen';
import { SelectableButton } from '@covid/components/SelectableButton';
import { ValidationError } from '@covid/components/ValidationError';
import { colors } from '@theme';
import { Label } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { requiredFormMarker } from '../Forms';

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
    <FieldWrapper style={styles.fieldWrapper}>
      {hideLabel ? null : (
        <Label style={styles.labelStyle}>
          {label}
          {required ? requiredFormMarker : null}
        </Label>
      )}
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
