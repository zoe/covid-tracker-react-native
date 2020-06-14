import { Label, View } from 'native-base';
import React from 'react';
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

type State = {
  items?: PickerItemProps[];
  options?: string[];
  dropdownWidth?: number;
  dropdownFocus?: boolean;
  selectedLabel?: string;
  defaultIndex?: number;
};

class DropdownField extends React.Component<DropdownFieldProps, State> {
  constructor(props: DropdownFieldProps) {
    super(props);

    const items = this.props.items?.filter((item) => !!item.value) ?? [
      { label: i18n.t('picker-no'), value: 'no' },
      { label: i18n.t('picker-yes'), value: 'yes' },
    ];

    //This only change the default highlight of the dropdown row
    let defaultIndex = -1;

    //This only change the default highlight of the dropdown row
    const selectedLabel = items.find((item, index) => {
      if (item.value === this.props.selectedValue) {
        defaultIndex = index;
        return true;
      }
      return false;
    })?.label;

    this.state = {
      items,
      options: items.map((item) => item.label),
      dropdownWidth: 0,
      dropdownFocus: false,
      selectedLabel,
      defaultIndex,
    };
  }

  setDropdownWidth = (event: any) => {
    if (this.state.dropdownWidth !== event.nativeEvent.layout.width) {
      this.setState({ dropdownWidth: event.nativeEvent.layout.width });
    }
  };

  handleOnDropdownWillShow = () => {
    this.setState({ dropdownFocus: true });
  };

  handleOnDropdownWillHide = () => {
    this.setState({ dropdownFocus: false });
  };

  onValueChange = (id: any, label: any) => {
    this.setState({ selectedLabel: label });
    if (id !== -1) {
      this.props.onValueChange(this.state?.items?.find((item: PickerItemProps) => item.label === label)?.value);
    }
  };

  renderDropdownSeparator = () => {
    return <View style={styles.dropdonwSeparator} />;
  };

  renderDropdownRow = (option: string, index: string, isSelected: boolean) => {
    let borderRadiusStyle = {};
    const lastIndex = (this.state.options?.length ?? 0) - 1;

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

  render() {
    // Can be used as a yes/no dropdown field by leaving props.items blank.
    const { label, error, onlyPicker } = this.props;
    const { options, dropdownWidth, dropdownFocus, selectedLabel, defaultIndex } = this.state;
    const dropdownFocusStyle = dropdownFocus ? styles.dropdownOnFocus : styles.dropdownNoBorder;
    const dropdownErrorStyle = error ? styles.dropdownError : {};

    return (
      <FieldWrapper style={styles.fieldWrapper}>
        {onlyPicker ? null : <Label style={styles.labelStyle}>{label}</Label>}
        <ModalDropdown
          animated={false}
          showsVerticalScrollIndicator={false}
          style={styles.dropdownButton}
          dropdownStyle={{ ...styles.dropdownStyle, width: dropdownWidth, height: (options?.length ?? 1) * 48.6 }}
          options={options}
          defaultIndex={defaultIndex}
          onSelect={this.onValueChange}
          onDropdownWillShow={this.handleOnDropdownWillShow}
          onDropdownWillHide={this.handleOnDropdownWillHide}
          renderSeparator={this.renderDropdownSeparator}
          renderRow={this.renderDropdownRow}>
          <View
            onLayout={this.setDropdownWidth}
            style={[styles.dropdownButtonContainer, dropdownFocusStyle, dropdownErrorStyle]}>
            <Label style={[styles.dropdownLabel, selectedLabel ? styles.dropdownSelectedLabel : {}]}>
              {selectedLabel ?? 'Choose one of the options'}
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
  }
}

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
