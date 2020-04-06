import React from 'react';
import {PickerItemProps, StyleSheet, PickerProps} from 'react-native';
import {Icon, Item, Label, Picker, View} from 'native-base';
import {FieldWrapper, screenWidth, isAndroid} from "./Screen";
import key from 'weak-key';
import {colors} from "../../theme";
import {ValidationError} from './ValidationError';

interface DropdownFieldProps {
    placeholder?: string | undefined,
    selectedValue?: any,
    onValueChange: any,
    label?: string,
    items?: PickerItemProps[]
    pickerProps?: PickerProps,
    isCompact?: boolean,
    androidDefaultLabel?: string,
    error?: any,
    onlyPicker?: boolean,
}

type DropdownPickerProps = Omit<DropdownFieldProps, "label">

const DropdownPicker = (props: DropdownPickerProps) => {
    const {placeholder, selectedValue, onValueChange, androidDefaultLabel, onlyPicker, error, ...pickerProps} = props;
    const pickerStyle = onlyPicker ? {} : styles.picker;
    const itemStyle = error ? styles.errorHighlight : {};
    const items = props.items || [{label: 'No', value: 'no'}, {label: 'Yes', value: 'yes'}];

    if (androidDefaultLabel && isAndroid) {
        items.unshift({label: androidDefaultLabel, value: ""});
    }

    return (
        <Picker
            mode="dropdown"
            placeholder={placeholder} // Placeholder not supported on android
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            iosIcon={<Icon name="arrow-down"/>}
            itemTextStyle={{textAlign: "left"}}
            style={pickerStyle}
            {...pickerProps}
          >
          {items.map(i => <Picker.Item color={i.value ? undefined : colors.tertiary} key={key(i)} label={i.label} value={i.value}/>)}
      </Picker>
    )
};

const DropdownField = (props: DropdownFieldProps) => {
    // Can be used as a yes/no dropdown field by leaving props.items blank.
    const {label, error, onlyPicker, ...more} = props;
    const wrapperStyle = props.isCompact ? null : styles.fieldWrapper;

    return (
        onlyPicker ? <DropdownPicker onlyPicker={onlyPicker} {...more} /> :
            <FieldWrapper style={wrapperStyle}>
            <Label style={styles.labelStyle}>{label}</Label>
                <View style={styles.dropdownWrapper}>
            <DropdownPicker {...more} />
            </View>
          {!!error && (
            <View style={{marginTop: 10}}>
                <ValidationError error={error}/>
            </View>
          )}
      </FieldWrapper>
    )
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
        color: colors.primary
    },
    picker: {
        width: screenWidth - 16,
        marginTop: 12,
    },
    dropdownWrapper: {
        borderBottomWidth: 1,
        borderColor: colors.tertiary,
    },
    errorHighlight: {
        borderBottomWidth: 1,
        borderColor: colors.feedbackBad,
    },
})

export default DropdownField
