import DropdownField from '@covid/components/DropdownField';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import React, { Component } from 'react';

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

export class PeriodFrequencyQuestion extends Component<Props, object> {
  periodFrequencyItems = [
    { label: i18n.t('your-health.picker-period-frequency-regular'), value: periodFrequencyValues.REGULAR },
    {
      label: i18n.t('your-health.picker-period-frequency-less-frequent'),
      value: periodFrequencyValues.LESS_FREQUENT,
    },
    { label: i18n.t('your-health.picker-period-frequency-irregular'), value: periodFrequencyValues.IRREGULAR },
  ];

  render() {
    const formikProps = this.props.formikProps;
    return (
      <DropdownField
        selectedValue={formikProps.values.periodFrequency}
        onValueChange={formikProps.handleChange('periodFrequency')}
        label={i18n.t('your-health.period-frequency')}
        error={formikProps.touched.periodFrequency && formikProps.submitCount > 0 && formikProps.errors.periodFrequency}
        items={this.periodFrequencyItems}
      />
    );
  }
}
