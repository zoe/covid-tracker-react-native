import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Form } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import {
  GeneralSymptomsData,
  GeneralSymptomsQuestions,
} from '@covid/features/assessment/fields/GeneralSymptomsQuestions';
import { useInjection } from '@covid/provider/services.hooks';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { Services } from '@covid/provider/services.types';
import { ScreenParamList } from '@covid/features';
import { BrandedButton } from '@covid/components';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'GeneralSymptoms'>;
  route: RouteProp<ScreenParamList, 'GeneralSymptoms'>;
};

export const GeneralSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const localisationService = useInjection<ILocalisationService>(Services.Localisation);
  const features = localisationService.getConfig();
  const hasHayfever = route.params.assessmentData.patientData.patientState.hasHayfever;
  const registerSchema = Yup.object().shape({}).concat(GeneralSymptomsQuestions.schema());
  const isFocused = useIsFocused();

  useEffect(() => {
    setSubmitting(false);
  }, [isFocused]);

  const handleSubmit = (formData: GeneralSymptomsData) => {
    setSubmitting(true);
    assessmentService.saveAssessment(GeneralSymptomsQuestions.createAssessment(formData, hasHayfever));
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;

  return (
    <>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('describe-symptoms.general-symptoms')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={1} maxSteps={6} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...GeneralSymptomsQuestions.initialFormValues(features.defaultTemperatureUnit),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: GeneralSymptomsData) => handleSubmit(values)}
        >
          {(props) => {
            return (
              <Form style={{ flexGrow: 1 }}>
                <View style={{ marginHorizontal: 16 }}>
                  <GeneralSymptomsQuestions formikProps={props} hasHayfever={hasHayfever} />
                </View>
                <View style={{ flex: 1 }} />
                <BrandedButton onPress={props.handleSubmit} hideLoading={!isSubmitting} enable={!isSubmitting}>
                  {i18n.t('describe-symptoms.next')}
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    </>
  );
};
