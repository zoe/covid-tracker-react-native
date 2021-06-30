import YesNoField from '@covid/components/YesNoField';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export interface ICovidTestInvitedData {
  invitedToTest: string;
}

interface IProps {
  formikProps: FormikProps<ICovidTestInvitedData>;
  test?: CovidTest;
}

export interface ICovidTestInvitedQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestInvitedQuestion: ICovidTestInvitedQuestion<IProps, ICovidTestInvitedData> = (props: IProps) => {
  const { formikProps } = props;
  return isGBCountry() ? (
    <YesNoField
      required
      error={formikProps.touched.invitedToTest && formikProps.errors.invitedToTest}
      label={i18n.t('covid-test.question-invite-to-test')}
      onValueChange={formikProps.handleChange('invitedToTest')}
      selectedValue={formikProps.values.invitedToTest}
      testID="covid-test-invited-question"
    />
  ) : (
    <></>
  );
};

CovidTestInvitedQuestion.initialFormValues = (test?: CovidTest): ICovidTestInvitedData => {
  function getInvitedToTest(test?: CovidTest) {
    if (test?.id) {
      if (test.invited_to_test === null) {
        return '';
      }
      return test.invited_to_test ? 'yes' : 'no';
    }
    return '';
  }

  return {
    invitedToTest: getInvitedToTest(test),
  };
};

CovidTestInvitedQuestion.schema = () => {
  return isGBCountry()
    ? Yup.object().shape({
        invitedToTest: Yup.string().required(i18n.t('please-select-option')),
      })
    : Yup.object().shape({});
};

CovidTestInvitedQuestion.createDTO = (formData: ICovidTestInvitedData): Partial<CovidTest> => {
  return {
    ...(isGBCountry() && formData.invitedToTest && { invited_to_test: formData.invitedToTest === 'yes' }),
  } as Partial<CovidTest>;
};
