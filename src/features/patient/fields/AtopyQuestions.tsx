import YesNoField from '@covid/components/YesNoField';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import React, { Component } from 'react';
import { View } from 'react-native';

export interface IAtopyData {
  hasHayfever: string;
  hasEczema: string;
  hasAsthma: string;
  hasLungDisease: string;
}

interface Props {
  formikProps: FormikProps<IAtopyData>;
}

export class AtopyQuestions extends Component<Props, object> {
  static initialFormValues = () => {
    return {
      hasAsthma: 'no',
      hasEczema: 'no',
      hasHayfever: 'no',
      hasLungDisease: 'no',
    };
  };

  render() {
    return (
      <View>
        <YesNoField
          label={i18n.t('your-health.have-hayfever')}
          onValueChange={this.props.formikProps.handleChange('hasHayfever')}
          selectedValue={this.props.formikProps.values.hasHayfever}
        />

        <YesNoField
          label={i18n.t('your-health.have-eczema')}
          onValueChange={this.props.formikProps.handleChange('hasEczema')}
          selectedValue={this.props.formikProps.values.hasEczema}
        />

        <YesNoField
          label={i18n.t('your-health.have-asthma')}
          onValueChange={this.props.formikProps.handleChange('hasAsthma')}
          selectedValue={this.props.formikProps.values.hasAsthma}
        />

        <YesNoField
          label={i18n.t('your-health.have-lung-disease')}
          onValueChange={this.props.formikProps.handleChange('hasLungDisease')}
          selectedValue={this.props.formikProps.values.hasLungDisease}
        />
      </View>
    );
  }
}
