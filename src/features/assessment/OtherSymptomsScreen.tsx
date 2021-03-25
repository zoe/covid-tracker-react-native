import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
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
import { OtherSymptomsData, OtherSymptomsQuestions } from '@covid/features/assessment/fields/OtherSymptomsQuestions';
import { BrandedButton } from '@covid/components';
import { ScreenParamList } from '@covid/features';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'OtherSymptoms'>;
  route: RouteProp<ScreenParamList, 'OtherSymptoms'>;
};

export const OtherSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (formData: OtherSymptomsData) => {
    assessmentService.saveAssessment(OtherSymptomsQuestions.createAssessment(formData));
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const registerSchema = Yup.object().shape({}).concat(OtherSymptomsQuestions.schema());

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('describe-symptoms.other-symptoms')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={5} maxSteps={6} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...OtherSymptomsQuestions.initialFormValues(),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: OtherSymptomsData) => handleSubmit(values)}>
          {(props) => {
            return (
              <Form style={{ flexGrow: 1 }}>
                <View style={{ marginHorizontal: 16 }}>
                  <OtherSymptomsQuestions formikProps={props} />
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
