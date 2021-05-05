import React from 'react';
import { TextInputProps, View } from 'react-native';
import { useFormikContext } from 'formik';

import { CheckboxItem } from '../Checkbox';
import { GenericTextField } from '../GenericTextField';

export type BooleanCheckBoxData = {
  label: string;
  formKey: string;
};

type AdditionalInputProps = {
  show: boolean;
  key: string;
  label: string;
  placeholder?: string;
  inputProps?: TextInputProps;
};

export type BooleanCheckBoxesProps = {
  data: BooleanCheckBoxData[];
  showAdditionalInputProps?: AdditionalInputProps;
};

// Label is what is shown to user
// value is what will be marked as true or false in form data
export const BooleanCheckboxes: React.FC<BooleanCheckBoxesProps> = ({ data, showAdditionalInputProps }) => {
  const { values, setFieldValue, ...formik } = useFormikContext();
  return (
    <>
      {data.map((checkBoxData) => {
        return (
          <View key={checkBoxData.formKey}>
            <CheckboxItem
              value={(values as any)[checkBoxData.formKey]}
              onChange={(checked: boolean) => {
                setFieldValue(checkBoxData.formKey, checked);
              }}>
              {checkBoxData.label}
            </CheckboxItem>
          </View>
        );
      })}

      {showAdditionalInputProps?.show && (
        <View style={{ marginTop: 16 }}>
          <GenericTextField
            formikProps={{
              ...formik,
              values,
              setFieldValue,
            }}
            label={showAdditionalInputProps.label}
            name={showAdditionalInputProps.key}
            inputProps={showAdditionalInputProps.inputProps}
          />
        </View>
      )}
    </>
  );
};
