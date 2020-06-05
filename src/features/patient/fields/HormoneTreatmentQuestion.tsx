import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { FieldWrapper } from '@covid/components/Screen';
import { ValidationError } from '@covid/components/ValidationError';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import { Item, Label } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export interface HormoneTreatmentData {
  hormoneTreatment: string[];
}

interface Props {
  formikProps: FormikProps<HormoneTreatmentData>;
}

export type TreatmentValue =
  | 'ht_none'
  | 'ht_combined_oral_contraceptive_pill'
  | 'ht_progestone_only_pill'
  | 'ht_mirena_or_other_coil'
  | 'ht_depot_injection_or_implant'
  | 'ht_hormone_treatment_therapy'
  | 'ht_oestrogen_hormone_therapy'
  | 'ht_testosterone_hormone_therapy'
  | 'ht_pfnts'
  | 'ht_other';

const treatmentValues = {
  NONE: 'ht_none',
  ORAL_CONTRACEPTIVE_PILL: 'ht_combined_oral_contraceptive_pill',
  PROGESTERONE_ONLY_PILL: 'ht_progestone_only_pill',
  MIRENA_OR_OTHER_COIL: 'ht_mirena_or_other_coil',
  DEPOT_INJECTION_OR_IMPLANT: 'ht_depot_injection_or_implant',
  HORMONE_TREATMENT_THERAPY: 'ht_hormone_treatment_therapy',
  OESTROGEN_HORMONE_THERAPY: 'ht_oestrogen_hormone_therapy',
  TESTOSTERONE_HORMONE_THERAPY: 'ht_testosterone_hormone_therapy',
  PREFER_NOT_TO_SAY: 'ht_pfnts',
  OTHER: 'ht_other',
};

const singleOptions = [treatmentValues.NONE, treatmentValues.PREFER_NOT_TO_SAY];

type TreatmentCheckBoxData = {
  label: string;
  value: string;
};

const createTreatmentCheckboxes = (data: TreatmentCheckBoxData[], props: FormikProps<HormoneTreatmentData>) => {
  return data.map((checkBoxData) => {
    return (
      <CheckboxItem
        key={checkBoxData.value}
        value={props.values.hormoneTreatment.includes(checkBoxData.value)}
        onChange={(checked: boolean) => {
          let treatmentArray = props.values.hormoneTreatment;
          if (singleOptions.includes(checkBoxData.value)) {
            treatmentArray = [checkBoxData.value];
          } else if (checked) {
            treatmentArray.push(checkBoxData.value);
            treatmentArray = treatmentArray.filter((val) => !singleOptions.includes(val));
          } else {
            treatmentArray = treatmentArray.filter((val) => val !== checkBoxData.value);
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
      hormoneTreatment: [] as string[],
    };
  };

  static createTreatmentsDoc = (selectedTreatments: TreatmentValue[]) => {
    const treatments = {
      ht_none: false,
      ht_combined_oral_contraceptive_pill: false,
      ht_progestone_only_pill: false,
      ht_mirena_or_other_coil: false,
      ht_depot_injection_or_implant: false,
      ht_hormone_treatment_therapy: false,
      ht_oestrogen_hormone_therapy: false,
      ht_testosterone_hormone_therapy: false,
      ht_pfnts: false,
      ht_other: false,
    };
    selectedTreatments.forEach((item: TreatmentValue) => {
      treatments[item] = true;
    });
    return treatments;
  };

  HormoneTreatmentCheckboxes = [
    { label: i18n.t('your-health.checkbox-hormone-treatment-none'), value: treatmentValues.NONE },
    { label: i18n.t('your-health.checkbox-oral-contraceptive-pill'), value: treatmentValues.ORAL_CONTRACEPTIVE_PILL },
    { label: i18n.t('your-health.checkbox-progesterone-only-pill'), value: treatmentValues.PROGESTERONE_ONLY_PILL },
    { label: i18n.t('your-health.checkbox-mirena-or-other-coil'), value: treatmentValues.MIRENA_OR_OTHER_COIL },
    {
      label: i18n.t('your-health.checkbox-depot-injection-or-implant'),
      value: treatmentValues.DEPOT_INJECTION_OR_IMPLANT,
    },
    {
      label: i18n.t('your-health.checkbox-hormone-treatment-therapy'),
      value: treatmentValues.HORMONE_TREATMENT_THERAPY,
    },
    {
      label: i18n.t('your-health.checkbox-oestrogen-hormone-therapy'),
      value: treatmentValues.OESTROGEN_HORMONE_THERAPY,
    },
    {
      label: i18n.t('your-health.checkbox-testosterone-hormone-therapy'),
      value: treatmentValues.TESTOSTERONE_HORMONE_THERAPY,
    },
    { label: i18n.t('your-health.checkbox-hormone-treatment-pfnts'), value: treatmentValues.PREFER_NOT_TO_SAY },
    { label: i18n.t('your-health.checkbox-hormone-treatment-other'), value: treatmentValues.OTHER },
  ];

  render() {
    const formikProps = this.props.formikProps;
    return (
      <FieldWrapper>
        <Item stackedLabel style={styles.textItemStyle}>
          <Label>{i18n.t('your-health.label-taking-hormone-treatment')}</Label>
          <CheckboxList>
            {createTreatmentCheckboxes(this.HormoneTreatmentCheckboxes, this.props.formikProps)}
          </CheckboxList>
        </Item>
        {!!formikProps.errors.hormoneTreatment && formikProps.submitCount > 0 && (
          <ValidationError error={formikProps.errors.hormoneTreatment as string} />
        )}
      </FieldWrapper>
    );
  }
}

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
