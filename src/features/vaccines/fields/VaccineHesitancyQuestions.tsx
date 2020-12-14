import { FormikProps } from 'formik';
import React from 'react';
import { PickerItemProps, View } from 'react-native';
import * as Yup from 'yup';

import {
  RegularText,
  CheckboxList,
  BooleanCheckboxes,
  BooleanCheckBoxData,
  DropdownField,
  FormQuestion,
} from '@covid/components';
import i18n from '@covid/locale/i18n';

type VaccineHesitancyCheckBoxData = {
  religious: boolean;
  philosophical: boolean;
  pregnancy: boolean;
  safety: boolean;
  notSure: boolean;
  medication: boolean;
  availability: boolean;
  necessary: boolean;
  unsureIsWorking: boolean;
  heardBadReactionExperience: boolean;
  other: boolean;
  pnts: boolean;
};

export type VaccineHesitancyData = {
  acceptVaccine: string;
  otherReason?: string;
} & VaccineHesitancyCheckBoxData;

type Props = {
  formikProps: FormikProps<VaccineHesitancyData>;
};

export const VaccineHesitancyQuestions: FormQuestion<Props, VaccineHesitancyData, any> = (props: Props) => {
  const { formikProps } = props;

  const dropdowns: PickerItemProps[] = [
    { label: i18n.t('picker-yes'), value: 'yes' },
    { label: i18n.t('picker-no'), value: 'no' },
    { label: i18n.t('picker-do-not-know'), value: 'do-not-know' },
  ];

  const checkboxes: BooleanCheckBoxData[] = [
    { label: i18n.t('vaccines.hesitancy.religious'), formKey: 'religious' },
    { label: i18n.t('vaccines.hesitancy.philosophical'), formKey: 'philosophical' },
    { label: i18n.t('vaccines.hesitancy.pregnancy'), formKey: 'pregnancy' },
    { label: i18n.t('vaccines.hesitancy.safety-concern'), formKey: 'safety' },
    { label: i18n.t('vaccines.hesitancy.do-not-know'), formKey: 'notSure' },
    { label: i18n.t('vaccines.hesitancy.illness'), formKey: 'medication' },
    { label: i18n.t('vaccines.hesitancy.availability'), formKey: 'availability' },
    { label: i18n.t('vaccines.hesitancy.unnecessary'), formKey: 'necessary' },
    { label: i18n.t('vaccines.hesitancy.unsureIsWorking'), formKey: 'unsureIsWorking' },
    { label: i18n.t('vaccines.hesitancy.bad-reaction'), formKey: 'heardBadReactionExperience' },
    { label: i18n.t('vaccines.hesitancy.Other'), formKey: 'other' },
    { label: i18n.t('vaccines.hesitancy.not-to-say'), formKey: 'pnts' },
  ];

  return (
    <View style={{ marginVertical: 8 }}>
      <DropdownField
        selectedValue={formikProps.values.acceptVaccine}
        onValueChange={formikProps.handleChange('acceptVaccine')}
        label={i18n.t('label-chose-an-option')}
        items={dropdowns}
      />

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
            key: 'otherReason',
            show: formikProps.values['other'],
            inputProps: {
              multiline: true,
              numberOfLines: 5,
            },
          }}
        />
      </CheckboxList>
    </View>
  );
};

VaccineHesitancyQuestions.initialFormValues = (): VaccineHesitancyData => {
  return {
    acceptVaccine: '',
    religious: false,
    philosophical: false,
    pregnancy: false,
    safety: false,
    notSure: false,
    medication: false,
    availability: false,
    necessary: false,
    unsureIsWorking: false,
    heardBadReactionExperience: false,
    other: false,
    pnts: false,
  };
};

VaccineHesitancyQuestions.schema = () => {
  return Yup.object().shape({
    acceptVaccine: Yup.string().required(),
    otherReason: Yup.string(),
  });
};

VaccineHesitancyQuestions.createDTO = (formData: VaccineHesitancyData): Partial<any> => {
  return {};
};
