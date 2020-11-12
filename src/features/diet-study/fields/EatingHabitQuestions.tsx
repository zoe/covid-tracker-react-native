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
import YesNoField from '@covid/components/YesNoField';

export interface EatingHabitData {
  eatsBreakfast: string;
  mainMeals: string;
  snacks: string;
  lostControl: string;
}

interface Props {
  formikProps: FormikProps<EatingHabitData>;
}

export interface EatingHabitQuestions<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const EatingHabitQuestions: EatingHabitQuestions<Props, EatingHabitData> = (props: Props) => {
  const { formikProps } = props;
  return (
    <>
      <FieldWrapper>
        <FieldLabel>{i18n.t('diet-study.eats-breakfast-label')}</FieldLabel>
        <YesNoField
          selectedValue={formikProps.values.eatsBreakfast}
          onValueChange={formikProps.handleChange('eatsBreakfast')}
          error={formikProps.touched.eatsBreakfast && formikProps.errors.eatsBreakfast}
        />
      </FieldWrapper>

      <FieldLabel>{i18n.t('diet-study.main-meals-label')}</FieldLabel>
      <FieldWrapper style={{ paddingVertical: 16 }}>
        <ValidatedTextInput
          placeholder={i18n.t('diet-study.main-meals-placeholder')}
          value={formikProps.values.mainMeals}
          onChangeText={formikProps.handleChange('mainMeals')}
          onBlur={formikProps.handleBlur('mainMeals')}
          error={formikProps.touched.mainMeals && formikProps.errors.mainMeals}
          returnKeyType="next"
          onSubmitEditing={() => {}}
          keyboardType="numeric"
        />
      </FieldWrapper>

      <FieldLabel>{i18n.t('diet-study.snacks-label')}</FieldLabel>
      <FieldWrapper style={{ paddingVertical: 16 }}>
        <ValidatedTextInput
          placeholder={i18n.t('diet-study.snacks-placeholder')}
          value={formikProps.values.snacks}
          onChangeText={formikProps.handleChange('snacks')}
          onBlur={formikProps.handleBlur('snacks')}
          error={formikProps.touched.snacks && formikProps.errors.snacks}
          returnKeyType="next"
          onSubmitEditing={() => {}}
          keyboardType="numeric"
        />
      </FieldWrapper>

      <FieldWrapper>
        <FieldLabel>{i18n.t('diet-study.lost-control')}</FieldLabel>
        <YesNoField
          selectedValue={formikProps.values.lostControl}
          onValueChange={formikProps.handleChange('lostControl')}
          error={formikProps.touched.lostControl && formikProps.errors.lostControl}
        />
      </FieldWrapper>
    </>
  );
};

EatingHabitQuestions.initialFormValues = (): EatingHabitData => {
  return {
    eatsBreakfast: '',
    mainMeals: '',
    snacks: '',
    lostControl: '',
  };
};

EatingHabitQuestions.schema = () => {
  return Yup.object().shape({
    eatsBreakfast: Yup.string().required(i18n.t('please-select-option')),
    mainMeals: Yup.number().required(),
    snacks: Yup.number().required(),
    lostControl: Yup.string().required(i18n.t('please-select-option')),
  });
};

EatingHabitQuestions.createDTO = (formData: EatingHabitData): Partial<DietStudyRequest> => {
  return {
    eats_breakfast: formData.eatsBreakfast === 'yes',
    main_meals: cleanIntegerVal(formData.mainMeals),
    snacks: cleanIntegerVal(formData.snacks),
    lost_control: formData.lostControl === 'yes',
  } as Partial<DietStudyRequest>;
};
