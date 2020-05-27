import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { GenericTextField } from '@covid/components/GenericTextField';
import { FieldWrapper } from '@covid/components/Screen';
import { ValidationError } from '@covid/components/ValidationError';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import { Item, Label } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export interface VitaminSupplementData {
  vitaminSupplements: string[];
  vitaminOther: string;
}

interface Props {
  formikProps: FormikProps<VitaminSupplementData>;
}

export type SupplementValue =
  | 'vs_none'
  | 'vs_vitamin_c'
  | 'vs_vitamin_d'
  | 'vs_omega_3'
  | 'vs_zinc'
  | 'vs_garlic'
  | 'vs_probiotics'
  | 'vs_multivitamins'
  | 'vs_other'
  | 'vs_pftns';

export const supplementValues = {
  NONE: 'vs_none',
  VITAMIN_C: 'vs_vitamin_c',
  VITAMIN_D: 'vs_vitamin_d',
  OMEGA_3_OR_FISH_OIL: 'vs_omega_3',
  ZINC: 'vs_zinc',
  GARLIC: 'vs_garlic',
  PROBIOTICS: 'vs_probiotics',
  MULTIVITAMINS_AND_MINERALS: 'vs_multivitamins',
  PREFER_NOT_TO_SAY: 'vs_pftns',
  OTHER: 'vs_other',
};

const singleOptions = [supplementValues.NONE, supplementValues.PREFER_NOT_TO_SAY];

type SupplementCheckBoxData = {
  label: string;
  value: string;
};

const createSupplementCheckboxes = (data: SupplementCheckBoxData[], props: FormikProps<VitaminSupplementData>) => {
  return data.map((checkBoxData) => {
    return (
      <CheckboxItem
        key={checkBoxData.value}
        value={props.values.vitaminSupplements.includes(checkBoxData.value)}
        onChange={(checked: boolean) => {
          let supplementArray = props.values.vitaminSupplements;
          if (singleOptions.includes(checkBoxData.value)) {
            supplementArray = [checkBoxData.value];
          } else if (checked) {
            supplementArray.push(checkBoxData.value);
            supplementArray = supplementArray.filter((val) => !singleOptions.includes(val));
          } else {
            supplementArray = supplementArray.filter((val) => val !== checkBoxData.value);
          }
          props.setFieldValue('vitaminSupplements', supplementArray);
        }}>
        {checkBoxData.label}
      </CheckboxItem>
    );
  });
};

export class VitaminSupplementsQuestion extends Component<Props, object> {
  static initialFormValues = () => {
    return {
      vitaminSupplements: [] as string[],
      vitaminOther: '',
    };
  };

  static createSupplementsDoc = (selectedSupplements: SupplementValue[], vitaminOther: string) => {
    const supplements = {
      vs_none: false,
      vs_vitamin_c: false,
      vs_vitamin_d: false,
      vs_omega_3: false,
      vs_zinc: false,
      vs_garlic: false,
      vs_probiotics: false,
      vs_multivitamins: false,
      vs_other: false,
      vs_pftns: false,
    };
    selectedSupplements.forEach((item: SupplementValue) => {
      supplements[item] = true;
    });

    if (supplements.vs_other) {
      supplements.vs_other = vitaminOther;
    }

    return supplements;
  };

  vitaminSupplementsCheckboxes = [
    { label: i18n.t('your-health.checkbox-vitamins-no'), value: supplementValues.NONE },
    { label: i18n.t('your-health.checkbox-vitamin-c'), value: supplementValues.VITAMIN_C },
    { label: i18n.t('your-health.checkbox-vitamin-d'), value: supplementValues.VITAMIN_D },
    { label: i18n.t('your-health.checkbox-omega-3-fish-oil'), value: supplementValues.OMEGA_3_OR_FISH_OIL },
    { label: i18n.t('your-health.checkbox-zinc'), value: supplementValues.ZINC },
    { label: i18n.t('your-health.checkbox-garlic'), value: supplementValues.GARLIC },
    { label: i18n.t('your-health.checkbox-probiotics'), value: supplementValues.PROBIOTICS },
    {
      label: i18n.t('your-health.checkbox-multivitamins-minerals'),
      value: supplementValues.MULTIVITAMINS_AND_MINERALS,
    },
    { label: i18n.t('your-health.checkbox-other-specify'), value: supplementValues.OTHER },
    { label: i18n.t('your-health.checkbox-pfnts'), value: supplementValues.PREFER_NOT_TO_SAY },
  ];

  render() {
    const formikProps = this.props.formikProps;
    return (
      <FieldWrapper>
        <Item stackedLabel style={styles.textItemStyle}>
          <Label>{i18n.t('your-health.label-taking-vitamins-supplements')}</Label>
          <CheckboxList>
            {createSupplementCheckboxes(this.vitaminSupplementsCheckboxes, this.props.formikProps)}
          </CheckboxList>
        </Item>
        {!!formikProps.errors.vitaminSupplements && formikProps.submitCount > 0 && (
          <ValidationError error={formikProps.errors.vitaminSupplements as string} />
        )}
        {formikProps.values.vitaminSupplements.includes(supplementValues.OTHER) && (
          <GenericTextField formikProps={formikProps} label="Test" name="vitaminOther" />
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
