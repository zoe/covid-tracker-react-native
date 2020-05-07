import { FormikProps } from 'formik';
import React, { Component } from 'react';

import DropdownField from '../../../components/DropdownField';
import i18n from '../../../locale/i18n';
import { PeriodFrequencyQuestion, PeriodFrequencyData } from './PeriodFrequencyQuestion';
import { PeriodStoppedAge, PeriodStoppedAgeData } from './PeriodStoppedAge';
import { WeeksPregnant, WeeksPregnantData } from './WeeksPregnant';
import { TreatmentValue } from './HormoneTreatmentQuestion';
import { YourHealthData } from '../YourHealthScreen';

export interface PeriodData {
  havingPeriods: string;
  periodFrequency: string;
  periodStoppedAge: string;
  weeksPregnant: string;
}

interface Props {
  formikProps: FormikProps<PeriodData>;
}

export const periodValues = {
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
      weeksPregnant: '',
      periodFrequency: '',
      periodStoppedAge: '',
    };
  };

  static createPeriodDoc = (formData: YourHealthData) => {
    return {
      period_status: formData.havingPeriods,
      ...(formData.havingPeriods === periodValues.CURRENTLY && {
        period_frequency: formData.periodFrequency,
      }),
      ...(formData.havingPeriods === periodValues.STOPPED && {
        period_stopped_age: parseInt(formData.periodStoppedAge, 10),
      }),
      ...(formData.havingPeriods === periodValues.PREGNANT && {
        pregnant_weeks: parseInt(formData.weeksPregnant, 10),
      }),
    };
  };

  render() {
    const formikProps = this.props.formikProps;
    return (
      <>
        <DropdownField
          selectedValue={formikProps.values.havingPeriods}
          onValueChange={formikProps.handleChange('havingPeriods')}
          label={i18n.t('your-health.having-periods')}
          error={formikProps.touched.havingPeriods && formikProps.errors.havingPeriods}
          items={periodItems}
        />
        {formikProps.values.havingPeriods === periodValues.CURRENTLY && (
          <PeriodFrequencyQuestion formikProps={formikProps as FormikProps<PeriodFrequencyData>} />
        )}
        {formikProps.values.havingPeriods === periodValues.STOPPED && (
          <PeriodStoppedAge formikProps={formikProps as FormikProps<PeriodStoppedAgeData>} />
        )}
        {formikProps.values.havingPeriods === periodValues.PREGNANT && (
          <WeeksPregnant formikProps={formikProps as FormikProps<WeeksPregnantData>} />
        )}
      </>
    );
  }
}
