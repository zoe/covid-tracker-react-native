import { FormikProps } from 'formik';
import { Item, Label } from 'native-base';
import React, { Component } from 'react';

import { FieldWrapper } from '@covid/components/Screen';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import i18n from '@covid/locale/i18n';
import { LabelText } from '@covid/components/Text';

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
      <FieldWrapper>
        <LabelText>{i18n.t('your-health.weeks-pregnant')}</LabelText>
        <ValidatedTextInput
          placeholder={i18n.t('placeholder-optional')}
          value={formikProps.values.weeksPregnant}
          onChangeText={formikProps.handleChange('weeksPregnant')}
          onBlur={formikProps.handleBlur('weeksPregnant')}
          error={formikProps.touched.weeksPregnant && formikProps.errors.weeksPregnant}
          returnKeyType="next"
          keyboardType="numeric"
        />
        {!!formikProps.errors.weeksPregnant && formikProps.submitCount > 0 && (
          <ValidationError error={formikProps.errors.weeksPregnant} />
        )}
      </FieldWrapper>
    );
  }
}
