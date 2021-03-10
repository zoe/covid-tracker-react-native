import { FormikProps } from 'formik';
import React from 'react';
import { PickerItemProps, View } from 'react-native';
import * as Yup from 'yup';

import {
  BooleanCheckBoxData,
  BooleanCheckboxes,
  CheckboxList,
  DropdownField,
  FormQuestion,
  RegularText,
} from '@covid/components';
import { VaccinePlanRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { isSECountry } from '@covid/core/localisation/LocalisationService';

type VaccineHesitancyCheckBoxData = {
  reason_vaccine_trial: boolean;
  reason_religion: boolean;
  reason_personal_belief: boolean;
  reason_pregnancy_breastfeeding: boolean;
  reason_safety: boolean;
  reason_knowledge: boolean;
  reason_illness: boolean;
  reason_availability: boolean;
  reason_unnecessary: boolean;
  reason_efficacy: boolean;
  reason_bad_reaction: boolean;
  reason_pfnts: boolean;
  other: boolean;
};

export type VaccineHesitancyData = {
  plan: string;
  reason_other?: string;
} & VaccineHesitancyCheckBoxData;

type Props = {
  formikProps: FormikProps<VaccineHesitancyData>;
};

export const VaccineHesitancyQuestions: FormQuestion<Props, VaccineHesitancyData, any> = (props: Props) => {
  const { formikProps } = props;

  const dropdowns: PickerItemProps[] = [
    { label: i18n.t('picker-yes'), value: 'yes' },
    { label: i18n.t('picker-no'), value: 'no' },
    { label: i18n.t('picker-do-not-know'), value: 'unsure' },
  ];

  const checkboxesNotSE: BooleanCheckBoxData[] = isSECountry()
    ? []
    : [
        { label: i18n.t('vaccines.hesitancy.vaccine-trial'), formKey: 'reason_vaccine_trial' },
        { label: i18n.t('vaccines.hesitancy.religious'), formKey: 'reason_religion' },
      ];

  const checkboxes: BooleanCheckBoxData[] = [
    ...checkboxesNotSE,
    { label: i18n.t('vaccines.hesitancy.philosophical'), formKey: 'reason_personal_belief' },
    { label: i18n.t('vaccines.hesitancy.pregnancy'), formKey: 'reason_pregnancy_breastfeeding' },
    { label: i18n.t('vaccines.hesitancy.illness'), formKey: 'reason_illness' },
    { label: i18n.t('vaccines.hesitancy.safety-concern'), formKey: 'reason_safety' },
    { label: i18n.t('vaccines.hesitancy.bad-reaction'), formKey: 'reason_bad_reaction' },
    { label: i18n.t('vaccines.hesitancy.do-not-know'), formKey: 'reason_knowledge' },
    { label: i18n.t('vaccines.hesitancy.unsure-is-working'), formKey: 'reason_efficacy' },
    { label: i18n.t('vaccines.hesitancy.availability'), formKey: 'reason_availability' },
    { label: i18n.t('vaccines.hesitancy.unnecessary'), formKey: 'reason_unnecessary' },
    { label: i18n.t('vaccines.hesitancy.not-to-say'), formKey: 'reason_pfnts' },
    { label: i18n.t('vaccines.hesitancy.Other'), formKey: 'other' },
  ];

  return (
    <View style={{ marginBottom: 8 }}>
      <DropdownField
        selectedValue={formikProps.values.plan}
        onValueChange={formikProps.handleChange('plan')}
        items={dropdowns}
      />

      {(formikProps.values.plan === 'no' || formikProps.values.plan === 'unsure') && (
        <>
          <RegularText
            style={{
              paddingTop: 16,
              paddingBottom: 8,
            }}>
            {i18n.t('vaccines.hesitancy.check-all-that-apply')}
          </RegularText>

          <CheckboxList>
            <BooleanCheckboxes
              data={checkboxes}
              showAdditionalInputProps={{
                label: i18n.t('vaccines.hesitancy.specify'),
                key: 'reason_other',
                show: formikProps.values['other'],
                inputProps: {
                  multiline: true,
                  maxLength: 500,
                },
              }}
            />
          </CheckboxList>
        </>
      )}
    </View>
  );
};

VaccineHesitancyQuestions.initialFormValues = (): VaccineHesitancyData => {
  return {
    plan: '',
    reason_other: '',
    reason_vaccine_trial: false,
    reason_religion: false,
    reason_personal_belief: false,
    reason_pregnancy_breastfeeding: false,
    reason_safety: false,
    reason_knowledge: false,
    reason_illness: false,
    reason_availability: false,
    reason_unnecessary: false,
    reason_efficacy: false,
    reason_bad_reaction: false,
    reason_pfnts: false,
    other: false,
  };
};

VaccineHesitancyQuestions.schema = () => {
  return Yup.object().shape({
    plan: Yup.string().required(),
    reason_other: Yup.string().when('other', {
      is: true,
      then: Yup.string().required(),
    }),
  });
};

VaccineHesitancyQuestions.createDTO = (formData: VaccineHesitancyData): Partial<VaccinePlanRequest> => {
  const { other, ...data } = formData;
  return data;
};
