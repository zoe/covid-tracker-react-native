import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { ImageSourcePropType } from 'react-native';

import i18n from '@covid/locale/i18n';
import { FieldWrapper } from '@covid/components/Screen';
import DropdownField from '@covid/components/DropdownField';
import { LifestyleRequest } from '@covid/core/assessment/dto/LifestyleRequest';
import { GenericTextField } from '@covid/components/GenericTextField';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { fingerPrick, noseSwab, otherTest, spit, syringe } from '@assets';

export interface CovidTestMechanismData {
  mechanism: string;
  mechanismSpecify: string;
  trainedWorker: string;
}

interface Props {
  formikProps: FormikProps<CovidTestMechanismData>;
  test?: CovidTest;
}

export interface CovidTestMechanismQuestionV1<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<LifestyleRequest>;
}

export const CovidTestMechanismQuestionV1: CovidTestMechanismQuestionV1<Props, CovidTestMechanismData> = (
  props: Props
) => {
  const { formikProps, test } = props;

  const mechanismItems = [
    { label: i18n.t('covid-test.picker-nose-throat-swab'), value: 'nose_throat_swab' },
    ...(test?.mechanism === 'nose_swab' ? [{ label: i18n.t('covid-test.picker-nose-swab'), value: 'nose_swab' }] : []),
    ...(test?.mechanism === 'throat_swab'
      ? [{ label: i18n.t('covid-test.picker-throat-swab'), value: 'throat_swab' }]
      : []),
    { label: i18n.t('covid-test.picker-saliva-sample'), value: 'spit_tube' },
    ...(test?.mechanism === 'blood_sample'
      ? [{ label: i18n.t('covid-test.picker-blood-sample'), value: 'blood_sample' }]
      : []),
    { label: i18n.t('covid-test.picker-finger-prick'), value: 'blood_sample_finger_prick' },
    { label: i18n.t('covid-test.picker-blood-draw'), value: 'blood_sample_needle_draw' },
    { label: i18n.t('covid-test.picker-other'), value: 'other' },
  ];

  const trainedWorkerItems = [
    { label: i18n.t('picker-yes'), value: 'trained' },
    { label: i18n.t('picker-no'), value: 'untrained' },
    { label: i18n.t('picker-unsure'), value: 'unsure' },
  ];

  const noIcons = ['nose_swab', 'throat_swab', 'blood_sample'];
  let mechanismItemIcons = undefined;
  if (!test || (test && !noIcons.includes(test.mechanism))) {
    mechanismItemIcons = [noseSwab, spit, fingerPrick, syringe, otherTest];
  }

  return (
    <>
      <DropdownField
        selectedValue={formikProps.values.mechanism}
        onValueChange={formikProps.handleChange('mechanism')}
        label={i18n.t('covid-test.question-mechanism')}
        error={formikProps.touched.mechanism && formikProps.errors.mechanism}
        items={mechanismItems}
        itemIcons={mechanismItemIcons}
      />

      {formikProps.values.mechanism === 'other' && (
        <GenericTextField
          formikProps={formikProps}
          label={i18n.t('covid-test.question-mechanism-specify')}
          name="mechanismSpecify"
        />
      )}

      {formikProps.values.mechanism === 'nose_throat_swab' && (
        <DropdownField
          selectedValue={formikProps.values.trainedWorker}
          onValueChange={formikProps.handleChange('trainedWorker')}
          label={i18n.t('covid-test.question-trained-worker')}
          error={formikProps.touched.trainedWorker && formikProps.errors.trainedWorker}
          items={trainedWorkerItems}
        />
      )}
    </>
  );
};

CovidTestMechanismQuestionV1.initialFormValues = (test?: CovidTest): CovidTestMechanismData => {
  return {
    mechanism: test?.mechanism ? test.mechanism : '',
    mechanismSpecify: '',
    trainedWorker: test?.trained_worker ? test.trained_worker : '',
  };
};

CovidTestMechanismQuestionV1.schema = () => {
  return Yup.object().shape({
    mechanism: Yup.string().when('mechanismSpecify', {
      is: (mechanismSpecify) => {
        return !mechanismSpecify;
      },
      then: Yup.string().required(i18n.t('covid-test.required-mechanism')),
    }),
    mechanismSpecify: Yup.string(),
    trainedWorker: Yup.string().when('mechanism', {
      is: (mechanism) => {
        return mechanism === 'nose_throat_swab';
      },
      then: Yup.string().required(i18n.t('please-select-option')),
    }),
  });
};

CovidTestMechanismQuestionV1.createDTO = (formData: CovidTestMechanismData): Partial<CovidTest> => {
  return {
    ...(formData.mechanism === 'other' && { mechanism: formData.mechanismSpecify }),
    ...(formData.mechanism !== 'other' && { mechanism: formData.mechanism }),
    ...(formData.mechanism === 'nose_throat_swab' && { trained_worker: formData.trainedWorker }),
  } as Partial<CovidTest>;
};
