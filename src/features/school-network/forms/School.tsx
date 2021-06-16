import { Button } from '@covid/components/buttons/Button';
import { GenericTextField } from '@covid/components/GenericTextField';
import { ValidationError } from '@covid/components/ValidationError';
import { PatientData } from '@covid/core/patient/PatientData';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

interface IProps {
  patientData: PatientData;
}

interface IValues {
  schoolCode: string;
}

const initialValues: IValues = { schoolCode: '' };

function SchoolForm({ patientData }: IProps) {
  const service = useInjection<ISchoolService>(Services.SchoolService);

  const validationSchema = Yup.object().shape({
    schoolCode: Yup.string()
      .required('Please enter your school code.')
      .matches(/^[a-zA-Z0-9_-]{7}$/, 'Code contains seven characters'),
  });

  async function onSubmit(values: IValues, formikHelpers: FormikHelpers<IValues>) {
    try {
      const response = await service.getSchoolById(values.schoolCode);
      NavigatorService.navigate('ConfirmSchool', {
        patientData,
        school: response[0],
      });
    } catch (error) {
      formikHelpers.setFieldError('schoolId', 'Incorrect code');
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(formikProps) => (
        <View style={styles.formContainer}>
          <View style={{ margin: 16 }}>
            <GenericTextField
              showError
              formikProps={formikProps}
              maxLength={7}
              name="schoolCode"
              placeholder={i18n.t('school-networks.join-school.school-code-placeholder')}
            />
            {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
              <ValidationError error={i18n.t('validation-error-text')} />
            ) : null}
          </View>

          <Button branded onPress={formikProps.handleSubmit}>
            {i18n.t('school-networks.join-school.cta')}
          </Button>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default SchoolForm;
