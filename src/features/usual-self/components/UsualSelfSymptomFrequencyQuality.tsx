import { CheckboxItem } from '@covid/components/inputsRedesigned/Checkbox';
import { TUsualSelfSetupRequest } from '@covid/core/user/dto/UserAPIContracts';
import { FormikProps } from 'formik';
import React from 'react';

export type TItemCheckbox = {
  label: string;
  name: keyof TUsualSelfSetupRequest;
};

interface IProps {
  formikProps: FormikProps<any>;
  item: TItemCheckbox;
}

export function UsualSelfSymptomFrequencyQuality(props: IProps) {
  return (
    <CheckboxItem
      onChange={(checked: boolean) => {
        props.formikProps.setFieldValue(props.item.name, checked);
      }}
      testID={`checkbox-${props.item.name}`}
      value={props.formikProps.values[props.item.name]}
    >
      {props.item.label}
    </CheckboxItem>
  );
}
