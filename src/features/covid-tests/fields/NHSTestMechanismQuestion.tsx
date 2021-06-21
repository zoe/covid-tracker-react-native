import { RadioInput } from '@covid/components/inputs/RadioInput';
import { FieldWrapper } from '@covid/components/Screen';
import YesNoField from '@covid/components/YesNoField';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { cleanIntegerVal } from '@covid/utils/number';
import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export interface INHSTestMechanismData {
  mechanism: string;
  storedInFridge: string;
  daysInFridge: string;
}

interface IProps {
  formikProps: FormikProps<INHSTestMechanismData>;
  test?: CovidTest;
}

export interface INHSTestMechanismQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const NHSTestMechanismQuestion: INHSTestMechanismQuestion<IProps, INHSTestMechanismData> = (props: IProps) => {
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
      <RadioInput
        error={formikProps.touched.mechanism && formikProps.errors.mechanism}
        items={mechanismItems}
        label={i18n.t('nhs-test-detail.mechanism-label')}
        onValueChange={formikProps.handleChange('mechanism')}
        selectedValue={formikProps.values.mechanism}
      />

      {formikProps.values.mechanism === CovidTestMechanismOptions.SPIT_TUBE && (
        <>
          <YesNoField
            error={formikProps.touched.storedInFridge && formikProps.errors.storedInFridge}
            label={i18n.t('nhs-test-detail.fridge-label')}
            onValueChange={formikProps.handleChange('storedInFridge')}
            selectedValue={formikProps.values.storedInFridge}
          />

          {formikProps.values.storedInFridge === 'yes' && (
            <FieldWrapper>
              <RadioInput
                items={dayInFridgeItems}
                label={i18n.t('nhs-test-detail.days-label')}
                onValueChange={formikProps.handleChange('daysInFridge')}
                selectedValue={formikProps.values.daysInFridge}
              />
            </FieldWrapper>
          )}
        </>
      )}
    </>
  );
};

NHSTestMechanismQuestion.initialFormValues = (test?: CovidTest): INHSTestMechanismData => {
  let mechanism = '';

  if (test?.id) {
    if (Object.values(CovidTestMechanismOptions).includes(test.mechanism as CovidTestMechanismOptions)) {
      mechanism = test.mechanism;
    }
  }

  if (test?.id) {
    if (test.days_in_fridge) {
      return {
        daysInFridge: test.days_in_fridge.toString(),
        mechanism,
        storedInFridge: 'yes',
      };
    }
    return {
      daysInFridge: '',
      mechanism,
      storedInFridge: 'no',
    };
  }
  return {
    daysInFridge: '',
    mechanism,
    storedInFridge: '',
  };
};

NHSTestMechanismQuestion.schema = () => {
  return Yup.object().shape({
    daysInFridge: Yup.string().when('storedInFridge', {
      is: (storedInFridge) => {
        return storedInFridge === 'yes';
      },
      then: Yup.string().required(i18n.t('nhs-test-detail.days-required')),
    }),
    mechanism: Yup.string().required(i18n.t('nhs-test-detail.mechanism-required')),
    storedInFridge: Yup.string().when('mechanism', {
      is: (mechanism) => {
        return mechanism === CovidTestMechanismOptions.SPIT_TUBE;
      },
      then: Yup.string().required(i18n.t('nhs-test-detail.days-required')),
    }),
  });
};

NHSTestMechanismQuestion.createDTO = (formData: INHSTestMechanismData): Partial<CovidTest> => {
  return {
    mechanism: formData.mechanism,
    ...(formData.storedInFridge === 'yes' && { days_in_fridge: cleanIntegerVal(formData.daysInFridge) }),
    ...(formData.storedInFridge === 'no' && { days_in_fridge: null }),
  };
};
