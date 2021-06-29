import { Button } from '@covid/components/buttons/Button';
import { GenericTextField } from '@covid/components/GenericTextField';
import { ValidationError } from '@covid/components/ValidationError';
import { PatientData } from '@covid/core/patient/PatientData';
import { schoolService } from '@covid/core/schools/SchoolService';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

interface IProps {
  patientData: PatientData;
}

function SchoolForm({ patientData }: IProps) {
  const validationSchema = Yup.object().shape({
    schoolCode: Yup.string()
      .required('Please enter your school code.')
      .matches(/^[a-zA-Z0-9_-]{7}$/, 'Code contains seven characters'),
  });

  return (
    <Formik
      initialValues={{ schoolCode: '' }}
      onSubmit={async ({ schoolCode }, FormikProps) => {
        try {
          const response = await schoolService.getSchoolById(schoolCode);
          NavigatorService.navigate('ConfirmSchool', {
            patientData,
            school: response[0],
          });
        } catch (error) {
          FormikProps.setFieldError('schoolId', 'Incorrect code');
        }
      }}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form style={styles.formContainer}>
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
        </Form>
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
