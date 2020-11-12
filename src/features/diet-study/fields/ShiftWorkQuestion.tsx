import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FieldLabel } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import YesNoField from '@covid/components/YesNoField';

export interface ShiftWorkData {
  shiftWork: string;
}

interface Props {
  formikProps: FormikProps<ShiftWorkData>;
}

export interface ShiftWorkQuestion<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const ShiftWorkQuestion: ShiftWorkQuestion<Props, ShiftWorkData> = (props: Props) => {
  const { formikProps } = props;
  return (
    <FieldWrapper>
      <FieldLabel>{i18n.t('diet-study.shift-work-label')}</FieldLabel>
      <YesNoField
        selectedValue={formikProps.values.shiftWork}
        onValueChange={formikProps.handleChange('shiftWork')}
        error={formikProps.touched.shiftWork && formikProps.errors.shiftWork}
      />
    </FieldWrapper>
  );
};

ShiftWorkQuestion.initialFormValues = (): ShiftWorkData => {
  return {
    shiftWork: '',
  };
};

ShiftWorkQuestion.schema = () => {
  return Yup.object().shape({
    shiftWork: Yup.string().required(i18n.t('please-select-option')),
  });
};

ShiftWorkQuestion.createDTO = (formData: ShiftWorkData): Partial<DietStudyRequest> => {
  return {
    shift_work: formData.shiftWork === 'yes',
  } as Partial<DietStudyRequest>;
};
