import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import DropdownField from '@covid/components/DropdownField';
import i18n from '@covid/locale/i18n';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

export interface BloodGroupData {
  bloodGroup: string;
}

interface Props {
  formikProps: FormikProps<BloodGroupData>;
}

enum BloodGroupQuestionFields {
  TYPE_A = 'a',
  TYPE_B = 'b',
  TYPE_AB = 'ab',
  TYPE_O = 'o',
  DONT_KNOW = 'unsure',
  PFNTS = 'pfnts',
}

export const BloodGroupQuestion = ({ formikProps }: Props) => {
  const bloodTypeItems = [
    { label: i18n.t('blood-group.answers.type-a'), value: BloodGroupQuestionFields.TYPE_A },
    { label: i18n.t('blood-group.answers.type-b'), value: BloodGroupQuestionFields.TYPE_B },
    { label: i18n.t('blood-group.answers.type-ab'), value: BloodGroupQuestionFields.TYPE_AB },
    { label: i18n.t('blood-group.answers.type-o'), value: BloodGroupQuestionFields.TYPE_O },
    { label: i18n.t('blood-group.answers.dont-know'), value: BloodGroupQuestionFields.DONT_KNOW },
    { label: i18n.t('blood-group.answers.pfnts'), value: BloodGroupQuestionFields.PFNTS },
  ];

  return (
    <DropdownField
      selectedValue={formikProps.values.bloodGroup}
      onValueChange={formikProps.handleChange('bloodGroup')}
      label={i18n.t('blood-group.question')}
      items={bloodTypeItems}
    />
  );
};

BloodGroupQuestion.initialFormValues = (): BloodGroupData => {
  return {
    bloodGroup: '',
  };
};

BloodGroupQuestion.schema = () => {
  return Yup.object().shape({
    bloodGroup: Yup.string().required(),
  });
};

BloodGroupQuestion.createDTO = (data: BloodGroupData): Partial<PatientInfosRequest> => {
  return {
    blood_group: data.bloodGroup,
  };
};
