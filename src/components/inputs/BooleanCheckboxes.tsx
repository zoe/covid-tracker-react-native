import { useFormikContext } from 'formik';
import React from 'react';
import { TextInputProps, View } from 'react-native';

import { CheckboxItem } from '../checkbox';
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
              onChange={(checked: boolean) => {
                setFieldValue(checkBoxData.formKey, checked);
              }}
              value={(values as any)[checkBoxData.formKey]}
            >
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
              setFieldValue,
              values,
            }}
            inputProps={showAdditionalInputProps.inputProps}
            label={showAdditionalInputProps.label}
            name={showAdditionalInputProps.key}
          />
        </View>
      )}
    </>
  );
};
