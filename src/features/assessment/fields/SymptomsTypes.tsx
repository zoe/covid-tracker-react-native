import { CheckboxItem } from '@covid/components/Checkbox';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { TDoseSymptomsRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { sizes } from '@covid/themes';
import { FormikProps } from 'formik';
import * as React from 'react';
import { PickerItemProps, View } from 'react-native';
import * as Yup from 'yup';

export interface ISymptomQuestions<P, Data> extends React.FC<P> {
  getInitialFormValues: (defaultTemperatureUnit?: string) => Data;
  createValidationSchema: () => Yup.ObjectSchema;
  createAssessment: (data: Data, param?: any) => Partial<TAssessmentInfosRequest>;
}

export interface IDoseSymptomQuestions<P, Data> extends React.FC<P> {
  getInitialFormValues: () => Data;
  createValidationSchema: () => Yup.ObjectSchema;
  createDoseSymptoms: (data: Data, param?: any) => Partial<TDoseSymptomsRequest>;
}

type TBoolObject = { [key: string]: boolean | undefined };
type TStringObject = { [key: string]: string };

type TFollowUpQuestion<F> = {
  label: string;
  value: Extract<keyof F, string>; // Extract used because by default keyof can be (string | number | symbol)
  options: PickerItemProps[];
};

export type TSymptomCheckBoxData<T extends TBoolObject, F extends TStringObject> = {
  label: string;
  value: Extract<keyof T, string>; // Extract used because by default keyof can be (string | number | symbol)
  followUp?: TFollowUpQuestion<F>;
};

export function createSymptomCheckboxes<T extends TBoolObject, F extends TStringObject>(
  data: TSymptomCheckBoxData<T, F>[],
  props: FormikProps<T & F>,
): React.ReactNode[] {
  return data.map((checkBoxData) => {
    return (
      <View key={checkBoxData.value}>
        <CheckboxItem
          onChange={(checked: boolean) => {
            props.setFieldValue(checkBoxData.value, checked);
          }}
          testID={`checkbox-item-${checkBoxData.value}`}
          value={props.values[checkBoxData.value]}
        >
          {checkBoxData.label}
        </CheckboxItem>

        {checkBoxData.followUp && props.values[checkBoxData.value] ? (
          <View style={{ marginBottom: sizes.m }}>
            <RadioInput
              error={props.touched[checkBoxData.followUp?.value] ? props.errors[checkBoxData.followUp?.value] : ''}
              items={checkBoxData.followUp?.options}
              label={checkBoxData.followUp?.label}
              onValueChange={props.handleChange(checkBoxData.followUp?.value)}
              selectedValue={props.values[checkBoxData.followUp?.value]}
            />
          </View>
        ) : null}
      </View>
    );
  });
}
