import { CheckboxItem } from '@covid/components/Checkbox';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { DoseSymptomsRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { FormikProps } from 'formik';
import * as React from 'react';
import { PickerItemProps, View } from 'react-native';
import * as Yup from 'yup';

export interface ISymptomQuestions<P, Data> extends React.FC<P> {
  initialFormValues: (defaultTemperatureUnit?: string) => Data;
  schema: () => Yup.ObjectSchema;
  createAssessment: (data: Data, param?: any) => Partial<AssessmentInfosRequest>;
}

export interface IDoseSymptomQuestions<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDoseSymptoms: (data: Data, param?: any) => Partial<DoseSymptomsRequest>;
}

type BoolObject = { [key: string]: boolean | undefined };
type StringObject = { [key: string]: string };

export type SymptomCheckBoxData<T extends BoolObject, F extends StringObject> = {
  label: string;
  value: Extract<keyof T, string>; // Extract used because by default keyof can be (string | number | symbol)
  followUp?: FollowUpQuestion<F>;
};

export type FollowUpQuestion<F> = {
  label: string;
  value: Extract<keyof F, string>; // Extract used because by default keyof can be (string | number | symbol)
  options: PickerItemProps[];
};

export function createSymptomCheckboxes<T extends BoolObject, F extends StringObject>(
  data: SymptomCheckBoxData<T, F>[],
  props: FormikProps<T & F>,
): JSX.Element[] {
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
          <View style={{ marginBottom: 16 }}>
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
