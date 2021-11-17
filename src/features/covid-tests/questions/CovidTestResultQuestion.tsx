import { RadioInput } from '@covid/components/inputs/RadioInput';
import { RegularTextWithBoldInserts } from '@covid/components/Text';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import { isPostDHSCRevisedVersion, showDualAntibodyTestUI } from '@covid/features/covid-tests/helpers';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export interface ICovidTestResultData {
  result: string;
  dualAntibodyResult: string;
  version: string | null;
}

export interface ICovidTestResultFormikData extends ICovidTestResultData {
  bookedViaGov?: string;
  invitedToTest?: string;
  mechanism?: ECovidTestMechanismOptions;
  antibody?: string;
}

interface IProps {
  formikProps: FormikProps<ICovidTestResultFormikData>;
  test?: TCovidTest;
}

interface ICovidTestResultQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: TCovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<TCovidTest>;
}

export const CovidTestResultQuestion: ICovidTestResultQuestion<IProps, ICovidTestResultFormikData> = (
  props: IProps,
) => {
  const { formikProps } = props;

  const resultItems = [
    { label: i18n.t('covid-test.picker-negative'), value: 'negative' },
    { label: i18n.t('covid-test.picker-positive'), value: 'positive' },
    { label: i18n.t('covid-test.picker-waiting'), value: 'waiting' },
    { label: i18n.t('covid-test.picker-test-failed'), value: 'failed' },
  ];

  const dualAntibodyResultItems = [
    { label: i18n.t('covid-test.picker-negative'), value: 'negative' },
    { label: i18n.t('covid-test.picker-waiting'), value: 'waiting' },
    { label: i18n.t('covid-test.picker-test-failed'), value: 'failed' },
    {
      label: <RegularTextWithBoldInserts text={i18n.t('covid-test.picker-test-positive-infection-and-vaccine')} />,
      value: 'positive-infection-and-vaccine',
    },
    {
      label: <RegularTextWithBoldInserts text={i18n.t('covid-test.picker-test-positive-infection-or-vaccine')} />,
      value: 'positive-infection-or-vaccine',
    },
    {
      label: <RegularTextWithBoldInserts text={i18n.t('covid-test.picker-test-positive-infection-only')} />,
      value: 'positive-infection-only',
    },
  ];

  const showDualAntibodyResultsOptions = (): boolean => {
    if (props.test) {
      return (
        isPostDHSCRevisedVersion(props.test.version) &&
        showDualAntibodyTestUI(
          formikProps.values.mechanism,
          formikProps.values.invitedToTest,
          formikProps.values.bookedViaGov,
        )
      );
    }
    return showDualAntibodyTestUI(
      formikProps.values.mechanism,
      formikProps.values.invitedToTest,
      formikProps.values.bookedViaGov,
    );
  };

  return (
    <>
      {showDualAntibodyResultsOptions() ? (
        <RadioInput
          required
          error={formikProps.touched.dualAntibodyResult ? formikProps.errors.dualAntibodyResult : ''}
          items={dualAntibodyResultItems}
          label={i18n.t('covid-test.question-result')}
          onValueChange={formikProps.handleChange('dualAntibodyResult')}
          selectedValue={formikProps.values.dualAntibodyResult}
          testID="covid-test-dual-result-question"
        />
      ) : (
        <RadioInput
          required
          error={formikProps.touched.result ? formikProps.errors.result : ''}
          items={resultItems}
          label={i18n.t('covid-test.question-result')}
          onValueChange={formikProps.handleChange('result')}
          selectedValue={formikProps.values.result}
          testID="covid-test-result-question"
        />
      )}
    </>
  );
};

const dualAntibodyResultsMapping = (dualAntibodyResult: string) => {
  switch (dualAntibodyResult) {
    case 'positive-infection-and-vaccine':
      return { anti_n: 'positive', anti_s: 'positive', antibody_type_check: null, result: null };
    case 'positive-infection-or-vaccine':
      return { anti_n: 'negative', anti_s: 'positive', antibody_type_check: null, result: null };
    case 'positive-infection-only':
      return { anti_n: 'positive', anti_s: 'negative', antibody_type_check: null, result: null };
    case 'negative':
      return { anti_n: 'negative', anti_s: 'negative', antibody_type_check: null, result: null };
    case 'waiting':
      return { anti_n: 'waiting', anti_s: 'waiting', antibody_type_check: null, result: null };
    case 'failed':
      return { anti_n: 'failed', anti_s: 'failed', antibody_type_check: null, result: null };
    default:
      return { anti_n: '', anti_s: '' };
  }
};

const dualAntibodyResultsReverseMapping = (antiN: string | null | undefined, antiS: string | null | undefined) => {
  if (antiN === 'failed' && antiS === 'failed') {
    return 'failed';
  }
  if (antiN === 'waiting' && antiS === 'waiting') {
    return 'waiting';
  }
  if (antiN === 'negative' && antiS === 'negative') {
    return 'negative';
  }
  if (antiN === 'positive' && antiS === 'positive') {
    return 'positive-infection-and-vaccine';
  }
  if (antiN === 'negative' && antiS === 'positive') {
    return 'positive-infection-or-vaccine';
  }
  if (antiN === 'positive' && antiS === 'negative') {
    return 'positive-infection-only';
  }

  return '';
};

CovidTestResultQuestion.initialFormValues = (test?: TCovidTest): ICovidTestResultData => {
  return {
    dualAntibodyResult: dualAntibodyResultsReverseMapping(test?.anti_n, test?.anti_s),
    result: test?.result ? test.result : '',
    version: test?.version ? test.version : null,
  };
};

CovidTestResultQuestion.schema = () => {
  return Yup.object().shape(
    {
      dualAntibodyResult: Yup.string().when(['result', 'mechanism', 'invitedToTest', 'version', 'bookedViaGov'], {
        is: (result, mechanism, invitedToTest, version, bookedViaGov) => {
          return (
            (showDualAntibodyTestUI(mechanism, invitedToTest, bookedViaGov) && version
              ? isPostDHSCRevisedVersion(version)
              : false) ||
            !result ||
            result.length === 0
          );
        },
        otherwise: Yup.string(),
        then: Yup.string().required(i18n.t('covid-test.required-result')),
      }),
      result: Yup.string().when(['dualAntibodyResult', 'mechanism', 'invitedToTest', 'bookedViaGov'], {
        is: (dualAntibodyResult, mechanism, invitedToTest, bookedViaGov) =>
          !showDualAntibodyTestUI(mechanism, invitedToTest, bookedViaGov) ||
          !dualAntibodyResult ||
          dualAntibodyResult.length === 0,
        otherwise: Yup.string(),
        then: Yup.string().required(i18n.t('covid-test.required-result')),
      }),
    },
    // needed to prevent circular calculation error
    [['result', 'dualAntibodyResult']],
  );
};

CovidTestResultQuestion.createDTO = (formData: ICovidTestResultFormikData): Partial<TCovidTest> => {
  return showDualAntibodyTestUI(formData.mechanism, formData.invitedToTest, formData.bookedViaGov) &&
    (formData.version ? isPostDHSCRevisedVersion(formData.version) : true)
    ? {
        ...(!!formData.dualAntibodyResult && dualAntibodyResultsMapping(formData.dualAntibodyResult)),
      }
    : ({
        ...(!!formData.result && {
          anti_n: null,
          anti_s: null,
          antibody_type_check: formData.antibody ? formData.antibody : null,
          result: formData.result,
        }),
      } as Partial<TCovidTest>);
};
