import { Label, View } from 'native-base';
import React, { useState, useEffect } from 'react';
import { PickerItemProps, StyleSheet, PickerProps, TouchableOpacity, Text } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';

import DropdownIcon from '../../assets/icons/Dropdown';

import { FieldWrapper } from './Screen';
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

export const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  error,
  onlyPicker,
  items: providedItems,
  selectedValue,
  onValueChange,
}) => {
  // Can be used as a yes/no dropdown field by leaving props.items blank.
  // const { label, error, onlyPicker } = this.props;
  let _defaultIndex = -1;

  const _convertItems = (array?: PickerItemProps[]): PickerItemProps[] => {
    return (
      array?.filter((item) => !!item.value) ?? [
        { label: i18n.t('picker-no'), value: 'no' },
        { label: i18n.t('picker-yes'), value: 'yes' },
      ]
    );
  };
  const _defaultItems = _convertItems(providedItems);

  const _defaultSelectedLabel = _defaultItems.find((item, index) => {
    if (item.value === selectedValue) {
      _defaultIndex = index;
      return true;
    }
    return false;
  })?.label;

  const [options, setOptions] = useState(_defaultItems.map((item) => item.label));
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [dropdownFocus, setDropdownFocus] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(_defaultSelectedLabel);

  const dropdownFocusStyle = dropdownFocus ? styles.dropdownOnFocus : styles.dropdownNoBorder;
  const dropdownErrorStyle = error ? styles.dropdownError : {};

  // Update internal string items on props items change
  useEffect(() => {
    setOptions(_convertItems(providedItems).map((item) => item.label));
  }, [providedItems]);

  const _onValueChange = (id: any, label: any) => {
    setSelectedLabel(label);
    if (id !== -1) {
      onValueChange(providedItems?.find((item: PickerItemProps) => item.label === label)?.value);
    }
  };

  const _updateDropdownWidth = (event: any) => {
    if (dropdownWidth !== event.nativeEvent.layout.width) {
      setDropdownWidth(event.nativeEvent.layout.width);
    }
  };

  const _renderDropdownSeparator = () => {
    return <View style={styles.dropdonwSeparator} />;
  };

  const _renderDropdownRow = (option: string, index: string, isSelected: boolean) => {
    let borderRadiusStyle = {};
    const lastIndex = (options?.length ?? 0) - 1;

    if (index === '0') borderRadiusStyle = styles.topBorderRadiusStyle;
    else if (index === lastIndex.toString()) borderRadiusStyle = styles.bottomBorderRadiusStyle;

    return (
      <TouchableOpacity
        style={[
          styles.picker,
          styles.dropdownTextStyle,
          borderRadiusStyle,
          isSelected && styles.dropdownTextHighlightStyle,
        ]}>
        <Text style={[styles.dropdownTextStyle, isSelected && styles.dropdownTextHighlightStyle]}>{option}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FieldWrapper style={styles.fieldWrapper}>
      {onlyPicker ? null : <Label style={styles.labelStyle}>{label}</Label>}
      <ModalDropdown
        animated={false}
        showsVerticalScrollIndicator={false}
        style={styles.dropdownButton}
        dropdownStyle={{ ...styles.dropdownStyle, width: dropdownWidth, height: (options?.length ?? 1) * 48.6 }}
        options={options}
        defaultIndex={_defaultIndex}
        onSelect={_onValueChange}
        onDropdownWillShow={() => {
          setDropdownFocus(true);
        }}
        onDropdownWillHide={() => {
          setDropdownFocus(false);
        }}
        renderSeparator={_renderDropdownSeparator}
        renderRow={_renderDropdownRow}>
        <View
          onLayout={_updateDropdownWidth}
          style={[styles.dropdownButtonContainer, dropdownFocusStyle, dropdownErrorStyle]}>
          <Label style={[styles.dropdownLabel, selectedLabel ? styles.dropdownSelectedLabel : {}]}>
            {selectedLabel ?? i18n.t('choose-one-of-these-options')}
          </Label>
          <DropdownIcon width={15} height={19} />
        </View>
      </ModalDropdown>
      {!!error && (
        <View style={{ marginTop: 6, marginHorizontal: -16 }}>
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
  dropdownLabel: { color: colors.secondary, flex: 1, fontWeight: '300', lineHeight: 24 },
  dropdownSelectedLabel: { color: colors.primary },
  dropdownStyle: {
    marginTop: 8,
    borderRadius: 8,
    elevation: 20,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  dropdownTextStyle: {
    backgroundColor: 'transparent',
    fontSize: 16,
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
  dropdonwSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: colors.backgroundSecondary,
  },
});

export default DropdownField;
