import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FormQuestion } from '@covid/components/Inputs/FormQuestion.interface';
import ButtonsGroup from '@covid/components/Inputs/ButtonsGroup';

export interface DietChangedData {
  hasDietChanged: DietChangedOption | '';
}

export enum DietChangedOption {
  YES = 'yes',
  NO = 'NO',
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
          label: 'Not sure',
          value: DietChangedOption.NOT_SURE,
        },
      ]}
      onValueChange={(value: DietChangedOption) => {
        props.formikProps.setFieldValue('hasDietChanged', value);
      }}
      selectedValue=""
      error={props.formikProps.touched.hasDietChanged && props.formikProps.errors.hasDietChanged}
      {...props}
    />
  );
};

DietChangedQuestion.initialFormValues = (): DietChangedData => ({ hasDietChanged: '' });

DietChangedQuestion.schema = () =>
  Yup.object().shape({
    hasDietChanged: Yup.string().required(),
  });

DietChangedQuestion.createDTO = (_): Partial<DietStudyRequest> => ({});
