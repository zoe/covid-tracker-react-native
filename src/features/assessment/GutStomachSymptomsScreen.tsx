import { BrandedButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import {
  GutStomachSymptomsData,
  GutStomachSymptomsQuestions,
} from '@covid/features/assessment/fields/GutStomachSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Form } from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'GutStomachSymptoms'>;
  route: RouteProp<ScreenParamList, 'GutStomachSymptoms'>;
};

export const GutStomachSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (formData: GutStomachSymptomsData) => {
    assessmentService.saveAssessment(GutStomachSymptomsQuestions.createAssessment(formData));
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const registerSchema = Yup.object().shape({}).concat(GutStomachSymptomsQuestions.schema());

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <>
      <Screen navigation={navigation} profile={currentPatient.profile}>
        <Header>
          <HeaderText>{i18n.t('describe-symptoms.gut-stomach-symptoms')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={6} step={4} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...GutStomachSymptomsQuestions.initialFormValues(),
          }}
          onSubmit={(values: GutStomachSymptomsData) => handleSubmit(values)}
          validationSchema={registerSchema}
        >
          {(props) => {
            return (
              <Form style={{ flexGrow: 1 }}>
                <View style={{ marginHorizontal: 16 }}>
                  <GutStomachSymptomsQuestions formikProps={props} />
                </View>

                <View style={{ flex: 1 }} />
                <BrandedButton
                  enable={!props.isSubmitting}
                  hideLoading={!props.isSubmitting}
                  onPress={props.handleSubmit}
                >
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
