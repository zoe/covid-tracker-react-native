import { RadioInput } from '@covid/components/inputs/RadioInput';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export interface IBloodGroupData {
  bloodGroup: string;
}

interface IProps {
  formikProps: FormikProps<IBloodGroupData>;
}

enum EBloodGroupQuestionFields {
  TYPE_A = 'a',
  TYPE_B = 'b',
  TYPE_AB = 'ab',
  TYPE_O = 'o',
  DONT_KNOW = 'unsure',
  PFNTS = 'pfnts',
}

export function BloodGroupQuestion({ formikProps }: IProps) {
  const bloodTypeItems = [
    { label: i18n.t('blood-group.answers.type-a'), value: EBloodGroupQuestionFields.TYPE_A },
    { label: i18n.t('blood-group.answers.type-b'), value: EBloodGroupQuestionFields.TYPE_B },
    { label: i18n.t('blood-group.answers.type-ab'), value: EBloodGroupQuestionFields.TYPE_AB },
    { label: i18n.t('blood-group.answers.type-o'), value: EBloodGroupQuestionFields.TYPE_O },
    { label: i18n.t('blood-group.answers.dont-know'), value: EBloodGroupQuestionFields.DONT_KNOW },
    { label: i18n.t('blood-group.answers.pfnts'), value: EBloodGroupQuestionFields.PFNTS },
  ];

  return (
    <RadioInput
      required
      items={bloodTypeItems}
      label={i18n.t('blood-group.question')}
      onValueChange={formikProps.handleChange('bloodGroup')}
      selectedValue={formikProps.values.bloodGroup}
      testID="input-blood-group"
    />
  );
}

BloodGroupQuestion.getInitialFormValues = (): IBloodGroupData => {
  return {
    bloodGroup: '',
  };
};

BloodGroupQuestion.createValidationSchema = () => {
  return Yup.object().shape({
    bloodGroup: Yup.string().required(),
  });
};

BloodGroupQuestion.createDTO = (data: IBloodGroupData): Partial<TPatientInfosRequest> => {
  return {
    blood_group: data.bloodGroup,
  };
};
