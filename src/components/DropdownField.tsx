import { Icon, Item, Label, Picker, View } from 'native-base';
import React from 'react';
import { PickerItemProps, StyleSheet, PickerProps } from 'react-native';
import key from 'weak-key';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';

import { FieldWrapper, screenWidth, isAndroid } from './Screen';
import { ValidationError } from './ValidationError';

interface DropdownFieldProps {
  placeholder?: string | undefined;
  selectedValue?: any;
  onValueChange: any;
  label?: string;
  items?: PickerItemProps[];
  pickerProps?: PickerProps;
  androidDefaultLabel?: string;
  error?: any;
  onlyPicker?: boolean;
}

type DropdownPickerProps = Omit<DropdownFieldProps, 'label'>;

const DropdownPicker = (props: DropdownPickerProps) => {
  const { placeholder, selectedValue, onValueChange, androidDefaultLabel, onlyPicker, error, ...pickerProps } = props;
  const pickerStyle = onlyPicker ? {} : styles.picker;
  const itemStyle = error ? styles.errorHighlight : {};
  const items = props.items ?? [
    { label: i18n.t('picker-no'), value: 'no' },
    { label: i18n.t('picker-yes'), value: 'yes' },
  ];

  if (isAndroid) {
    if (androidDefaultLabel) {
      items.unshift({ label: androidDefaultLabel, value: '' });
    } else if (!items.find((item) => item.value === selectedValue)) {
      items.unshift({ label: i18n.t('choose-one-of-these-options'), value: selectedValue });
    }
  }

  return (
    <Picker
      mode="dropdown"
      placeholder={placeholder} // Placeholder not supported on android
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      iosIcon={<Icon style={styles.arrowStyle} name="md-arrow-dropdown" />}
      itemTextStyle={{ textAlign: 'left' }}
      style={pickerStyle}
      {...pickerProps}>
      {items.map((i) => (
        <Picker.Item color={i.value ? undefined : colors.tertiary} key={key(i)} label={i.label} value={i.value} />
      ))}
    </Picker>
  );
};

const DropdownField = (props: DropdownFieldProps) => {
  // Can be used as a yes/no dropdown field by leaving props.items blank.
  const { label, error, onlyPicker, ...more } = props;

  return onlyPicker ? (
    <DropdownPicker onlyPicker={onlyPicker} {...more} />
  ) : (
    <FieldWrapper style={styles.fieldWrapper}>
      <Label style={styles.labelStyle}>{label}</Label>
      <View
        style={[
          styles.dropdownWrapper,
          {
            borderColor: error ? colors.feedbackBad : colors.tertiary,
          },
        ]}>
        <DropdownPicker {...more} />
      </View>
      {!!error && (
        <View style={{ marginTop: 10 }}>
          <ValidationError error={error} />
        </View>
      )}
    </FieldWrapper>
  );
};

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
    marginVertical: 32,
    marginHorizontal: 16,
  },
  labelStyle: {
    fontSize: 15,
    lineHeight: 30,
    color: colors.primary,
  },
  picker: {
    width: '100%',
    height: 48,
    paddingRight: 32,
  },
  dropdownWrapper: {
    borderBottomWidth: 1,
  },
  errorHighlight: {
    borderBottomWidth: 1,
    borderColor: colors.feedbackBad,
  },

  arrowStyle: {
    right: 0,
    position: 'absolute',
  },
});

export default DropdownField;
