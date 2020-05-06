import { FormikProps } from 'formik';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import i18n from '../../../locale/i18n';
import { CheckboxItem, CheckboxList } from '../../../components/Checkbox';
import { FieldWrapper } from '../../../components/Screen';
import { Item, Label } from 'native-base';
import { ValidationError } from '../../../components/ValidationError';

export interface HormoneTreatmentData {
  hormoneTreatment: string[];
}

interface Props {
  formikProps: FormikProps<HormoneTreatmentData>;
}

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

const createTreatmentCheckboxes = (data: TreatmentCheckBoxData[], props: FormikProps<HormoneTreatmentData>) => {
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

export class HormoneTreatmentQuestion extends Component<Props, {}> {
  static initialFormValues = () => {
    return {
      havingPeriods: '',
      hormoneTreatment: [] as string[],
    };
  };

  render() {
    const formikProps = this.props.formikProps;
    return (
      <FieldWrapper>
        <Item stackedLabel style={styles.textItemStyle}>
          <Label>{i18n.t('your-health.label-taking-hormone-treatment')}</Label>
          <CheckboxList>{createTreatmentCheckboxes(HormoneTreatmentCheckboxes, this.props.formikProps)}</CheckboxList>
        </Item>
        {!!formikProps.errors.hormoneTreatment && (
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
