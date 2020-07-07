import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { CheckboxItem } from '@covid/components/Checkbox';

export interface ExtraWeightData {
  weightUnsure: boolean;
  wasPregnant: boolean;
}

interface Props {
  formikProps: FormikProps<ExtraWeightData>;
}

export interface CovidTestInvitedQuestion<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const ExtraWeightQuestions: CovidTestInvitedQuestion<Props, ExtraWeightData> = (props: Props) => {
  const { formikProps } = props;
  return (
    <>
      <CheckboxItem
        value={formikProps.values.weightUnsure}
        onChange={(value) => {
          formikProps.values.weightUnsure = value;
        }}>
        {i18n.t('diet-study.weight-unsure-label')}
      </CheckboxItem>

      <CheckboxItem
        value={formikProps.values.wasPregnant}
        onChange={(value) => {
          formikProps.values.wasPregnant = value;
        }}>
        {i18n.t('diet-study.was-pregnant-label')}
      </CheckboxItem>
    </>
  );
};

ExtraWeightQuestions.initialFormValues = (): ExtraWeightData => {
  return {
    weightUnsure: false,
    wasPregnant: false,
  };
};

ExtraWeightQuestions.schema = () => {
  return Yup.object().shape({
    weightUnsure: Yup.boolean().required(),
    wasPregnant: Yup.boolean().required(),
  });
};

ExtraWeightQuestions.createDTO = (formData: ExtraWeightData): Partial<DietStudyRequest> => {
  return {
    weight_unsure: formData.weightUnsure,
    was_pregnant: formData.wasPregnant,
  } as Partial<DietStudyRequest>;
};
