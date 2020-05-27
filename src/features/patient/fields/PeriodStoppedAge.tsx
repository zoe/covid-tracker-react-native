import { FormikProps } from 'formik';
import { Item, Label } from 'native-base';
import React, { Component } from 'react';

import { FieldWrapper } from '@covid/components/Screen';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import i18n from '@covid/locale/i18n';
import { LabelText } from '@covid/components/Text';

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
      <FieldWrapper>
        <LabelText>{i18n.t('your-health.period-stopped-age')}</LabelText>
        <ValidatedTextInput
          placeholder={i18n.t('placeholder-optional')}
          value={formikProps.values.periodStoppedAge}
          onChangeText={formikProps.handleChange('periodStoppedAge')}
          onBlur={formikProps.handleBlur('periodStoppedAge')}
          error={formikProps.touched.periodStoppedAge && formikProps.errors.periodStoppedAge}
          returnKeyType="next"
          keyboardType="numeric"
        />
        {!!formikProps.errors.periodStoppedAge && formikProps.submitCount > 0 && (
          <ValidationError error={formikProps.errors.periodStoppedAge} />
        )}
      </FieldWrapper>
    );
  }
}
