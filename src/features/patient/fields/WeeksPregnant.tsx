import { GenericTextField } from '@covid/components/GenericTextField';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import React, { Component } from 'react';

export interface WeeksPregnantData {
  weeksPregnant: string;
}

interface Props {
  formikProps: FormikProps<WeeksPregnantData>;
}

export class WeeksPregnant extends Component<Props, object> {
  render() {
    const formikProps = this.props.formikProps;
    return (
      <GenericTextField
        formikProps={formikProps}
        label={i18n.t('your-health.weeks-pregnant')}
        placeholder={i18n.t('placeholder-optional')}
        name="weeksPregnant"
        keyboardType="numeric"
        showError
      />
    );
  }
}
