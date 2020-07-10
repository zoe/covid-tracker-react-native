import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FormQuestion } from '@covid/components/Inputs/FormQuestion.interface';
import ButtonsGroup from '@covid/components/Inputs/ButtonsGroup';

export interface DietChangedData {}

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
          value: 'no',
        },
        {
          label: i18n.t('picker-yes'),
          value: 'yes',
        },
        {
          label: 'Not sure',
          value: 'not-sure',
        },
      ]}
      onValueChange={() => {}}
      selectedValue=""
      {...props}
    />
  );
};

DietChangedQuestion.initialFormValues = (): DietChangedData => ({});

DietChangedQuestion.schema = () => Yup.object().shape({});

DietChangedQuestion.createDTO = (_): Partial<DietStudyRequest> => ({});
