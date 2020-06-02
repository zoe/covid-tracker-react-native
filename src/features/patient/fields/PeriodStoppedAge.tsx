import { GenericTextField } from '@covid/components/GenericTextField';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import React, { Component } from 'react';

export interface PeriodStoppedAgeData {
  periodStoppedAge: string;
}

interface Props {
  formikProps: FormikProps<PeriodStoppedAgeData>;
}

export class PeriodStoppedAge extends Component<Props, object> {
  render() {
    const formikProps = this.props.formikProps;
    return (
      <GenericTextField
        formikProps={formikProps}
        label={i18n.t('your-health.period-stopped-age')}
        placeholder={i18n.t('placeholder-optional')}
        name="periodStoppedage"
        keyboardType="numeric"
        showError
      />
    );
  }
}
