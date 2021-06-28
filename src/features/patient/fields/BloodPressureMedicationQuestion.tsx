import YesNoField from '@covid/components/YesNoField';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';

export interface IBloodPressureData {
  takesBloodPressureMedications: string;
  takesAnyBloodPressureMedications: string;
  takesBloodPressureMedicationsSartan: string;
}

interface Props {
  formikProps: FormikProps<IBloodPressureData>;
}

export class BloodPressureMedicationQuestion extends React.Component<Props, object> {
  static initialFormValues = () => {
    return {
      takesAnyBloodPressureMedications: 'no',
      takesBloodPressureMedications: 'no',
      takesBloodPressureMedicationsSartan: 'no',
    };
  };

  render() {
    return (
      <View>
        <YesNoField
          required
          error={
            this.props.formikProps.touched.takesAnyBloodPressureMedications &&
            this.props.formikProps.errors.takesAnyBloodPressureMedications
          }
          label={i18n.t('your-health.takes-any-blood-pressure-medication')}
          onValueChange={this.props.formikProps.handleChange('takesAnyBloodPressureMedications')}
          selectedValue={this.props.formikProps.values.takesAnyBloodPressureMedications}
        />

        {this.props.formikProps.values.takesAnyBloodPressureMedications === 'yes' ? (
          <>
            <YesNoField
              required
              label={i18n.t('your-health.takes-pril-blood-pressure-medication')}
              onValueChange={this.props.formikProps.handleChange('takesBloodPressureMedications')}
              selectedValue={this.props.formikProps.values.takesBloodPressureMedications}
            />

            <YesNoField
              required
              label={i18n.t('your-health.takes-sartan-blood-pressure-medication')}
              onValueChange={this.props.formikProps.handleChange('takesBloodPressureMedicationsSartan')}
              selectedValue={this.props.formikProps.values.takesBloodPressureMedicationsSartan}
            />
          </>
        ) : null}
      </View>
    );
  }
}
