import { FormikProps } from 'formik';
import React, { Component } from 'react';

import DropdownField from '../../../components/DropdownField';
import i18n from '../../../locale/i18n';

export interface PeriodFrequencyData {
  periodFrequency: string;
}

interface Props {
  formikProps: FormikProps<PeriodFrequencyData>;
}

const periodFrequencyValues = {
  REGULAR: 'regular',
  LESS_FREQUENT: 'less_frequent',
  IRREGULAR: 'irregular',
};

const periodFrequencyItems = [
  { label: i18n.t('your-health.picker-period-frequency-regular'), value: periodFrequencyValues.REGULAR },
  { label: i18n.t('your-health.picker-period-frequency-less-frequent'), value: periodFrequencyValues.LESS_FREQUENT },
  { label: i18n.t('your-health.picker-period-frequency-irregular'), value: periodFrequencyValues.IRREGULAR },
];

export class PeriodFrequencyQuestion extends Component<Props, object> {
  render() {
    const formikProps = this.props.formikProps;
    return (
      <DropdownField
        selectedValue={formikProps.values.periodFrequency}
        onValueChange={formikProps.handleChange('periodFrequency')}
        label={i18n.t('your-health.period-frequency')}
        error={formikProps.touched.periodFrequency && formikProps.submitCount > 0 && formikProps.errors.periodFrequency}
        items={periodFrequencyItems}
      />
    );
  }
}
