import { YesNoField } from '@covid/components/inputs/YesNoField';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import { isOldVersionAntibodyInviteTest, isZoeInviteWithDualResultTest } from '@covid/features/covid-tests/helpers';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export interface ICovidTestInvitedData {
  invitedToTest: string;
  bookedViaGov: string;
}

export interface ICovidTestInvitedFormikData extends ICovidTestInvitedData {
  mechanism: ECovidTestMechanismOptions;
}

interface IProps {
  formikProps: FormikProps<ICovidTestInvitedFormikData>;
  test?: TCovidTest;
}

interface ICovidTestInvitedQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: TCovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<TCovidTest>;
}

export const CovidTestInvitedQuestion: ICovidTestInvitedQuestion<IProps, ICovidTestInvitedData> = (props: IProps) => {
  const { formikProps } = props;

  return isGBCountry() ? (
    // For existing tests already logged as invited by ZOE, with dual results, we do NOT show the booked via gov.uk question
    formikProps.values.mechanism === ECovidTestMechanismOptions.PCR ||
    (props.test && (isOldVersionAntibodyInviteTest(props.test) || isZoeInviteWithDualResultTest(props.test))) ? (
      <YesNoField
        required
        error={formikProps.touched.invitedToTest && formikProps.errors.invitedToTest}
        label={i18n.t('covid-test.question-invite-to-test')}
        onValueChange={formikProps.handleChange('invitedToTest')}
        selectedValue={formikProps.values.invitedToTest}
        testID="covid-test-invited-question"
      />
    ) : (
      <YesNoField
        required
        error={formikProps.touched.bookedViaGov && formikProps.errors.bookedViaGov}
        label={i18n.t('covid-test.question-booked-via-gov')}
        onValueChange={formikProps.handleChange('bookedViaGov')}
        selectedValue={formikProps.values.bookedViaGov}
        testID="covid-test-booked-via-gov-question"
      />
    )
  ) : (
    <></>
  );
};

CovidTestInvitedQuestion.initialFormValues = (test?: TCovidTest): ICovidTestInvitedData => {
  function getInvitedToTest() {
    if (test?.id) {
      if (test.invited_to_test === null) {
        return '';
      }
      return test.invited_to_test ? 'yes' : 'no';
    }
    return '';
  }

  function getBookedViaGov() {
    if (test?.id) {
      if (test.booked_via_gov === null) {
        return '';
      }
      return test.booked_via_gov ? 'yes' : 'no';
    }
    return '';
  }

  return {
    bookedViaGov: getBookedViaGov(),
    invitedToTest: getInvitedToTest(),
  };
};

CovidTestInvitedQuestion.schema = () => {
  return isGBCountry()
    ? Yup.object().shape({
        bookedViaGov: Yup.string().when(['mechanism', 'invitedToTest'], {
          is: (mechanism, invitedToTest) => {
            return mechanism === ECovidTestMechanismOptions.BLOOD_FINGER_PRICK && !invitedToTest;
          },
          then: Yup.string().required(i18n.t('please-select-option')),
        }),
        invitedToTest: Yup.string().when('mechanism', {
          is: (mechanism) => {
            return mechanism === ECovidTestMechanismOptions.PCR;
          },
          then: Yup.string().required(i18n.t('please-select-option')),
        }),
      })
    : Yup.object().shape({});
};

CovidTestInvitedQuestion.createDTO = (formData: ICovidTestInvitedData): Partial<TCovidTest> => {
  return {
    ...(isGBCountry() && formData.invitedToTest && { invited_to_test: formData.invitedToTest === 'yes' }),
    ...(isGBCountry() && formData.bookedViaGov && { booked_via_gov: formData.bookedViaGov === 'yes' }),
  } as Partial<TCovidTest>;
};
