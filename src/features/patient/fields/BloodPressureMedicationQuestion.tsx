import { FormikProps } from 'formik';
import React, { Component } from 'react';
import { View } from 'react-native';

import i18n from '@covid/locale/i18n';
import YesNoField from '@covid/components/YesNoField';

export interface BloodPressureData {
  takesBloodPressureMedications: string; // pril
  takesAnyBloodPressureMedications: string;
  takesBloodPressureMedicationsSartan: string;
}

interface Props {
  formikProps: FormikProps<BloodPressureData>;
}

export class BloodPressureMedicationQuestion extends Component<Props, object> {
  static initialFormValues = () => {
    return {
      takesBloodPressureMedications: 'no', // pril
      takesAnyBloodPressureMedications: 'no',
      takesBloodPressureMedicationsSartan: 'no',
    };
  };

  render() {
    return (
      <View>
        <YesNoField
          selectedValue={this.props.formikProps.values.takesAnyBloodPressureMedications}
          onValueChange={this.props.formikProps.handleChange('takesAnyBloodPressureMedications')}
          label={i18n.t('your-health.takes-any-blood-pressure-medication')}
          error={
            this.props.formikProps.touched.takesAnyBloodPressureMedications &&
            this.props.formikProps.errors.takesAnyBloodPressureMedications
          }
        />

        {this.props.formikProps.values.takesAnyBloodPressureMedications === 'yes' && (
          <>
            <YesNoField
              selectedValue={this.props.formikProps.values.takesBloodPressureMedications}
              onValueChange={this.props.formikProps.handleChange('takesBloodPressureMedications')}
              label={i18n.t('your-health.takes-pril-blood-pressure-medication')}
            />

            <YesNoField
              selectedValue={this.props.formikProps.values.takesBloodPressureMedicationsSartan}
              onValueChange={this.props.formikProps.handleChange('takesBloodPressureMedicationsSartan')}
              label={i18n.t('your-health.takes-sartan-blood-pressure-medication')}
            />
          </>
        )}
      </View>
    );
  }
}
