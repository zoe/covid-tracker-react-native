import { FormikProps } from 'formik';
import { Item, Label } from 'native-base';
import React, { Component } from 'react';

import { FieldWrapper } from '../../../components/Screen';
import { ValidatedTextInput } from '../../../components/ValidatedTextInput';
import { ValidationError } from '../../../components/ValidationError';
import i18n from '../../../locale/i18n';

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
        <Item
          stackedLabel
          style={{
            borderColor: 'transparent',
          }}>
          <Label>{i18n.t('your-health.weeks-pregnant')}</Label>
          <ValidatedTextInput
            placeholder={i18n.t('placeholder-optional')}
            value={formikProps.values.weeksPregnant}
            onChangeText={formikProps.handleChange('weeksPregnant')}
            onBlur={formikProps.handleBlur('weeksPregnant')}
            error={formikProps.touched.weeksPregnant && formikProps.errors.weeksPregnant}
            returnKeyType="next"
            keyboardType="numeric"
          />
        </Item>
        {!!formikProps.errors.weeksPregnant && formikProps.submitCount > 0 && (
          <ValidationError error={formikProps.errors.weeksPregnant} />
        )}
      </FieldWrapper>
    );
  }
}
