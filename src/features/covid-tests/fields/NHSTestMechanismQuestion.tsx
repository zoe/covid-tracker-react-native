import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import DropdownField from '@covid/components/DropdownField';
import { LifestyleRequest } from '@covid/core/assessment/dto/LifestyleRequest';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import YesNoField from '@covid/components/YesNoField';
import { FieldWrapper } from '@covid/components/Screen';
import { cleanIntegerVal } from '@covid/utils/number';

export interface NHSTestMechanismData {
  mechanism: string;
  storedInFridge: string;
  daysInFridge: string;
}

interface Props {
  formikProps: FormikProps<NHSTestMechanismData>;
  test?: CovidTest;
}

export interface NHSTestMechanismQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<LifestyleRequest>;
}

export const NHSTestMechanismQuestion: NHSTestMechanismQuestion<Props, NHSTestMechanismData> = (props: Props) => {
  const { formikProps } = props;

  const mechanismItems = [
    { label: i18n.t('nhs-test-detail.mechanism-swab'), value: CovidTestMechanismOptions.NOSE_OR_THROAT_SWAB },
    { label: i18n.t('nhs-test-detail.mechanism-saliva'), value: CovidTestMechanismOptions.SPIT_TUBE },
  ];

  const dayInFridgeItems = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
  ];

  return (
    <>
      <DropdownField
        selectedValue={formikProps.values.mechanism}
        onValueChange={formikProps.handleChange('mechanism')}
        label={i18n.t('nhs-test-detail.mechanism-label')}
        error={formikProps.touched.mechanism && formikProps.errors.mechanism}
        items={mechanismItems}
      />

      {formikProps.values.mechanism === CovidTestMechanismOptions.SPIT_TUBE && (
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
                items={dayInFridgeItems}
              />
            </FieldWrapper>
          )}
        </>
      )}
    </>
  );
};

NHSTestMechanismQuestion.initialFormValues = (test?: CovidTest): NHSTestMechanismData => {
  let mechanism = '';

  if (test?.id) {
    if (Object.values(CovidTestMechanismOptions).includes(test.mechanism as CovidTestMechanismOptions)) {
      mechanism = test.mechanism;
    }
  }

  if (test?.id) {
    if (test.days_in_fridge) {
      return {
        mechanism,
        storedInFridge: 'yes',
        daysInFridge: test.days_in_fridge.toString(),
      };
    } else {
      return {
        mechanism,
        storedInFridge: 'no',
        daysInFridge: '',
      };
    }
  }
  return {
    mechanism,
    storedInFridge: '',
    daysInFridge: '',
  };
};

NHSTestMechanismQuestion.schema = () => {
  return Yup.object().shape({
    mechanism: Yup.string().required(i18n.t('nhs-test-detail.mechanism-required')),
    storedInFridge: Yup.string().when('mechanism', {
      is: (mechanism) => {
        return mechanism === CovidTestMechanismOptions.SPIT_TUBE;
      },
      then: Yup.string().required(i18n.t('nhs-test-detail.days-required')),
    }),
    daysInFridge: Yup.string().when('storedInFridge', {
      is: (storedInFridge) => {
        return storedInFridge === 'yes';
      },
      then: Yup.string().required(i18n.t('nhs-test-detail.days-required')),
    }),
  });
};

NHSTestMechanismQuestion.createDTO = (formData: NHSTestMechanismData): Partial<CovidTest> => {
  return {
    mechanism: formData.mechanism,
    ...(formData.storedInFridge === 'yes' && { days_in_fridge: cleanIntegerVal(formData.daysInFridge) }),
    ...(formData.storedInFridge === 'no' && { days_in_fridge: null }),
  } as Partial<CovidTest>;
};
