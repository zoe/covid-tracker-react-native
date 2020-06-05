import DropdownField from '@covid/components/DropdownField';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import React, { Component } from 'react';
import { View } from 'react-native';

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
        <DropdownField
          selectedValue={this.props.formikProps.values.takesAnyBloodPressureMedications}
          onValueChange={this.props.formikProps.handleChange('takesAnyBloodPressureMedications')}
          label={i18n.t('your-health.takes-any-blood-pressure-medication')}
          error={
            this.props.formikProps.touched.takesAnyBloodPressureMedications &&
            this.props.formikProps.errors.takesAnyBloodPressureMedications
          }
          androidDefaultLabel={i18n.t('label-chose-an-option')}
        />

        {this.props.formikProps.values.takesAnyBloodPressureMedications === 'yes' && (
          <>
            <DropdownField
              selectedValue={this.props.formikProps.values.takesBloodPressureMedications}
              onValueChange={this.props.formikProps.handleChange('takesBloodPressureMedications')}
              label={i18n.t('your-health.takes-pril-blood-pressure-medication')}
            />

            <DropdownField
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
