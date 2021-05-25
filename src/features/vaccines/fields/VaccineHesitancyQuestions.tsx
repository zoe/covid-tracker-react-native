import {
  BooleanCheckBoxData,
  BooleanCheckboxes,
  CheckboxList,
  DropdownField,
  IFormQuestion,
  RegularText,
} from '@covid/components';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import { VaccinePlanRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import React from 'react';
import { PickerItemProps, View } from 'react-native';
import * as Yup from 'yup';

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

export const VaccineHesitancyQuestions: IFormQuestion<Props, VaccineHesitancyData, any> = (props: Props) => {
  const { formikProps } = props;

  const dropdowns: PickerItemProps[] = [
    { label: i18n.t('picker-yes'), value: 'yes' },
    { label: i18n.t('picker-no'), value: 'no' },
    { label: i18n.t('picker-do-not-know'), value: 'unsure' },
  ];

  const checkboxesNotSE: BooleanCheckBoxData[] = isSECountry()
    ? []
    : [
        { formKey: 'reason_vaccine_trial', label: i18n.t('vaccines.hesitancy.vaccine-trial') },
        { formKey: 'reason_religion', label: i18n.t('vaccines.hesitancy.religious') },
      ];

  const checkboxes: BooleanCheckBoxData[] = [
    ...checkboxesNotSE,
    { formKey: 'reason_personal_belief', label: i18n.t('vaccines.hesitancy.philosophical') },
    { formKey: 'reason_pregnancy_breastfeeding', label: i18n.t('vaccines.hesitancy.pregnancy') },
    { formKey: 'reason_illness', label: i18n.t('vaccines.hesitancy.illness') },
    { formKey: 'reason_safety', label: i18n.t('vaccines.hesitancy.safety-concern') },
    { formKey: 'reason_bad_reaction', label: i18n.t('vaccines.hesitancy.bad-reaction') },
    { formKey: 'reason_knowledge', label: i18n.t('vaccines.hesitancy.do-not-know') },
    { formKey: 'reason_efficacy', label: i18n.t('vaccines.hesitancy.unsure-is-working') },
    { formKey: 'reason_availability', label: i18n.t('vaccines.hesitancy.availability') },
    { formKey: 'reason_unnecessary', label: i18n.t('vaccines.hesitancy.unnecessary') },
    { formKey: 'reason_pfnts', label: i18n.t('vaccines.hesitancy.not-to-say') },
    { formKey: 'other', label: i18n.t('vaccines.hesitancy.Other') },
  ];

  return (
    <View style={{ marginBottom: 8 }}>
      <DropdownField
        items={dropdowns}
        onValueChange={formikProps.handleChange('plan')}
        selectedValue={formikProps.values.plan}
      />

      {formikProps.values.plan === 'no' || formikProps.values.plan === 'unsure' ? (
        <>
          <RegularText
            style={{
              paddingBottom: 8,
              paddingTop: 16,
            }}
          >
            {i18n.t('vaccines.hesitancy.check-all-that-apply')}
          </RegularText>

          <CheckboxList>
            <BooleanCheckboxes
              data={checkboxes}
              showAdditionalInputProps={{
                inputProps: {
                  maxLength: 500,
                  multiline: true,
                },
                key: 'reason_other',
                label: i18n.t('vaccines.hesitancy.specify'),
                show: formikProps.values.other,
              }}
            />
          </CheckboxList>
        </>
      ) : null}
    </View>
  );
};

VaccineHesitancyQuestions.initialFormValues = (): VaccineHesitancyData => {
  return {
    other: false,
    plan: '',
    reason_availability: false,
    reason_bad_reaction: false,
    reason_efficacy: false,
    reason_illness: false,
    reason_knowledge: false,
    reason_other: '',
    reason_personal_belief: false,
    reason_pfnts: false,
    reason_pregnancy_breastfeeding: false,
    reason_religion: false,
    reason_safety: false,
    reason_unnecessary: false,
    reason_vaccine_trial: false,
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
