import { BrandedButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { ScreenParamList } from '@covid/features';
import {
  GeneralSymptomsData,
  GeneralSymptomsQuestions,
} from '@covid/features/assessment/fields/GeneralSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { assessmentService } from '@covid/Services';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikHelpers } from 'formik';
import { Form } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'GeneralSymptoms'>;
  route: RouteProp<ScreenParamList, 'GeneralSymptoms'>;
};

export const GeneralSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const localisationService = useInjection<ILocalisationService>(Services.Localisation);
  const features = localisationService.getConfig();
  const { hasHayfever } = route.params.assessmentData.patientData.patientState;
  const registerSchema = Yup.object().shape({}).concat(GeneralSymptomsQuestions.schema());

  function onSubmit(values: GeneralSymptomsData, formikHelpers: FormikHelpers<GeneralSymptomsData>) {
    assessmentService.saveAssessment(GeneralSymptomsQuestions.createAssessment(values, hasHayfever));
    assessmentCoordinator.gotoNextScreen(route.name);
    formikHelpers.setSubmitting(false);
  }

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;

  return (
    <Screen navigation={navigation} profile={currentPatient.profile}>
      <Header>
        <HeaderText>{i18n.t('describe-symptoms.general-symptoms')}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus maxSteps={6} step={1} />
      </ProgressBlock>

      <Formik
        initialValues={{
          ...GeneralSymptomsQuestions.initialFormValues(features.defaultTemperatureUnit),
        }}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
      >
        {(props) => {
          return (
            <Form style={{ flexGrow: 1 }}>
              <View style={{ marginHorizontal: 16 }}>
                <GeneralSymptomsQuestions formikProps={props} hasHayfever={hasHayfever} />
              </View>
              <View style={{ flex: 1 }} />
              <BrandedButton enable={!props.isSubmitting} loading={props.isSubmitting} onPress={props.handleSubmit}>
                {i18n.t('describe-symptoms.next')}
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};
