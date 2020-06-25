import { Label, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, PickerProps } from 'react-native';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { SelectableButton } from '@covid/components/SelectableButton';

import { FieldWrapper } from './Screen';
import { ValidationError } from './ValidationError';

interface YesNoFieldProps {
  selectedValue: string;
  onValueChange: any;
  label?: string;
  onlyPicker?: boolean;
  pickerProps?: PickerProps;
  error?: any;
}

export const YesNoField: React.FC<YesNoFieldProps> = ({ label, error, selectedValue, onValueChange, onlyPicker }) => {
  const [selectedAnswer, setAnswer] = useState(selectedValue);

  const onSelect = (value: string) => {
    setAnswer(value);
    onValueChange(value);
  };

  return (
    <FieldWrapper style={styles.fieldWrapper}>
      {onlyPicker ? null : <Label style={styles.labelStyle}>{label}</Label>}

      <View style={{ flexDirection: 'row' }}>
        <SelectableButton
          style={{ flex: 1, marginEnd: 8 }}
          selected={selectedAnswer === 'no'}
          onPress={() => onSelect('no')}>
          {i18n.t('picker-no')}
        </SelectableButton>
        <SelectableButton
          style={{ flex: 1, marginStart: 8 }}
          selected={selectedAnswer === 'yes'}
          onPress={() => onSelect('yes')}>
          {i18n.t('picker-yes')}
        </SelectableButton>
      </View>

      {!!error && (
        <View style={{ marginTop: 4, marginHorizontal: 4 }}>
          <ValidationError error={error} />
        </View>
      )}
    </FieldWrapper>
  );
};

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
    marginHorizontal: 16,
  },
  labelStyle: {
    fontSize: 16,
    lineHeight: 30,
    marginBottom: 8,
    color: colors.primary,
  },
});

export default YesNoField;
