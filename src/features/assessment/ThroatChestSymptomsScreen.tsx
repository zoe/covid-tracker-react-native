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
  ThroatChestSymptomsData,
  ThroatChestSymptomsQuestions,
} from '@covid/features/assessment/fields/ThroatChestSymptomsQuestions';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ThroatChestSymptoms'>;
  route: RouteProp<ScreenParamList, 'ThroatChestSymptoms'>;
};

export const ThroatChestSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (formData: ThroatChestSymptomsData) => {
    await assessmentService.saveAssessment(ThroatChestSymptomsQuestions.createAssessment(formData));
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const registerSchema = Yup.object().shape({}).concat(ThroatChestSymptomsQuestions.schema());

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('describe-symptoms.throat-chest-symptoms')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={3} maxSteps={5} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...ThroatChestSymptomsQuestions.initialFormValues(),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: ThroatChestSymptomsData) => handleSubmit(values)}>
          {(props) => {
            return (
              <Form style={{ flexGrow: 1 }}>
                <ThroatChestSymptomsQuestions formikProps={props} />
                <View style={{ flex: 1 }} />
                <BrandedButton onPress={props.handleSubmit} hideLoading={!props.isSubmitting}>
                  {i18n.t('diet-study.next-section')}
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    </>
  );
};
