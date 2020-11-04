import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import { Button } from '@covid/components/Buttons/Button';
import { GenericTextField } from '@covid/components/GenericTextField';
import { ValidationError } from '@covid/components/ValidationError';
import { PatientData } from '@covid/core/patient/PatientData';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import NavigatorService from '@covid/NavigatorService';

interface IProps {
  patientData: PatientData;
}

function SchoolForm({ patientData }: IProps) {
  const service = useInjection<ISchoolService>(Services.SchoolService);

  const validationSchema = Yup.object().shape({
    schoolCode: Yup.string()
      .required('Please enter your school code.')
      .matches(/^[a-zA-Z0-9_-]{7}$/, 'Code contains seven characters'),
  });

  return (
    <Formik
      initialValues={{ schoolCode: '' }}
      validationSchema={validationSchema}
      onSubmit={async ({ schoolCode }, FormikProps) => {
        try {
          // setIsLoading(true);
          const response = await service.getSchoolById(schoolCode);
          NavigatorService.navigate('ConfirmSchool', {
            patientData,
            school: response[0],
          });
        } catch (error) {
          FormikProps.setFieldError('schoolId', 'Incorrect code');
        }
      }}>
      {(formikProps) => (
        <Form style={styles.formContainer}>
          <View>
            <View style={{ marginTop: 16 }}>
              <GenericTextField
                formikProps={formikProps}
                placeholder={i18n.t('school-networks.join-school.school-code-placeholder')}
                maxLength={7}
                name="schoolCode"
                showError
              />
            </View>
          </View>
          <View>
            {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 && (
              <ValidationError style={{ marginHorizontal: 16 }} error={i18n.t('validation-error-text')} />
            )}
            <Button onPress={formikProps.handleSubmit} branded>
              {i18n.t('school-networks.join-school.cta')}
            </Button>
          </View>
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
