import { BrandedButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import { HeadSymptomsData, HeadSymptomsQuestions } from '@covid/features/assessment/fields/HeadSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/services';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikHelpers } from 'formik';
import { Form } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'HeadSymptoms'>;
  route: RouteProp<ScreenParamList, 'HeadSymptoms'>;
};

export const HeadSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  function onSubmit(values: HeadSymptomsData, formikHelpers: FormikHelpers<HeadSymptomsData>) {
    assessmentService.saveAssessment(HeadSymptomsQuestions.createAssessment(values));
    assessmentCoordinator.gotoNextScreen(route.name);
    formikHelpers.setSubmitting(false);
  }

  const registerSchema = Yup.object().shape({}).concat(HeadSymptomsQuestions.schema());
  return (
    <Screen
      navigation={navigation}
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="head-symptoms-screen"
    >
      <Header>
        <HeaderText>{i18n.t('describe-symptoms.head-symptoms')}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus maxSteps={6} step={2} />
      </ProgressBlock>

      <Formik
        initialValues={{
          ...HeadSymptomsQuestions.initialFormValues(),
        }}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
      >
        {(props) => {
          return (
            <Form style={{ flexGrow: 1 }}>
              <View style={{ marginHorizontal: 16 }}>
                <HeadSymptomsQuestions formikProps={props} />
              </View>
              <View style={{ flex: 1 }} />
              <BrandedButton
                enabled={!props.isSubmitting}
                loading={props.isSubmitting}
                onPress={props.handleSubmit}
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
