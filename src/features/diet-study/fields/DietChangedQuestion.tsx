import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FormQuestion } from '@covid/components/Inputs/FormQuestion.interface';
import ButtonsGroup from '@covid/components/Inputs/ButtonsGroup';

export interface DietChangedData {
  has_diet_changed: DietChangedOption | '';
}

export enum DietChangedOption {
  YES = 'yes',
  NO = 'no',
  NOT_SURE = 'not_sure',
}

interface Props {
  formikProps: FormikProps<DietChangedData>;
}

export const DietChangedQuestion: FormQuestion<Props, DietChangedData, CovidTest> = (props: Props) => {
  return (
    <ButtonsGroup
      label={i18n.t('diet-study.typical-diet.noticed-a-change')}
      items={[
        {
          label: i18n.t('picker-no'),
          value: DietChangedOption.NO,
        },
        {
          label: i18n.t('picker-yes'),
          value: DietChangedOption.YES,
        },
        {
          label: i18n.t('diet-study.diet-changed.not-sure'),
          value: DietChangedOption.NOT_SURE,
        },
      ]}
      onValueChange={(value: DietChangedOption) => {
        props.formikProps.setFieldValue('has_diet_changed', value);
      }}
      selectedValue=""
      error={props.formikProps.touched.has_diet_changed && props.formikProps.errors.has_diet_changed}
      {...props}
    />
  );
};

DietChangedQuestion.initialFormValues = (): DietChangedData => ({ has_diet_changed: '' });

DietChangedQuestion.schema = () =>
  Yup.object().shape({
    has_diet_changed: Yup.string().required(i18n.t('diet-study.required')),
  });

DietChangedQuestion.createDTO = (data): Partial<DietStudyRequest> => ({ has_diet_changed: data.has_diet_changed });
