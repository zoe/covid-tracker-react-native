import { BrandedButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import {
  ThroatChestSymptomsData,
  ThroatChestSymptomsQuestions,
} from '@covid/features/assessment/fields/ThroatChestSymptomsQuestions';
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
  navigation: StackNavigationProp<ScreenParamList, 'ThroatChestSymptoms'>;
  route: RouteProp<ScreenParamList, 'ThroatChestSymptoms'>;
};

export const ThroatChestSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  function onSubmit(values: ThroatChestSymptomsData, formikHelpers: FormikHelpers<ThroatChestSymptomsData>) {
    assessmentService.saveAssessment(ThroatChestSymptomsQuestions.createAssessment(values));
    assessmentCoordinator.gotoNextScreen(route.name);
    formikHelpers.setSubmitting(false);
  }

  const registerSchema = Yup.object().shape({}).concat(ThroatChestSymptomsQuestions.schema());
  return (
    <Screen
      navigation={navigation}
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="throat-chest-symptoms-screen"
    >
      <Header>
        <HeaderText>{i18n.t('describe-symptoms.throat-chest-symptoms')}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus maxSteps={6} step={3} />
      </ProgressBlock>

      <Formik
        initialValues={{
          ...ThroatChestSymptomsQuestions.initialFormValues(),
        }}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
      >
        {(props) => {
          return (
            <Form style={{ flexGrow: 1 }}>
              <View style={{ marginHorizontal: 16 }}>
                <ThroatChestSymptomsQuestions formikProps={props} />
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
