import { FormikProps } from 'formik';
import React, { Component } from 'react';

import DropdownField from '../../../components/DropdownField';
import i18n from '../../../locale/i18n';

export interface PeriodData {
  havingPeriods: string;
}

interface Props {
  formikProps: FormikProps<PeriodData>;
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

export class PeriodQuestion extends Component<Props, object> {
  static initialFormValues = () => {
    return {
      havingPeriods: '',
    };
  };

  render() {
    const formikProps = this.props.formikProps;
    return (
      <DropdownField
        selectedValue={formikProps.values.havingPeriods}
        onValueChange={formikProps.handleChange('havingPeriods')}
        label={i18n.t('your-health.having-periods')}
        error={formikProps.touched.havingPeriods && formikProps.errors.havingPeriods}
        items={periodItems}
      />
    );
  }
}
