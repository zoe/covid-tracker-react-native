import { CheckboxItem, CheckboxList } from '@covid/components/inputsRedesigned/Checkbox';
import { GenericTextField } from '@covid/components/inputsRedesigned/GenericTextField';
import { ValidationError } from '@covid/components/ValidationError';
import { sizes } from '@covid/themes';
import { FormikProps } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';

export type TItemCheckbox = {
  label: string;
  name: string;
  testID?: string;
};

interface IProps {
  error?: string;
  formikProps: FormikProps<any>;
  items: TItemCheckbox[];
  label: string;
  propertyName: string;
  selectedValue?: string;
  testID?: string;
}

// If we need to create more custom components that display other text field, we should refactor and combine into MultiSelectField component
export function ImmunodeficiencyQuestion(props: IProps) {
  return (
    <CheckboxList required label={props.label} testID={props.testID}>
      {props.items.map((item) => (
        <CheckboxItem
          key={item.name}
          onChange={(checked: boolean) => {
            let answersArray =
              props.selectedValue === '' || props.selectedValue === undefined ? [] : props.selectedValue.split(',');
            if (checked && item.name.includes('prior_immunodeficiency_diagnosis_pfnts')) {
              answersArray = ['prior_immunodeficiency_diagnosis_pfnts'];
            } else if (checked) {
              answersArray.push(item.name);
              answersArray = answersArray.filter((val) => val !== 'prior_immunodeficiency_diagnosis_pfnts');
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
      {props.formikProps.values[props.propertyName] &&
      props.formikProps.values[props.propertyName].includes('other') ? (
        <GenericTextField
          required
          formikProps={props.formikProps}
          label="Please specify"
          name="prior_immunodeficiency_diagnosis_other"
          style={styles.marginTop}
        />
      ) : null}
      {props.error ? <ValidationError error={props.error} style={styles.error} /> : null}
    </CheckboxList>
  );
}

const styles = StyleSheet.create({
  error: {
    marginLeft: 0,
  },
  marginTop: {
    marginTop: sizes.m,
  },
});
