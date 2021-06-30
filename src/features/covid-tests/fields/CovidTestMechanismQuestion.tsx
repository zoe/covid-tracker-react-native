import { fingerPrickX3, noseSwabX3, otherTestX3, spitX3, syringeX3 } from '@assets';
import { GenericTextField } from '@covid/components/GenericTextField';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestMechanismOptions, CovidTestTrainedWorkerOptions } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export interface ICovidTestMechanismData {
  mechanism: string;
  mechanismSpecify: string;
  trainedWorker: string;
}

interface IProps {
  formikProps: FormikProps<ICovidTestMechanismData>;
  test?: CovidTest;
}

export interface ICovidTestMechanismQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestMechanismQuestion: ICovidTestMechanismQuestion<IProps, ICovidTestMechanismData> = (
  props: IProps,
) => {
  const { formikProps, test } = props;

  const noIcons: string[] = [
    CovidTestMechanismOptions.NOSE_SWAB,
    CovidTestMechanismOptions.THROAT_SWAB,
    CovidTestMechanismOptions.BLOOD_SAMPLE,
  ];
  const showMechanismIcons = (!test || (test && !noIcons.includes(test.mechanism))) && !isSECountry();

  const mechanismItems = [
    {
      iconSource: showMechanismIcons ? noseSwabX3 : undefined,
      label: i18n.t('covid-test.picker-nose-throat-swab'),
      value: CovidTestMechanismOptions.NOSE_OR_THROAT_SWAB,
    },
    ...(test?.mechanism === CovidTestMechanismOptions.NOSE_SWAB
      ? [{ label: i18n.t('covid-test.picker-nose-swab'), value: CovidTestMechanismOptions.NOSE_SWAB }]
      : []),
    ...(test?.mechanism === CovidTestMechanismOptions.THROAT_SWAB
      ? [{ label: i18n.t('covid-test.picker-throat-swab'), value: CovidTestMechanismOptions.THROAT_SWAB }]
      : []),
    ...(isSECountry()
      ? [
          {
            label: i18n.t('covid-test.picker-nose-throat-swab-and-saliva'),
            value: CovidTestMechanismOptions.NOSE_OR_THROAT_SWAB_AND_SALIVA,
          },
        ]
      : []),
    {
      iconSource: showMechanismIcons ? spitX3 : undefined,
      label: i18n.t('covid-test.picker-saliva-sample'),
      value: CovidTestMechanismOptions.SPIT_TUBE,
    },
    ...(test?.mechanism === 'blood_sample'
      ? [{ label: i18n.t('covid-test.picker-blood-sample'), value: CovidTestMechanismOptions.BLOOD_SAMPLE }]
      : []),
    {
      iconSource: showMechanismIcons ? fingerPrickX3 : undefined,
      label: i18n.t('covid-test.picker-finger-prick'),
      value: CovidTestMechanismOptions.BLOOD_FINGER_PRICK,
    },
    {
      iconSource: showMechanismIcons ? syringeX3 : undefined,
      label: i18n.t('covid-test.picker-blood-draw'),
      value: CovidTestMechanismOptions.BLOOD_NEEDLE_DRAW,
    },
    {
      iconSource: showMechanismIcons ? otherTestX3 : undefined,
      label: i18n.t('covid-test.picker-other'),
      value: CovidTestMechanismOptions.OTHER,
    },
  ];

  const trainedWorkerItems = [
    { label: i18n.t('picker-yes'), value: CovidTestTrainedWorkerOptions.TRAINED },
    { label: i18n.t('picker-no'), value: CovidTestTrainedWorkerOptions.UNTRAINED },
    { label: i18n.t('picker-unsure'), value: CovidTestTrainedWorkerOptions.UNSURE },
  ];

  return (
    <>
      <RadioInput
        required
        error={formikProps.touched.mechanism ? formikProps.errors.mechanism : ''}
        items={mechanismItems}
        label={i18n.t('covid-test.question-mechanism')}
        onValueChange={formikProps.handleChange('mechanism')}
        selectedValue={formikProps.values.mechanism}
        testID="covid-test-mechanism-question"
      />

      {formikProps.values.mechanism === 'other' && (
        <GenericTextField
          required
          formikProps={formikProps}
          label={i18n.t('covid-test.question-mechanism-specify')}
          name="mechanismSpecify"
        />
      )}

      {formikProps.values.mechanism === 'nose_throat_swab' && (
        <RadioInput
          required
          error={formikProps.touched.trainedWorker ? formikProps.errors.trainedWorker : ''}
          items={trainedWorkerItems}
          label={i18n.t('covid-test.question-trained-worker')}
          onValueChange={formikProps.handleChange('trainedWorker')}
          selectedValue={formikProps.values.trainedWorker}
        />
      )}
    </>
  );
};

CovidTestMechanismQuestion.initialFormValues = (test?: CovidTest): ICovidTestMechanismData => {
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

CovidTestMechanismQuestion.createDTO = (formData: ICovidTestMechanismData): Partial<CovidTest> => {
  return {
    ...(formData.mechanism === 'other' && { mechanism: formData.mechanismSpecify }),
    ...(formData.mechanism !== 'other' && { mechanism: formData.mechanism }),
    ...(formData.mechanism === 'nose_throat_swab' && { trained_worker: formData.trainedWorker }),
  };
};
