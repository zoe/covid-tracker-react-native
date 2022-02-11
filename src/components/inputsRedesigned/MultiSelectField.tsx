import { CheckboxItem, CheckboxList } from '@covid/components/inputsRedesigned/Checkbox';
import { ValidationError } from '@covid/components/ValidationError';
import { THealthProfileRequest } from '@covid/core/user/dto/UserAPIContracts';
import { FormikProps } from 'formik';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

export type TItemCheckbox = {
  label: string;
  name: keyof THealthProfileRequest;
  testID?: string;
};

interface IProps {
  error?: string;
  formikProps: FormikProps<any>;
  items: TItemCheckbox[];
  label?: string;
  required?: boolean;
  dark?: boolean;
  propertyName?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  selectedValue?: string;
}

export function MultiSelectField(props: IProps) {
  return (
    <CheckboxList label={props.label} required={props.required} testID={props.testID}>
      {props.items.map((item) => (
        <CheckboxItem
          key={item.name}
          onChange={(checked: boolean) => {
            let answersArray =
              props.selectedValue === '' || props.selectedValue === undefined ? [] : props.selectedValue.split(',');

            if (checked && (item.name.includes('pfnts') || item.name.includes('none'))) {
              answersArray = [item.name];
            } else if (checked) {
              answersArray.push(item.name);
              answersArray = answersArray.filter((val) => !val.includes('pfnts') && !val.includes('none'));
            } else {
              answersArray = answersArray.filter((val) => val !== item.name);
            }

            props.items.forEach((option) => {
              props.formikProps.setFieldValue(option.name, answersArray.includes(option.name));
            });

            if (props.propertyName) {
              props.formikProps.setFieldValue(props.propertyName, answersArray.join(','));
            }
          }}
          testID={`checkbox-${props.propertyName}-${item.testID}`}
          value={props.formikProps.values[item.name]}
        >
          {item.label}
        </CheckboxItem>
      ))}
      {props.error ? <ValidationError error={props.error} style={styles.error} /> : null}
    </CheckboxList>
  );
}

const styles = StyleSheet.create({
  error: {
    marginLeft: 0,
  },
});
