import { Label, View } from 'native-base';
import React, { useState, useEffect } from 'react';
import { PickerItemProps, StyleSheet, PickerProps, Text, Image, ImageSourcePropType } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { colors } from '@covid/theme';
import i18n from '@covid/locale/i18n';
import DropdownIcon from '@assets/icons/DropdownIcon';

import { FieldWrapper } from './Screen';
import { ValidationError } from './ValidationError';

interface IProps {
  placeholder?: string | undefined;
  selectedValue?: any;
  onValueChange: any;
  label?: string;
  items: PickerItemProps[];
  pickerProps?: PickerProps;
  androidDefaultLabel?: string;
  error?: any;
  onlyPicker?: boolean;
  itemIcons?: ImageSourcePropType[];
}

interface ISelectedItem {
  index: number;
  label?: string;
}

const DROPDOWN_ROW_HEIGHT = 48.6;

export function DropdownField({
  label,
  error,
  onlyPicker,
  items: providedItems,
  selectedValue,
  onValueChange,
  itemIcons,
}: IProps) {
  // Returns with [No, Yes] if props.item is blank (no dropdown list items provided.)
  const prepareItems = (array?: PickerItemProps[]): PickerItemProps[] => {
    return (
      array?.filter((item) => !!item.value) ?? [
        { label: i18n.t('picker-no'), value: 'no' },
        { label: i18n.t('picker-yes'), value: 'yes' },
      ]
    );
  };

  // Returns selected index & label
  const getSelectedLabel = (items: PickerItemProps[], selected: string): ISelectedItem => {
    let defaultIndex = -1;
    const label = items.find((item, index) => {
      const isSelected = item.value === selected;
      if (isSelected) {
        defaultIndex = index;
      }
      return isSelected;
    })?.label;
    return { index: defaultIndex, label };
  };

  // Get index & label from default value passed with props
  const defaultItems = prepareItems(providedItems);
  const { index: defaultIndex, label: defaultSelectedLabel } = getSelectedLabel(defaultItems, selectedValue);

  const [options, setOptions] = useState(defaultItems);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [dropdownFocus, setDropdownFocus] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(defaultSelectedLabel);

  const dropdownFocusStyle = dropdownFocus ? styles.dropdownOnFocus : styles.dropdownNoBorder;
  const dropdownErrorStyle = error ? styles.dropdownError : {};

  // Update internal string items on props items change
  useEffect(() => {
    setOptions(prepareItems(providedItems));
    setSelectedLabel(getSelectedLabel(defaultItems, selectedValue).label);
  }, [providedItems]);

  const onSelect = (id: any, label: any) => {
    setSelectedLabel(label);
    if (id !== -1) {
      const value = options?.find((item: PickerItemProps) => item.label === label)?.value;
      onValueChange(value);
    }
  };

  const updateDropdownWidth = (event: any) => {
    if (dropdownWidth !== event.nativeEvent.layout.width) {
      setDropdownWidth(event.nativeEvent.layout.width);
    }
  };

  const renderDropdownSeparator = (): React.ReactNode => <View style={styles.dropdownSeparator} />;

  const renderDropdownRow = (option: string, index: any, isSelected: boolean): React.ReactNode => {
    // There is a type error in renderDropdownRow index is actually a number, not a string

    const lastIndex = (options?.length ?? 0) - 1;
    let borderRadiusStyle = {};
    if (index === 0) borderRadiusStyle = styles.topBorderRadiusStyle;
    else if (index === lastIndex) borderRadiusStyle = styles.bottomBorderRadiusStyle;

    return (
      <View
        style={[
          styles.picker,
          styles.dropdownTextStyle,
          borderRadiusStyle,
          isSelected && styles.dropdownTextHighlightStyle,
        ]}>
        {itemIcons?.length && <Image source={itemIcons[index]} style={{ marginRight: 5, width: 24, height: 24 }} />}
        <Text style={[styles.dropdownTextStyle]}>{option}</Text>
      </View>
    );
  };

  return (
    <FieldWrapper style={styles.fieldWrapper}>
      {onlyPicker ? null : <Label style={styles.labelStyle}>{label}</Label>}
      <ModalDropdown
        animated={false}
        showsVerticalScrollIndicator={false}
        style={styles.dropdownButton}
        dropdownStyle={{
          ...styles.dropdownStyle,
          width: dropdownWidth,
          height: Math.min((options?.length ?? 1) * DROPDOWN_ROW_HEIGHT, 220),
        }}
        options={options.map((item: PickerItemProps) => item.label)}
        defaultIndex={defaultIndex}
        onSelect={onSelect}
        onDropdownWillShow={() => {
          setDropdownFocus(true);
        }}
        onDropdownWillHide={() => {
          setDropdownFocus(false);
        }}
        renderSeparator={renderDropdownSeparator}
        renderRow={renderDropdownRow}>
        <View
          onLayout={updateDropdownWidth}
          style={[styles.dropdownButtonContainer, dropdownFocusStyle, dropdownErrorStyle]}>
          <Label style={[styles.dropdownLabel, selectedLabel ? styles.dropdownSelectedLabel : {}]}>
            {selectedLabel ?? i18n.t('choose-one-of-these-options')}
          </Label>
          <DropdownIcon />
        </View>
      </ModalDropdown>
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
    lineHeight: 30,
    marginBottom: 8,
    color: colors.primary,
  },
  picker: {
    width: '100%',
    minHeight: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  errorHighlight: {
    borderBottomWidth: 1,
    borderColor: colors.feedbackBad,
  },
  dropdownButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  dropdownButton: {
    backgroundColor: colors.backgroundTertiary,
    height: 'auto',
    minHeight: 48,
    borderRadius: 8,
    minWidth: 70,
  },
  dropdownLabel: { color: colors.secondary, flex: 1, lineHeight: 24 },
  dropdownSelectedLabel: { color: colors.primary },
  dropdownStyle: {
    marginTop: 8,
    borderRadius: 8,
    elevation: 20,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderWidth: 0,
  },
  dropdownTextStyle: {
    backgroundColor: 'transparent',
    fontSize: 16,
    fontFamily: 'SofiaProRegular',
    lineHeight: 24,
    color: colors.secondary,
  },
  dropdownNoBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: 8,
  },
  dropdownOnFocus: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'solid',
    borderRadius: 8,
  },
  dropdownError: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: colors.feedbackBad,
  },
  dropdownTextHighlightStyle: {
    backgroundColor: colors.backgroundTertiary,
    color: colors.primary,
  },
  topBorderRadiusStyle: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
  },
  bottomBorderRadiusStyle: {
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  dropdownSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: colors.backgroundSecondary,
  },
});

export default DropdownField;
