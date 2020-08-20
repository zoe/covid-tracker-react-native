import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import YesNoField from '@covid/components/YesNoField';
import { cleanIntegerVal } from '@covid/utils/number';
import DropdownField from '@covid/components/DropdownField';
import { FieldWrapper } from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';

export interface NHSTestFridgeData {
  storedInFridge: string;
  daysInFridge: string;
}

interface Props {
  formikProps: FormikProps<NHSTestFridgeData>;
  test?: CovidTest;
}

export interface INHSTestFridgeQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const NHSTestFridgeQuestion: INHSTestFridgeQuestion<Props, NHSTestFridgeData> = (props: Props) => {
  const { formikProps } = props;

  const dropdownValues = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
  ];

  return (
    <>
      <YesNoField
        selectedValue={formikProps.values.storedInFridge}
        onValueChange={formikProps.handleChange('storedInFridge')}
        error={formikProps.touched.storedInFridge && formikProps.errors.storedInFridge}
        label={i18n.t('nhs-test-detail.fridge-label')}
      />

      {formikProps.values.storedInFridge === 'yes' && (
        <FieldWrapper>
          <DropdownField
            label={i18n.t('nhs-test-detail.days-label')}
            selectedValue={formikProps.values.daysInFridge}
            onValueChange={formikProps.handleChange('daysInFridge')}
            items={dropdownValues}
          />
        </FieldWrapper>
      )}
    </>
  );
};

NHSTestFridgeQuestion.initialFormValues = (test?: CovidTest): NHSTestFridgeData => {
  if (test?.id) {
    if (test.days_in_fridge) {
      return {
        storedInFridge: 'yes',
        daysInFridge: test.days_in_fridge.toString(),
      };
    } else {
      return {
        storedInFridge: 'no',
        daysInFridge: '',
      };
    }
  }
  return {
    storedInFridge: '',
    daysInFridge: '',
  };
};

NHSTestFridgeQuestion.schema = () => {
  return Yup.object().shape({
    storedInFridge: Yup.string().required(i18n.t('nhs-test-detail.fridge-required')),
    daysInFridge: Yup.string().when('storedInFridge', {
      is: (storedInFridge) => {
        return storedInFridge === 'yes';
      },
      then: Yup.string().required(i18n.t('nhs-test-detail.days-required')),
    }),
  });
};

NHSTestFridgeQuestion.createDTO = (formData: NHSTestFridgeData): Partial<CovidTest> => {
  return {
    ...(formData.storedInFridge === 'yes' && { days_in_fridge: cleanIntegerVal(formData.daysInFridge) }),
    ...(formData.storedInFridge === 'no' && { days_in_fridge: null }),
  } as Partial<CovidTest>;
};
