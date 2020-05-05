import { FormikProps } from 'formik';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import DropdownField from '../../../components/DropdownField';
import i18n from '../../../locale/i18n';
import { CheckboxItem, CheckboxList } from '../../../components/Checkbox';
import { FieldWrapper } from '../../../components/Screen';
import { Item, Label } from 'native-base';
import { ValidationError } from '../../../components/ValidationError';

export interface HormoneTreatmentData {
  havingPeriods: string;
  hormoneTreatment: string[];
}

interface Props {
  formikProps: FormikProps<HormoneTreatmentData>;
}

const periodValues = {
  NEVER: 'never',
  CURRENTLY: 'currently',
  STOPPED: 'stopped',
  PREGNANT: 'pregnant',
  PFNTS: 'pfnts',
};

const periodItems = [
  { label: i18n.t('your-health.picker-never-had-periods'), value: periodValues.NEVER },
  { label: i18n.t('your-health.picker-currently-having-periods'), value: periodValues.CURRENTLY },
  { label: i18n.t('your-health.picker-stopped-having-periods'), value: periodValues.STOPPED },
  { label: i18n.t('your-health.picker-pregnant'), value: periodValues.PREGNANT },
  { label: i18n.t('your-health.picker-pfnts'), value: periodValues.PFNTS },
];

const treatmentValues = {
  NONE: 'no',
  ORAL_CONTRACEPTIVE_PILL: 'combined_oral_contraceptive_pill',
  PROGESTERONE_ONLY_PILL: 'progestone_only_pill',
  MIRENA_OR_OTHER_COIL: 'mirena_or_other_coil',
  DEPOT_INJECTION_OR_IMPLANT: 'depot_injection_or_implant',
  HORMONE_TREATMENT_THERAPY: 'hormone_treatment_therapy',
  OESTROGEN_HORMONE_THERAPY: 'oestrogen_hormone_therapy',
  TESTOSTERONE_HORMONE_THERAPY: 'testosterone_hormone_therapy',
  PREFER_NOT_TO_SAY: 'pfnts',
};

type TreatmentCheckBoxData = {
  label: string;
  value: string;
};

export interface TreatmentData {
  havingPeriods: string;
  hormoneTreatment: string[];
}

const HormoneTreatmentCheckboxes = [
  { label: i18n.t('your-health.checkbox-hormone-treatment-none'), value: treatmentValues.NONE },
  { label: i18n.t('your-health.checkbox-oral-contraceptive-pill'), value: treatmentValues.ORAL_CONTRACEPTIVE_PILL },
  { label: i18n.t('your-health.checkbox-progesterone-only-pill'), value: treatmentValues.PROGESTERONE_ONLY_PILL },
  { label: i18n.t('your-health.checkbox-mirena-or-other-coil'), value: treatmentValues.MIRENA_OR_OTHER_COIL },
  {
    label: i18n.t('your-health.checkbox-depot-injection-or-implant'),
    value: treatmentValues.DEPOT_INJECTION_OR_IMPLANT,
  },
  { label: i18n.t('your-health.checkbox-hormone-treatment-therapy'), value: treatmentValues.HORMONE_TREATMENT_THERAPY },
  { label: i18n.t('your-health.checkbox-oestrogen-hormone-therapy'), value: treatmentValues.OESTROGEN_HORMONE_THERAPY },
  {
    label: i18n.t('your-health.checkbox-testosterone-hormone-therapy'),
    value: treatmentValues.TESTOSTERONE_HORMONE_THERAPY,
  },
  { label: i18n.t('your-health.checkbox-hormone-treatment-pfnts'), value: treatmentValues.PREFER_NOT_TO_SAY },
];

const createTreatmentCheckboxes = (data: TreatmentCheckBoxData[], props: FormikProps<TreatmentData>) => {
  return data.map((checkBoxData) => {
    return (
      <CheckboxItem
        key={checkBoxData.value}
        value={props.values.hormoneTreatment.includes(checkBoxData.value)}
        onChange={(checked: boolean) => {
          let treatmentArray = props.values.hormoneTreatment;
          if (checked) {
            treatmentArray.push(checkBoxData.value);
          } else {
            treatmentArray = treatmentArray.filter((val) => val != checkBoxData.value);
          }
          props.setFieldValue('hormoneTreatment', treatmentArray);
        }}>
        {checkBoxData.label}
      </CheckboxItem>
    );
  });
};

export class HormoneTreatmentQuestion extends Component<Props, object> {
  static initialFormValues = () => {
    return {
      havingPeriods: '',
      hormoneTreatment: [] as string[],
    };
  };

  // "label-taking-hormone-treatment"

  render() {
    const formikProps = this.props.formikProps;
    console.log('[FORMIK] Field values:', formikProps.initialValues);
    return (
      <View>
        <DropdownField
          selectedValue={formikProps.values.havingPeriods}
          onValueChange={formikProps.handleChange('havingPeriods')}
          label={i18n.t('your-health.having-periods')}
          error={formikProps.touched.havingPeriods && formikProps.errors.havingPeriods}
          items={periodItems}
        />

        <FieldWrapper>
          <Item stackedLabel style={styles.textItemStyle}>
            <Label>{i18n.t('your-health.label-taking-hormone-treatment')}</Label>
            <CheckboxList>{createTreatmentCheckboxes(HormoneTreatmentCheckboxes, this.props.formikProps)}</CheckboxList>
          </Item>
          {!!formikProps.errors.hormoneTreatment && (
            <ValidationError error={formikProps.errors.hormoneTreatment as string} />
          )}
        </FieldWrapper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
