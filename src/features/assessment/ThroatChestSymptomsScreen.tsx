import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import {
  ThroatChestSymptomsQuestions,
  TThroatChestSymptomsData,
} from '@covid/features/assessment/fields/ThroatChestSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/services';
import { RouteProp } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<ScreenParamList, 'ThroatChestSymptoms'>;
};

export const ThroatChestSymptomsScreen: React.FC<TProps> = ({ route }) => {
  function onSubmit(values: TThroatChestSymptomsData, formikHelpers: FormikHelpers<TThroatChestSymptomsData>) {
    assessmentService.saveAssessment(ThroatChestSymptomsQuestions.createAssessment(values));
    assessmentCoordinator.gotoNextScreen(route.name);
    formikHelpers.setSubmitting(false);
  }

  const validationSchema = Yup.object().shape({}).concat(ThroatChestSymptomsQuestions.createValidationSchema());

  return (
    <Screen
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="throat-chest-symptoms-screen"
    >
      <Formik
        initialValues={{
          ...ThroatChestSymptomsQuestions.getInitialFormValues(),
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          return (
            <Form>
              <ProgressHeader currentStep={3} maxSteps={6} title={i18n.t('describe-symptoms.throat-chest-symptoms')} />
              <ThroatChestSymptomsQuestions formikProps={formikProps} />

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
