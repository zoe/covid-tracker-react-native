import { Icon, Item, Label, Picker, View } from 'native-base';
import React from 'react';
import { PickerItemProps, StyleSheet, PickerProps } from 'react-native';
import key from 'weak-key';

import Info from '@assets/icons/Info';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { FieldWrapper, screenWidth, isAndroid } from './Screen';
import { LabelText } from './Text';
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
  info?: string;
}

type DropdownPickerProps = Omit<DropdownFieldProps, 'label'>;

const DropdownPicker = (props: DropdownPickerProps) => {
  const { placeholder, selectedValue, onValueChange, androidDefaultLabel, onlyPicker, error, ...pickerProps } = props;
  const pickerStyle = onlyPicker ? [styles.picker, { width: '100%' }] : styles.picker;
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
      textStyle={{ color: colors.secondary }}
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
  const { label, error, onlyPicker, info, ...more } = props;

  return onlyPicker ? (
    <View style={styles.dropdownWrapper}>
      <DropdownPicker onlyPicker={onlyPicker} {...more} />
    </View>
  ) : (
    <FieldWrapper style={styles.fieldWrapper}>
      <Label style={styles.labelStyle}>{label}</Label>
      <View
        style={[
          styles.dropdownWrapper,
          {
            borderColor: error ? colors.feedbackBad : 'transparent',
          },
        ]}>
        <DropdownPicker {...more} />
      </View>
      {!!error && <ValidationError error={error} />}
      {!!info && (
        <View style={styles.infoContainer}>
          <Info style={styles.infoIcon} />
          <LabelText>{info}</LabelText>
        </View>
      )}
    </FieldWrapper>
  );
};

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
    // marginVertical: 32,
    // marginLeft: 16,
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
    backgroundColor: colors.backgroundTertiary,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
  },
  errorHighlight: {
    borderBottomWidth: 1,
    borderColor: colors.feedbackBad,
  },
  infoContainer: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    paddingHorizontal: 5,
  },
  arrowStyle: {
    right: 0,
    position: 'absolute',
  },
});

export default DropdownField;
