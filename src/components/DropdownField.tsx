import DropdownIcon from '@assets/icons/DropdownIcon';
import { requiredFormMarker } from '@covid/components/Form';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { Label } from 'native-base';
import * as React from 'react';
import {
  Image,
  ImageSourcePropType,
  PickerItemProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { ValidationError } from './ValidationError';

interface IProps {
  error?: string;
  hideLabel?: boolean;
  itemIcons?: ImageSourcePropType[];
  items: PickerItemProps[];
  label?: string;
  onValueChange: (value: any) => void;
  placeholder?: string;
  required?: boolean;
  selectedValue?: any;
  style?: StyleProp<ViewStyle>;
}

interface ISelectedItem {
  index: number;
  label?: string;
}

const DROPDOWN_ROW_HEIGHT = 48.6;

function DropdownField(props: IProps) {
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
  const defaultItems = prepareItems(props.items);
  const { index: defaultIndex, label: defaultSelectedLabel } = getSelectedLabel(defaultItems, props.selectedValue);

  const [options, setOptions] = React.useState(defaultItems);
  const [dropdownWidth, setDropdownWidth] = React.useState(0);
  const [dropdownFocus, setDropdownFocus] = React.useState(false);
  const [selectedLabel, setSelectedLabel] = React.useState(defaultSelectedLabel);

  const dropdownFocusStyle = dropdownFocus ? styles.dropdownOnFocus : styles.dropdownNoBorder;
  const dropdownErrorStyle = props.error ? styles.dropdownError : {};

  // Update internal string items on props items change
  React.useEffect(() => {
    setOptions(prepareItems(props.items));
    setSelectedLabel(getSelectedLabel(defaultItems, props.selectedValue).label);
  }, [props.items]);

  const onSelect = (id: any, label: any) => {
    setSelectedLabel(label);
    if (id !== -1) {
      const value = options?.find((item: PickerItemProps) => item.label === label)?.value;
      props.onValueChange(value);
    }
  };

  const updateDropdownWidth = (event: any) => {
    if (dropdownWidth !== event.nativeEvent.layout.width) {
      setDropdownWidth(event.nativeEvent.layout.width);
    }
  };

  const renderDropdownSeparator = (): React.ReactNode => <View style={styles.dropdownSeparator} />;

  const dropdownHeight: number = Math.min((options?.length ?? 1) * DROPDOWN_ROW_HEIGHT, 220);
  const renderDropdownRow = (option: string, index: any, isSelected: boolean): React.ReactNode => {
    // There is a type error in renderDropdownRow index is actually a number, not a string

    const lastIndex = (options?.length ?? 0) - 1;
    let borderRadiusStyle = {};
    if (index === 0) borderRadiusStyle = styles.topBorderRadiusStyle;
    else if (index === lastIndex) borderRadiusStyle = styles.bottomBorderRadiusStyle;

    return (
      <View style={[styles.picker, styles.dropdownTextStyle, borderRadiusStyle, isSelected && styles.selected]}>
        {props.itemIcons?.length ? (
          <Image source={props.itemIcons[index]} style={{ height: 24, marginRight: sizes.xxs, width: 24 }} />
        ) : null}
        <Text style={[styles.dropdownTextStyle]}>{option}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.view, props.style]}>
      {props.hideLabel ? null : (
        <Label style={styles.label}>
          {props.label}
          {props.required ? requiredFormMarker : null}
        </Label>
      )}
      <ModalDropdown
        animated={false}
        defaultIndex={defaultIndex}
        dropdownStyle={{
          ...styles.dropdownStyle,
          height: dropdownHeight,
          width: dropdownWidth,
        }}
        onDropdownWillHide={() => {
          setDropdownFocus(false);
        }}
        onDropdownWillShow={() => {
          setDropdownFocus(true);
        }}
        onSelect={onSelect}
        options={options.map((item: PickerItemProps) => item.label)}
        renderRow={renderDropdownRow}
        renderSeparator={renderDropdownSeparator}
        showsVerticalScrollIndicator={false}
        style={styles.dropdownButton}
      >
        <View
          onLayout={updateDropdownWidth}
          style={[styles.dropdownButtonContainer, dropdownFocusStyle, dropdownErrorStyle]}
        >
          <Label style={[styles.dropdownLabel, selectedLabel ? styles.dropdownSelectedLabel : {}]}>
            {selectedLabel ?? (props.placeholder || i18n.t('label-chose-an-option'))}
          </Label>
          <DropdownIcon />
        </View>
      </ModalDropdown>
      {props.error ? (
        <View style={{ marginHorizontal: sizes.xxs, marginTop: sizes.xxs }}>
          <ValidationError error={props.error} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBorderRadiusStyle: {
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  dropdownButton: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: sizes.xs,
    height: 'auto',
    minHeight: 48,
    minWidth: 70,
  },
  dropdownButtonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: sizes.s,
  },
  dropdownError: {
    borderColor: colors.feedbackBad,
    borderRadius: sizes.xs,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  dropdownLabel: { color: colors.secondary, flex: 1, lineHeight: 24 },
  dropdownNoBorder: {
    borderColor: 'transparent',
    borderRadius: sizes.xs,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  dropdownOnFocus: {
    borderColor: colors.primary,
    borderRadius: sizes.xs,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  dropdownSelectedLabel: { color: colors.primary },
  dropdownSeparator: {
    backgroundColor: colors.backgroundSecondary,
    height: 1,
    width: '100%',
  },
  dropdownStyle: {
    borderRadius: sizes.xs,
    borderWidth: 0,
    elevation: 20,
    marginTop: sizes.xs,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  dropdownTextStyle: {
    backgroundColor: 'transparent',
    color: colors.secondary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
  },
  errorHighlight: {
    borderBottomWidth: 1,
    borderColor: colors.feedbackBad,
  },
  label: {
    color: colors.primary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 30,
    marginBottom: sizes.xs,
  },
  picker: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    minHeight: 48,
    padding: sizes.s,
    width: '100%',
  },
  selected: {
    backgroundColor: colors.backgroundTertiary,
    color: colors.primary,
  },
  topBorderRadiusStyle: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
  },
  view: {
    flex: 1,
    marginVertical: sizes.m,
  },
});

export default DropdownField;
