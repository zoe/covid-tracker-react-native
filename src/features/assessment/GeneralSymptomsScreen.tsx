import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Form } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, HeaderText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import {
  GeneralSymptomsData,
  GeneralSymptomsQuestions,
} from '@covid/features/assessment/fields/GeneralSymptomsQuestions';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'GeneralSymptoms'>;
  route: RouteProp<ScreenParamList, 'GeneralSymptoms'>;
};

export const GeneralSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (formData: GeneralSymptomsData) => {
    await assessmentService.saveAssessment(GeneralSymptomsQuestions.createAssessment(formData));
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const registerSchema = Yup.object().shape({}).concat(GeneralSymptomsQuestions.schema());

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
            ...GeneralSymptomsQuestions.initialFormValues(),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: GeneralSymptomsData) => handleSubmit(values)}>
          {(props) => {
            return (
              <Form style={{ flexGrow: 1 }}>
                <View style={{ marginHorizontal: 16 }}>
                  <GeneralSymptomsQuestions
                    formikProps={props}
                    hasHayfever={route.params.assessmentData.patientData.patientState.hasHayfever}
                  />
                </View>

                <View style={{ flex: 1 }} />
                <BrandedButton onPress={props.handleSubmit} hideLoading={!props.isSubmitting}>
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
