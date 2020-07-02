import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import DropdownField from '@covid/components/DropdownField';
import { LifestyleRequest } from '@covid/core/assessment/dto/LifestyleRequest';
import { GenericTextField } from '@covid/components/GenericTextField';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { fingerPrick, noseSwab, otherTest, spit, syringe } from '@assets';
import { CovidTestMechanismOptions, CovidTestTrainedWorkerOptions } from '@covid/core/user/dto/UserAPIContracts';

export interface CovidTestMechanismData {
  mechanism: string;
  mechanismSpecify: string;
  trainedWorker: string;
}

interface Props {
  formikProps: FormikProps<CovidTestMechanismData>;
  test?: CovidTest;
}

export interface CovidTestMechanismQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<LifestyleRequest>;
}

export const CovidTestMechanismQuestion: CovidTestMechanismQuestion<Props, CovidTestMechanismData> = (props: Props) => {
  const { formikProps, test } = props;

  const mechanismItems = [
    { label: i18n.t('covid-test.picker-nose-throat-swab'), value: CovidTestMechanismOptions.NOSE_OR_THROAT_SWAB },
    ...(test?.mechanism === CovidTestMechanismOptions.NOSE_SWAB
      ? [{ label: i18n.t('covid-test.picker-nose-swab'), value: CovidTestMechanismOptions.NOSE_SWAB }]
      : []),
    ...(test?.mechanism === CovidTestMechanismOptions.THROAT_SWAB
      ? [{ label: i18n.t('covid-test.picker-throat-swab'), value: CovidTestMechanismOptions.THROAT_SWAB }]
      : []),
    { label: i18n.t('covid-test.picker-saliva-sample'), value: CovidTestMechanismOptions.SPIT_TUBE },
    ...(test?.mechanism === 'blood_sample'
      ? [{ label: i18n.t('covid-test.picker-blood-sample'), value: CovidTestMechanismOptions.BLOOD_SAMPLE }]
      : []),
    { label: i18n.t('covid-test.picker-finger-prick'), value: CovidTestMechanismOptions.BLOOD_FINGER_PRICK },
    { label: i18n.t('covid-test.picker-blood-draw'), value: CovidTestMechanismOptions.BLOOD_NEEDLE_DRAW },
    { label: i18n.t('covid-test.picker-other'), value: CovidTestMechanismOptions.OTHER },
  ];

  const trainedWorkerItems = [
    { label: i18n.t('picker-yes'), value: CovidTestTrainedWorkerOptions.TRAINED },
    { label: i18n.t('picker-no'), value: CovidTestTrainedWorkerOptions.UNTRAINED },
    { label: i18n.t('picker-unsure'), value: CovidTestTrainedWorkerOptions.UNSURE },
  ];

  const noIcons: string[] = [
    CovidTestMechanismOptions.NOSE_SWAB,
    CovidTestMechanismOptions.THROAT_SWAB,
    CovidTestMechanismOptions.BLOOD_SAMPLE,
  ];
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

CovidTestMechanismQuestion.initialFormValues = (test?: CovidTest): CovidTestMechanismData => {
  let mechanism = '';
  let mechanismSpecify = '';

  if (test?.id) {
    if (Object.values(CovidTestMechanismOptions).includes(test.mechanism as CovidTestMechanismOptions)) {
      mechanism = test.mechanism;
    } else {
      mechanism = 'other';
      mechanismSpecify = test.mechanism;
    }
  }

  return {
    mechanism,
    mechanismSpecify,
    trainedWorker: test?.trained_worker ? test.trained_worker : '',
  };
};

CovidTestMechanismQuestion.schema = () => {
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
        return mechanism === CovidTestMechanismOptions.NOSE_OR_THROAT_SWAB;
      },
      then: Yup.string().required(i18n.t('please-select-option')),
    }),
  });
};

CovidTestMechanismQuestion.createDTO = (formData: CovidTestMechanismData): Partial<CovidTest> => {
  return {
    ...(formData.mechanism === 'other' && { mechanism: formData.mechanismSpecify }),
    ...(formData.mechanism !== 'other' && { mechanism: formData.mechanism }),
    ...(formData.mechanism === 'nose_throat_swab' && { trained_worker: formData.trainedWorker }),
  } as Partial<CovidTest>;
};
