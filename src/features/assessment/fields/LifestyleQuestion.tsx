import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { FieldWrapper } from '@covid/components/Screen';
import DropdownField from '@covid/components/DropdownField';
import { LifestyleRequest } from '@covid/core/assessment/dto/LifestyleRequest';
import { cleanFloatVal } from '@covid/utils/number';
import { WeightData, WeightQuestion } from '@covid/features/patient/fields/WeightQuestion';
import { container } from '@covid/provider/services';
import { ICoreService } from '@covid/core/user/UserService';
import { Services } from '@covid/provider/services.types';

export interface LifestyleData {
  weightChange: string;
  dietChange: string;
  snackingChange: string;
  activityChange: string;
  alcoholChange: string;
  pounds: string;
  stones: string;
  weight: string;
  weightUnit: string;
}

interface Props {
  formikProps: FormikProps<LifestyleData>;
}

export enum ChangeValue {
  INCREASED = 'increased',
  DECREASED = 'decreased',
  SAME = 'same',
  PFNTS = 'pfnts',
  NO_ALCOHOL = 'no_alcohol',
}

export interface FormikLifestyleQuestionInputFC<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<LifestyleRequest>;
}

export const LifestyleQuestion: FormikLifestyleQuestionInputFC<Props, LifestyleData> = (props: Props) => {
  const weightChangeOptions = [
    { label: i18n.t('lifestyle.weight-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.weight-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.weight-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.weight-change.unsure-pfnts'), value: ChangeValue.PFNTS },
  ];

  const dietChangeOptions = [
    { label: i18n.t('lifestyle.diet-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.diet-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.diet-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.diet-change.unsure-pfnts'), value: ChangeValue.PFNTS },
  ];

  const snackChangeOptions = [
    { label: i18n.t('lifestyle.snacking-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.snacking-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.snacking-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.snacking-change.unsure-pfnts'), value: ChangeValue.PFNTS },
  ];

  const alcoholChangeOptions = [
    { label: i18n.t('lifestyle.alcohol-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.alcohol-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.alcohol-change.no-alcohol'), value: ChangeValue.NO_ALCOHOL },
    { label: i18n.t('lifestyle.alcohol-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.alcohol-change.unsure-pfnts'), value: ChangeValue.PFNTS },
  ];

  const activityChangeOptions = [
    { label: i18n.t('lifestyle.activity-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.activity-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.activity-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.activity-change.unsure-pfnts'), value: ChangeValue.PFNTS },
  ];

  const { formikProps } = props;

  return (
    <FieldWrapper>
      <DropdownField
        label={i18n.t('lifestyle.weight-change.question')}
        selectedValue={formikProps.values.weightChange}
        onValueChange={formikProps.handleChange('weightChange')}
        error={formikProps.touched.weightChange && formikProps.errors.weightChange}
        items={weightChangeOptions}
      />

      {(formikProps.values.weightChange === ChangeValue.INCREASED ||
        formikProps.values.weightChange === ChangeValue.DECREASED) && (
        <WeightQuestion
          formikProps={formikProps as FormikProps<WeightData>}
          label={i18n.t('lifestyle.weight-difference')}
        />
      )}

      <DropdownField
        label={i18n.t('lifestyle.diet-change.question')}
        selectedValue={formikProps.values.dietChange}
        onValueChange={formikProps.handleChange('dietChange')}
        error={formikProps.touched.dietChange && formikProps.errors.dietChange}
        items={dietChangeOptions}
      />

      <DropdownField
        label={i18n.t('lifestyle.snacking-change.question')}
        selectedValue={formikProps.values.snackingChange}
        onValueChange={formikProps.handleChange('snackingChange')}
        error={formikProps.touched.snackingChange && formikProps.errors.snackingChange}
        items={snackChangeOptions}
      />

      <DropdownField
        label={i18n.t('lifestyle.alcohol-change.question')}
        selectedValue={formikProps.values.alcoholChange}
        onValueChange={formikProps.handleChange('alcoholChange')}
        error={formikProps.touched.alcoholChange && formikProps.errors.alcoholChange}
        items={alcoholChangeOptions}
      />

      <DropdownField
        label={i18n.t('lifestyle.activity-change.question')}
        selectedValue={formikProps.values.activityChange}
        onValueChange={formikProps.handleChange('activityChange')}
        error={formikProps.touched.activityChange && formikProps.errors.activityChange}
        items={activityChangeOptions}
      />
    </FieldWrapper>
  );
};

LifestyleQuestion.initialFormValues = (): LifestyleData => {
  const features = container.get<ICoreService>(Services.User).getConfig();
  return {
    weightChange: '',
    dietChange: '',
    snackingChange: '',
    activityChange: '',
    alcoholChange: '',
    weight: '',
    stones: '',
    pounds: '',
    weightUnit: features.defaultWeightUnit,
  };
};

LifestyleQuestion.schema = () => {
  return Yup.object().shape({
    weightChange: Yup.string().required(i18n.t('lifestyle.please-select-option')),
    dietChange: Yup.string().required(i18n.t('lifestyle.please-select-option')),
    snackingChange: Yup.string().required(i18n.t('lifestyle.please-select-option')),
    activityChange: Yup.string().required(i18n.t('lifestyle.please-select-option')),
    alcoholChange: Yup.string().required(i18n.t('lifestyle.please-select-option')),
  });
};

LifestyleQuestion.createDTO = (formData: LifestyleData): Partial<LifestyleRequest> => {
  let dto = {
    weight_change: formData.weightChange,
    diet_change: formData.dietChange,
    snacking_change: formData.snackingChange,
    activity_change: formData.activityChange,
    alcohol_change: formData.alcoholChange,
  } as Partial<LifestyleRequest>;

  if (formData.weightUnit === 'lbs') {
    let pounds = cleanFloatVal(formData.pounds);
    if (formData.stones) {
      const stones = cleanFloatVal(formData.stones) || 0;
      pounds += stones * 14;
    }
    dto = { ...dto, weight_change_pounds: pounds };
  } else {
    dto = { ...dto, weight_change_kg: cleanFloatVal(formData.weight) };
  }
  return dto;
};
