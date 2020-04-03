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
}

const DropdownField = (props: DropdownFieldProps) => {
    // Can be used as a yes/no dropdown field by leaving props.items blank.
    const {placeholder, selectedValue, onValueChange, label, androidDefaultLabel, error, ...pickerProps} = props;
    const items = props.items || [{label: 'No', value: 'no'}, {label: 'Yes', value: 'yes'}];
    const wrapperStyle = props.isCompact ? null : styles.fieldWrapper;

    const itemStyle = error ? styles.errorHighlight : {};
    const pickerStyle = styles.picker;

    if (androidDefaultLabel && isAndroid) {
        items.unshift({label: androidDefaultLabel, value: ""});
    }

    return (
      <FieldWrapper style={wrapperStyle}>
          <Item stackedLabel style={itemStyle}>
              <Label>{label}</Label>
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
                  {items.map(i => <Picker.Item color={i.value ? undefined : '#AAACAD'} key={key(i)} label={i.label} value={i.value}/>)}
              </Picker>
          </Item>
          {!!error && (
            <View style={{marginTop: 10}}>
                <ValidationError error={error}/>
            </View>
          )}
      </FieldWrapper>
    )
}

const styles = StyleSheet.create({
    fieldWrapper: {
        marginVertical: 32,
    },
    picker: {
        width: screenWidth - 16,
        marginTop: 16,
    },
    errorHighlight: {
        borderBottomWidth: 1,
        borderColor: colors.feedbackBad,
    },
})

export default DropdownField
