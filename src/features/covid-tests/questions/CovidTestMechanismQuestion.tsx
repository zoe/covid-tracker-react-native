import { fingerPrickX3, noseSwabX3, otherTestX3, syringeX3 } from '@assets';
import { RegularTextWithBoldInserts, TextareaWithCharCount } from '@covid/components';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import {
  ECovidTestAntibodyOptions,
  ECovidTestMechanismOptions,
  ECovidTestTestPerformedByOptions,
  ECovidTestTrainedWorkerOptions,
} from '@covid/core/user/dto/UserAPIContracts';
import CovidTestInfoIcon from '@covid/features/covid-tests/components/CovidTestInfoIcon';
import {
  isAntibodyTest,
  isLateralFlowTest,
  isOldVersionAntibodyInviteTest,
  isPcrTest,
  showDualAntibodyTestUI,
} from '@covid/features/covid-tests/helpers';
import { CovidTestAntibodyInfoModal } from '@covid/features/covid-tests/modals/CovidTestAntibodyInfoModal';
import { CovidTestMechanismInfoModal } from '@covid/features/covid-tests/modals/CovidTestMechanismInfoModal';
import {
  CovidTestInvitedQuestion,
  ICovidTestInvitedFormikData,
} from '@covid/features/covid-tests/questions/CovidTestInvitedQuestion';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

export interface ICovidTestMechanismData {
  mechanism: ECovidTestMechanismOptions;
  mechanismSpecify: string;
  trainedWorker: string;
  antibody: string;
  testPerformedBy: string;
}

export interface ICovidTestMechanismFormikData extends ICovidTestMechanismData {
  invitedToTest: string;
  bookedViaGov: string;
}

interface IProps {
  formikProps: FormikProps<ICovidTestMechanismFormikData>;
  test?: TCovidTest;
}

interface ICovidTestMechanismQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: TCovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<TCovidTest>;
}

export const CovidTestMechanismQuestion: ICovidTestMechanismQuestion<IProps, ICovidTestMechanismData> = (
  props: IProps,
) => {
  const { formikProps, test } = props;
  const isV1Test = test?.version[0] === '1';

  const noIcons: string[] = [
    ECovidTestMechanismOptions.NOSE_SWAB,
    ECovidTestMechanismOptions.THROAT_SWAB,
    ECovidTestMechanismOptions.BLOOD_SAMPLE,
  ];
  const showMechanismIcons = !test || (test && !noIcons.includes(test.mechanism));

  const mechanismItems = [
    {
      iconSource: showMechanismIcons ? noseSwabX3 : undefined,
      label: i18n.t('covid-test.picker-lateral'),
      value: ECovidTestMechanismOptions.LATERAL_FLOW,
    },
    {
      iconSource: showMechanismIcons ? noseSwabX3 : undefined,
      label: i18n.t('covid-test.picker-pcr'),
      value: ECovidTestMechanismOptions.PCR,
    },
    {
      iconSource: showMechanismIcons ? fingerPrickX3 : undefined,
      label: i18n.t('covid-test.picker-finger-prick'),
      value: ECovidTestMechanismOptions.BLOOD_FINGER_PRICK,
    },
    {
      iconSource: showMechanismIcons ? syringeX3 : undefined,
      label: i18n.t('covid-test.picker-blood-draw'),
      value: ECovidTestMechanismOptions.BLOOD_NEEDLE_DRAW,
    },
    {
      iconSource: showMechanismIcons ? otherTestX3 : undefined,
      label: i18n.t('covid-test.picker-other'),
      value: ECovidTestMechanismOptions.OTHER,
    },
  ];

  const trainedWorkerItems = [
    { label: i18n.t('picker-yes'), value: ECovidTestTrainedWorkerOptions.TRAINED },
    { label: i18n.t('picker-no'), value: ECovidTestTrainedWorkerOptions.UNTRAINED },
    { label: i18n.t('picker-unsure'), value: ECovidTestTrainedWorkerOptions.UNSURE },
  ];

  const testPerformedByItems = [
    {
      label: i18n.t('covid-test.picker-myself-no-guidance'),
      value: ECovidTestTestPerformedByOptions.SELF_NO_SUPERVISION,
    },
    { label: i18n.t('covid-test.picker-myself-guidance'), value: ECovidTestTestPerformedByOptions.SELF_SUPERVISION },
    { label: i18n.t('covid-test.picker-trained-worker'), value: ECovidTestTestPerformedByOptions.TRAINED },
  ];

  const antibodyItems = [
    {
      label: <RegularTextWithBoldInserts text={i18n.t('covid-test.picker-anti-n')} />,
      value: ECovidTestAntibodyOptions.ANTI_N,
    },
    {
      label: <RegularTextWithBoldInserts text={i18n.t('covid-test.picker-anti-s')} />,
      value: ECovidTestAntibodyOptions.ANTI_S,
    },
    {
      label: <RegularTextWithBoldInserts text={i18n.t('covid-test.picker-dont-know')} />,
      value: ECovidTestAntibodyOptions.DONT_KNOW,
    },
  ];

  const [showMechanismModal, setShowMechanismModal] = React.useState(false);
  const openMechanismModal = () => {
    setShowMechanismModal(true);
  };

  const [showAntibodyModal, setShowAntibodyModal] = React.useState(false);
  const openAntibodyModal = () => {
    setShowAntibodyModal(true);
  };

  return (
    <>
      <CovidTestMechanismInfoModal onRequestClose={() => setShowMechanismModal(false)} visible={showMechanismModal} />
      <CovidTestAntibodyInfoModal onRequestClose={() => setShowAntibodyModal(false)} visible={showAntibodyModal} />
      <RadioInput
        required
        error={formikProps.touched.mechanism ? formikProps.errors.mechanism : ''}
        IconComponent={CovidTestInfoIcon}
        iconOnPress={openMechanismModal}
        items={mechanismItems}
        label={i18n.t('covid-test.question-mechanism')}
        onValueChange={formikProps.handleChange('mechanism')}
        selectedValue={formikProps.values.mechanism}
        testID="covid-test-mechanism-question"
      />

      {formikProps.values.mechanism === 'other' && (
        <TextareaWithCharCount
          bordered
          onChangeText={formikProps.handleChange('mechanismSpecify')}
          placeholder={i18n.t('covid-test.question-mechanism-specify')}
          rowSpan={4}
          textAreaStyle={{ backgroundColor: colors.backgroundTertiary, borderRadius: sizes.xs }}
          value={formikProps.values.mechanismSpecify}
        />
      )}

      {test !== undefined &&
      !!test?.trained_worker &&
      isV1Test &&
      !isPcrTest(test.mechanism as ECovidTestMechanismOptions, test.is_rapid_test) ? (
        <RadioInput
          required
          error={formikProps.touched.trainedWorker ? formikProps.errors.trainedWorker : ''}
          items={trainedWorkerItems}
          label={i18n.t('covid-test.question-trained-worker')}
          onValueChange={formikProps.handleChange('trainedWorker')}
          selectedValue={formikProps.values.trainedWorker}
        />
      ) : null}

      {formikProps.values.mechanism === 'pcr' && (
        <RadioInput
          required
          error={formikProps.touched.testPerformedBy ? formikProps.errors.testPerformedBy : ''}
          items={testPerformedByItems}
          label={i18n.t('covid-test.question-test-performed-by')}
          onValueChange={formikProps.handleChange('testPerformedBy')}
          selectedValue={formikProps.values.testPerformedBy}
          testID="covid-test-performed-by-question"
        />
      )}

      {formikProps.values.mechanism === ECovidTestMechanismOptions.BLOOD_FINGER_PRICK ? (
        <View style={{ marginBottom: sizes.xs }}>
          <CovidTestInvitedQuestion
            formikProps={formikProps as unknown as FormikProps<ICovidTestInvitedFormikData>}
            test={test}
          />
        </View>
      ) : null}

      {(formikProps.values.mechanism === ECovidTestMechanismOptions.BLOOD_FINGER_PRICK &&
        (isGBCountry()
          ? formikProps.values.invitedToTest === 'no' || formikProps.values.bookedViaGov === 'no'
          : true)) ||
      formikProps.values.mechanism === ECovidTestMechanismOptions.BLOOD_NEEDLE_DRAW ||
      (props.test && isOldVersionAntibodyInviteTest(props.test)) ? (
        <RadioInput
          required
          error={formikProps.touched.antibody ? formikProps.errors.antibody : ''}
          IconComponent={CovidTestInfoIcon}
          iconOnPress={openAntibodyModal}
          items={antibodyItems}
          label={i18n.t('covid-test.question-antibody')}
          onValueChange={formikProps.handleChange('antibody')}
          selectedValue={formikProps.values.antibody}
          testID="covid-test-antibody-question"
        />
      ) : null}
    </>
  );
};

CovidTestMechanismQuestion.initialFormValues = (test?: TCovidTest): ICovidTestMechanismData => {
  let mechanism = '' as ECovidTestMechanismOptions;
  let mechanismSpecify = '';

  if (test?.id) {
    if (isLateralFlowTest(test.mechanism as ECovidTestMechanismOptions, test.is_rapid_test)) {
      mechanism = ECovidTestMechanismOptions.LATERAL_FLOW;
    } else if (isPcrTest(test.mechanism as ECovidTestMechanismOptions, test.is_rapid_test)) {
      mechanism = ECovidTestMechanismOptions.PCR;
    } else if (test.mechanism === ECovidTestMechanismOptions.BLOOD_SAMPLE) {
      mechanism = ECovidTestMechanismOptions.BLOOD_FINGER_PRICK;
    } else if (Object.values(ECovidTestMechanismOptions).includes(test.mechanism as ECovidTestMechanismOptions)) {
      mechanism = test.mechanism;
    } else {
      mechanism = 'other' as ECovidTestMechanismOptions;
      mechanismSpecify = test.mechanism;
    }
  }

  return {
    antibody: test?.antibody_type_check ? test.antibody_type_check : '',
    mechanism,
    mechanismSpecify,
    testPerformedBy: test?.test_performed_by ? test.test_performed_by : '',
    trainedWorker: test?.trained_worker ? test.trained_worker : '',
  };
};

CovidTestMechanismQuestion.schema = () => {
  return Yup.object().shape({
    antibody: Yup.string().when(['mechanism', 'dualAntibodyResult', 'invitedToTest', 'bookedViaGov'], {
      is: (mechanism, dualAntibodyResult, invitedToTest, bookedViaGov) => {
        return (
          isAntibodyTest(mechanism) &&
          (!showDualAntibodyTestUI(mechanism, invitedToTest, bookedViaGov) ||
            !dualAntibodyResult ||
            dualAntibodyResult.length === 0)
        );
      },
      then: Yup.string().required(i18n.t('please-select-option')),
    }),
    mechanism: Yup.string().when('mechanismSpecify', {
      is: (mechanismSpecify) => {
        return !mechanismSpecify;
      },
      then: Yup.string().required(i18n.t('covid-test.required-mechanism')),
    }),
    mechanismSpecify: Yup.string(),
    testPerformedBy: Yup.string().when('mechanism', {
      is: (mechanism) => {
        return mechanism === ECovidTestMechanismOptions.PCR;
      },
      then: Yup.string().required(i18n.t('please-select-option')),
    }),
  });
};

CovidTestMechanismQuestion.createDTO = (formData: ICovidTestMechanismData): Partial<TCovidTest> => {
  return {
    ...(formData.mechanism === 'other' && { mechanism: formData.mechanismSpecify as ECovidTestMechanismOptions }),
    ...(formData.mechanism !== 'other' && { mechanism: formData.mechanism }),
    ...(formData.mechanism === 'lateral_flow' && {
      is_rapid_test: true,
      mechanism: ECovidTestMechanismOptions.NOSE_OR_THROAT_SWAB,
    }),
    ...(formData.mechanism === 'pcr' && {
      is_rapid_test: false,
      mechanism: ECovidTestMechanismOptions.NOSE_OR_THROAT_SWAB,
      test_performed_by: formData.testPerformedBy,
    }),
    ...(isAntibodyTest(formData.mechanism as ECovidTestMechanismOptions) && { antibody_type_check: formData.antibody }),
  };
};
