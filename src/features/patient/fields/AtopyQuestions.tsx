import { FormikProps } from 'formik';
import React, { Component } from 'react';
import { View } from 'react-native';

import i18n from '@covid/locale/i18n';
import YesNoField from '@covid/components/YesNoField';

export interface AtopyData {
  hasHayfever: string;
  hasEczema: string;
  hasAsthma: string;
  hasLungDisease: string;
}

interface Props {
  formikProps: FormikProps<AtopyData>;
}

export class AtopyQuestions extends Component<Props, object> {
  static initialFormValues = () => {
    return {
      hasHayfever: 'no',
      hasEczema: 'no',
      hasAsthma: 'no',
      hasLungDisease: 'no',
    };
  };

  render() {
    return (
      <View>
        <YesNoField
          selectedValue={this.props.formikProps.values.hasHayfever}
          onValueChange={this.props.formikProps.handleChange('hasHayfever')}
          label={i18n.t('your-health.have-hayfever')}
        />

        <YesNoField
          selectedValue={this.props.formikProps.values.hasEczema}
          onValueChange={this.props.formikProps.handleChange('hasEczema')}
          label={i18n.t('your-health.have-eczema')}
        />

        <YesNoField
          selectedValue={this.props.formikProps.values.hasAsthma}
          onValueChange={this.props.formikProps.handleChange('hasAsthma')}
          label={i18n.t('your-health.have-asthma')}
        />

        <YesNoField
          selectedValue={this.props.formikProps.values.hasLungDisease}
          onValueChange={this.props.formikProps.handleChange('hasLungDisease')}
          label={i18n.t('your-health.have-lung-disease')}
        />
      </View>
    );
  }
}
