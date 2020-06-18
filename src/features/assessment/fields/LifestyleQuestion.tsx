import { FormikProps } from 'formik';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { FieldWrapper } from '@covid/components/Screen';
import DropdownField from '@covid/components/DropdownField';
import { LifestyleRequest } from '@covid/core/assessment/dto/LifestyleRequest';

export interface LifestyleData {
  weightChange: string;
  dietChange: string;
  snackingChange: string;
  activityChange: string;
  alcoholChange: string;
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

export class LifestyleQuestion extends Component<Props, object> {
  static initialFormValues = (): LifestyleData => {
    return {
      weightChange: '',
      dietChange: '',
      snackingChange: '',
      activityChange: '',
      alcoholChange: '',
    };
  };

  static createMasksDTO = (form: LifestyleData) => {
    return {
      weight_change: form.weightChange,
      diet_change: form.dietChange,
      snacking_change: form.snackingChange,
      activity_change: form.activityChange,
      alcohol_change: form.alcoholChange,
    } as Partial<LifestyleRequest>;
  };

  weightChangeOptions = [
    { label: i18n.t('lifestyle.weight-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.weight-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.weight-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.weight-change.pfnts'), value: ChangeValue.PFNTS },
  ];

  dietChangeOptions = [
    { label: i18n.t('lifestyle.diet-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.diet-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.diet-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.diet-change.pfnts'), value: ChangeValue.PFNTS },
  ];

  snackChangeOptions = [
    { label: i18n.t('lifestyle.snacking-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.snacking-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.snacking-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.snacking-change.pfnts'), value: ChangeValue.PFNTS },
  ];

  alcoholChangeOptions = [
    { label: i18n.t('lifestyle.alcohol-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.alcohol-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.alcohol-change.no-alcohol'), value: ChangeValue.NO_ALCOHOL },
    { label: i18n.t('lifestyle.alcohol-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.alcohol-change.pfnts'), value: ChangeValue.PFNTS },
  ];

  activityChangeOptions = [
    { label: i18n.t('lifestyle.activity-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.activity-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.activity-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.activity-change.pfnts'), value: ChangeValue.PFNTS },
  ];

  render() {
    const { formikProps } = this.props;
    return (
      <FieldWrapper>
        <DropdownField
          label={i18n.t('lifestyle.weight-change.question')}
          selectedValue={formikProps.values.weightChange}
          onValueChange={formikProps.handleChange('weightChange')}
          error={formikProps.touched.weightChange && formikProps.errors.weightChange}
          items={this.weightChangeOptions}
        />

        <DropdownField
          label={i18n.t('lifestyle.diet-change.question')}
          selectedValue={formikProps.values.dietChange}
          onValueChange={formikProps.handleChange('dietChange')}
          error={formikProps.touched.dietChange && formikProps.errors.dietChange}
          items={this.dietChangeOptions}
        />

        <DropdownField
          label={i18n.t('lifestyle.snacking-change.question')}
          selectedValue={formikProps.values.snackingChange}
          onValueChange={formikProps.handleChange('snackingChange')}
          error={formikProps.touched.snackingChange && formikProps.errors.snackingChange}
          items={this.snackChangeOptions}
        />

        <DropdownField
          label={i18n.t('lifestyle.alcohol-change.question')}
          selectedValue={formikProps.values.alcoholChange}
          onValueChange={formikProps.handleChange('alcoholChange')}
          error={formikProps.touched.alcoholChange && formikProps.errors.alcoholChange}
          items={this.alcoholChangeOptions}
        />

        <DropdownField
          label={i18n.t('lifestyle.activity-change.question')}
          selectedValue={formikProps.values.activityChange}
          onValueChange={formikProps.handleChange('activityChange')}
          error={formikProps.touched.activityChange && formikProps.errors.activityChange}
          items={this.activityChangeOptions}
        />
      </FieldWrapper>
    );
  }
}

const styles = StyleSheet.create({});
