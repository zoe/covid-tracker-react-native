import { BrandedButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { LocalisationService } from '@covid/core/localisation/LocalisationService';
import { ScreenParamList } from '@covid/features';
import {
  GeneralSymptomsQuestions,
  TGeneralSymptomsData,
} from '@covid/features/assessment/fields/GeneralSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  navigation: StackNavigationProp<ScreenParamList, 'GeneralSymptoms'>;
  route: RouteProp<ScreenParamList, 'GeneralSymptoms'>;
};

export function GeneralSymptomsScreen(props: TProps) {
  const initialValues = GeneralSymptomsQuestions.initialFormValues(
    LocalisationService.countryConfig.defaultTemperatureUnit,
  );
  const validationSchema = Yup.object().shape({}).concat(GeneralSymptomsQuestions.schema());

  function onSubmit(values: TGeneralSymptomsData, formikHelpers: FormikHelpers<TGeneralSymptomsData>) {
    assessmentService.saveAssessment(
      GeneralSymptomsQuestions.createAssessment(
        values,
        props.route.params.assessmentData.patientData.patientState.hasHayfever,
      ),
    );
    assessmentCoordinator.gotoNextScreen(props.route.name);
    formikHelpers.setSubmitting(false);
  }

  return (
    <Screen
      navigation={props.navigation}
      profile={assessmentCoordinator.assessmentData.patientData.patientState.profile}
    >
      <Header>
        <HeaderText>{i18n.t('describe-symptoms.general-symptoms')}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus maxSteps={6} step={1} />
      </ProgressBlock>

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(formikProps) => (
          <View style={{ flexGrow: 1 }}>
            <View style={{ marginHorizontal: 16 }}>
              <GeneralSymptomsQuestions
                formikProps={formikProps}
                hasHayfever={props.route.params.assessmentData.patientData.patientState.hasHayfever}
              />
            </View>
            <View style={{ flex: 1 }} />
            <BrandedButton
              enable={!formikProps.isSubmitting}
              hideLoading={!formikProps.isSubmitting}
              onPress={formikProps.handleSubmit}
            >
              {i18n.t('describe-symptoms.next')}
            </BrandedButton>
          </View>
        )}
      </Formik>
    </Screen>
  );
}
