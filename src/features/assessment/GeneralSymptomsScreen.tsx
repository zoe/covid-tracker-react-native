import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { localisationService } from '@covid/core/localisation/LocalisationService';
import { ScreenParamList } from '@covid/features';
import {
  GeneralSymptomsQuestions,
  TGeneralSymptomsData,
} from '@covid/features/assessment/fields/GeneralSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/services';
import { RouteProp } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<ScreenParamList, 'GeneralSymptoms'>;
};

export const GeneralSymptomsScreen: React.FC<TProps> = ({ route }) => {
  const config = localisationService.getConfig();
  const validationSchema = Yup.object().shape({}).concat(GeneralSymptomsQuestions.createValidationSchema());

  const patientState = route.params?.assessmentData?.patientData?.patientState;

  function onSubmit(values: TGeneralSymptomsData, formikHelpers: FormikHelpers<TGeneralSymptomsData>) {
    assessmentService.saveAssessment(GeneralSymptomsQuestions.createAssessment(values, patientState?.hasHayfever));
    assessmentCoordinator.gotoNextScreen(route.name);
    formikHelpers.setSubmitting(false);
  }

  return (
    <Screen profile={patientState?.profile} testID="general-symptoms-screen">
      <Formik
        initialValues={{
          ...GeneralSymptomsQuestions.getInitialFormValues(config?.defaultTemperatureUnit),
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          return (
            <Form>
              <ProgressHeader currentStep={1} maxSteps={6} title={i18n.t('describe-symptoms.general-symptoms')} />
              <GeneralSymptomsQuestions formikProps={formikProps} hasHayfever={patientState?.hasHayfever} />
              <View style={{ flex: 1 }} />
              <BrandedButton
                enabled={!formikProps.isSubmitting}
                loading={formikProps.isSubmitting}
                onPress={formikProps.handleSubmit}
                testID="button-submit"
              >
                {i18n.t('describe-symptoms.next')}
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};
