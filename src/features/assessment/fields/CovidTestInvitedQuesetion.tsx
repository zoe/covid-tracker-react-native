import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import YesNoField from '@covid/components/YesNoField';
import { isGBCountry } from '@covid/core/user/UserService';

export interface CovidTestInvitedData {
  invitedToTest: string;
}

interface Props {
  formikProps: FormikProps<CovidTestInvitedData>;
  test?: CovidTest;
}

export interface CovidTestInvitedQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestInvitedQuestion: CovidTestInvitedQuestion<Props, CovidTestInvitedData> = (props: Props) => {
  const { formikProps } = props;
  return isGBCountry() ? (
    <YesNoField
      selectedValue={formikProps.values.invitedToTest}
      onValueChange={formikProps.handleChange('invitedToTest')}
      error={formikProps.touched.invitedToTest && formikProps.errors.invitedToTest}
      label={i18n.t('covid-test.question-invite-to-test')}
    />
  ) : (
    <></>
  );
};

CovidTestInvitedQuestion.initialFormValues = (test?: CovidTest): CovidTestInvitedData => {
  function getInvitedToTest(test?: CovidTest) {
    if (test?.id) {
      if (test.invited_to_test === null) {
        return '';
      } else {
        return test.invited_to_test ? 'yes' : 'no';
      }
    } else {
      return '';
    }
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

CovidTestInvitedQuestion.createDTO = (formData: CovidTestInvitedData): Partial<CovidTest> => {
  return {
    ...(isGBCountry() && formData.invitedToTest && { invited_to_test: formData.invitedToTest === 'yes' }),
  } as Partial<CovidTest>;
};
