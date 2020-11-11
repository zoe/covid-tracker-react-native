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
  hoursSleepWeekdays: string;
  hoursSleepWeekends: string;
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
      <FieldLabel>{i18n.t('diet-study.hours-of-sleep-weekday-label')}</FieldLabel>
      <FieldWrapper style={{ paddingVertical: 16 }}>
        <ValidatedTextInput
          placeholder={i18n.t('diet-study.hours-of-sleep-placeholder')}
          value={formikProps.values.hoursSleepWeekdays}
          onChangeText={formikProps.handleChange('hoursSleepWeekdays')}
          onBlur={formikProps.handleBlur('hoursSleepWeekdays')}
          error={formikProps.touched.hoursSleepWeekdays && formikProps.errors.hoursSleepWeekdays}
          returnKeyType="next"
          onSubmitEditing={() => {}}
          keyboardType="numeric"
        />
      </FieldWrapper>

      <FieldLabel>{i18n.t('diet-study.hours-of-sleep-weekend-label')}</FieldLabel>
      <FieldWrapper style={{ paddingVertical: 16 }}>
        <ValidatedTextInput
          placeholder={i18n.t('diet-study.hours-of-sleep-placeholder')}
          value={formikProps.values.hoursSleepWeekends}
          onChangeText={formikProps.handleChange('hoursSleepWeekends')}
          onBlur={formikProps.handleBlur('hoursSleepWeekends')}
          error={formikProps.touched.hoursSleepWeekends && formikProps.errors.hoursSleepWeekends}
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
    hoursSleepWeekdays: '',
    hoursSleepWeekends: '',
  };
};

HoursSleepQuestion.schema = () => {
  return Yup.object().shape({
    hoursSleepWeekdays: Yup.number().required(),
    hoursSleepWeekends: Yup.number().required(),
  });
};

HoursSleepQuestion.createDTO = (formData: HoursSleepData): Partial<DietStudyRequest> => {
  return {
    hours_sleep_weekdays: cleanIntegerVal(formData.hoursSleepWeekdays),
    hours_sleep_weekends: cleanIntegerVal(formData.hoursSleepWeekends),
  } as Partial<DietStudyRequest>;
};
