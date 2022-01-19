import { CheckboxItem, CheckboxList } from '@covid/components/inputsRedesigned/Checkbox';
import { ValidationError } from '@covid/components/ValidationError';
import { FormikProps } from 'formik';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

export type TItemCheckbox = {
  label: string;
  name: string;
  testID?: string;
};

interface IProps {
  error?: string;
  formikProps: FormikProps<any>;
  items: TItemCheckbox[];
  label?: string;
  required?: boolean;
  dark?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function MultiSelectField(props: IProps) {
  return (
    <CheckboxList label={props.label} required={props.required} testID={props.testID}>
      {props.items.map((item) => (
        <CheckboxItem
          key={item.name}
          onChange={(checked: boolean) => {
            props.formikProps.setFieldValue(item.name, checked);
          }}
          testID={`checkbox-${item.testID}`}
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
