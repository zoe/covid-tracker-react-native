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
import { HeadSymptomsData, HeadSymptomsQuestions } from '@covid/features/assessment/fields/HeadSymptomsQuestions';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'HeadSymptoms'>;
  route: RouteProp<ScreenParamList, 'HeadSymptoms'>;
};

export const HeadSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (formData: HeadSymptomsData) => {
    assessmentService.saveAssessment(HeadSymptomsQuestions.createAssessment(formData));
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const registerSchema = Yup.object().shape({}).concat(HeadSymptomsQuestions.schema());

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('describe-symptoms.head-symptoms')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={2} maxSteps={6} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...HeadSymptomsQuestions.initialFormValues(),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: HeadSymptomsData) => handleSubmit(values)}>
          {(props) => {
            return (
              <Form style={{ flexGrow: 1 }}>
                <View style={{ marginHorizontal: 16 }}>
                  <HeadSymptomsQuestions formikProps={props} />
                </View>
                <View style={{ flex: 1 }} />
                <BrandedButton
                  onPress={props.handleSubmit}
                  hideLoading={!props.isSubmitting}
                  enable={!props.isSubmitting}>
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
