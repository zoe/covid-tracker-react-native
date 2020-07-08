import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { cleanIntegerVal } from '@covid/utils/number';
import { FieldLabel } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';

export interface HoursSleepData {
  hoursSleep: string;
}

interface Props {
  formikProps: FormikProps<HoursSleepData>;
}

export interface HoursSleepQuestion<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const HoursSleepQuestion: HoursSleepQuestion<Props, HoursSleepData> = (props: Props) => {
  const { formikProps } = props;
  return (
    <>
      <FieldLabel>{i18n.t('diet-study.hours-of-sleep-label')}</FieldLabel>
      <FieldWrapper style={{ padding: 16 }}>
        <ValidatedTextInput
          placeholder=""
          value={formikProps.values.hoursSleep}
          onChangeText={formikProps.handleChange('hoursSleep')}
          onBlur={formikProps.handleBlur('hoursSleep')}
          error={formikProps.touched.hoursSleep && formikProps.errors.hoursSleep}
          returnKeyType="next"
          onSubmitEditing={() => {}}
          keyboardType="numeric"
        />
      </FieldWrapper>
    </>
  );
};

HoursSleepQuestion.initialFormValues = (): HoursSleepData => {
  return {
    hoursSleep: '',
  };
};

HoursSleepQuestion.schema = () => {
  return Yup.object().shape({
    hoursSleep: Yup.number().required(),
  });
};

HoursSleepQuestion.createDTO = (formData: HoursSleepData): Partial<DietStudyRequest> => {
  return {
    hours_of_sleep: cleanIntegerVal(formData.hoursSleep),
  } as Partial<DietStudyRequest>;
};
