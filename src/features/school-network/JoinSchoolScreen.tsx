import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import { colors } from '@theme';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { GenericTextField } from '@covid/components/GenericTextField';
import Screen from '@covid/components/Screen';
import { Button } from '@covid/components/Buttons/Button';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import i18n from '@covid/locale/i18n';
import { ValidationError } from '@covid/components/ValidationError';
import NavigatorService from '@covid/NavigatorService';

import { JoinHeader } from './partials';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'JoinSchool'>;
  route: RouteProp<ScreenParamList, 'JoinSchool'>;
}

function JoinSchoolScreen({ route, navigation }: IProps) {
  const service = useInjection<ISchoolService>(Services.SchoolService);
  const currentPatient = route.params.patientData.patientState;

  const validationSchema = Yup.object().shape({
    schoolCode: Yup.string()
      .required('Please enter your school code.')
      .matches(/^[a-zA-Z0-9_-]{7}$/, 'Code contains seven characters'),
  });

  return (
    <Screen profile={currentPatient.profile} navigation={navigation} simpleCallout>
      <JoinHeader
        headerText="school-networks.join-school.school-code-title"
        bodyText="school-networks.join-school.school-code-instructions"
        currentStep={1}
        maxSteps={4}
      />
      <Formik
        initialValues={{ schoolCode: '' }}
        validationSchema={validationSchema}
        onSubmit={async ({ schoolCode }, FormikProps) => {
          try {
            // setIsLoading(true);
            const response = await service.getSchoolById(schoolCode);
            NavigatorService.navigate('ConfirmSchool', {
              patientData: route.params.patientData,
              school: response[0],
            });
          } catch (error) {
            FormikProps.setFieldError('schoolId', 'Incorrect code');
          }
        }}>
        {(formikProps) => (
          <Form style={styles.formContainer}>
            <View>
              <View style={{ height: 16 }} />
              <GenericTextField
                formikProps={formikProps}
                placeholder={i18n.t('school-networks.join-school.school-code-placeholder')}
                maxLength={7}
                name="schoolCode"
                showError
              />
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginHorizontal: 16,
  },
  primaryButton: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: colors.brand,
  },
  primaryButtonText: {
    color: colors.white,
  },
});

export default JoinSchoolScreen;
