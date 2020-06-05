import DropdownField from '@covid/components/DropdownField';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import React, { Component } from 'react';
import { View } from 'react-native';

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
        <DropdownField
          selectedValue={this.props.formikProps.values.hasHayfever}
          onValueChange={this.props.formikProps.handleChange('hasHayfever')}
          label={i18n.t('your-health.have-hayfever')}
        />

        <DropdownField
          selectedValue={this.props.formikProps.values.hasEczema}
          onValueChange={this.props.formikProps.handleChange('hasEczema')}
          label={i18n.t('your-health.have-eczema')}
        />

        <DropdownField
          selectedValue={this.props.formikProps.values.hasAsthma}
          onValueChange={this.props.formikProps.handleChange('hasAsthma')}
          label={i18n.t('your-health.have-asthma')}
        />

        <DropdownField
          selectedValue={this.props.formikProps.values.hasLungDisease}
          onValueChange={this.props.formikProps.handleChange('hasLungDisease')}
          label={i18n.t('your-health.have-lung-disease')}
        />
      </View>
    );
  }
}
