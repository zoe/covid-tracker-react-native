import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import { OtherSymptomsQuestions, TOtherSymptomsData } from '@covid/features/assessment/fields/OtherSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/services';
import { RouteProp } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<ScreenParamList, 'OtherSymptoms'>;
};

export const OtherSymptomsScreen: React.FC<TProps> = ({ route }) => {
  function onSubmit(values: TOtherSymptomsData, formikHelpers: FormikHelpers<TOtherSymptomsData>) {
    assessmentService.saveAssessment(OtherSymptomsQuestions.createAssessment(values));
    assessmentCoordinator.gotoNextScreen(route.name);
    formikHelpers.setSubmitting(false);
  }

  const validationSchema = Yup.object().shape({}).concat(OtherSymptomsQuestions.createValidationSchema());

  return (
    <Screen
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="other-symptoms-screen"
    >
      <Formik
        initialValues={{
          ...OtherSymptomsQuestions.getInitialFormValues(),
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          return (
            <Form>
              <ProgressHeader currentStep={5} maxSteps={6} title={i18n.t('describe-symptoms.other-symptoms')} />
              <OtherSymptomsQuestions formikProps={formikProps} />

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
