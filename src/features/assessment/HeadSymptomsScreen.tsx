import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { HeadSymptomsQuestions, THeadSymptomsData } from '@covid/features/assessment/fields/HeadSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { assessmentService } from '@covid/services';
import { RouteProp } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<TScreenParamList, 'HeadSymptoms'>;
};

export const HeadSymptomsScreen: React.FC<TProps> = ({ route }) => {
  function onSubmit(values: THeadSymptomsData, formikHelpers: FormikHelpers<THeadSymptomsData>) {
    assessmentService.saveAssessment(HeadSymptomsQuestions.createAssessment(values));
    assessmentCoordinator.gotoNextScreen(route.name);
    formikHelpers.setSubmitting(false);
  }

  const registerSchema = Yup.object().shape({}).concat(HeadSymptomsQuestions.schema());
  return (
    <Screen
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="head-symptoms-screen"
    >
      <Formik
        initialValues={{
          ...HeadSymptomsQuestions.initialFormValues(),
        }}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
      >
        {(formikProps) => {
          return (
            <Form>
              <ProgressHeader currentStep={2} maxSteps={6} title={i18n.t('describe-symptoms.head-symptoms')} />
              <HeadSymptomsQuestions formikProps={formikProps} />
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
