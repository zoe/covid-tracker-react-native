import { BrandedButton } from '@covid/components';
import { InlineNeedle } from '@covid/components/InlineNeedle';
import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { ScreenParamList } from '@covid/features';
import { DoseSymptomsData, DoseSymptomsQuestions } from '@covid/features/vaccines/fields/DoseSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineDoseSymptoms'>;
  route: RouteProp<ScreenParamList, 'VaccineDoseSymptoms'>;
};

export const VaccineDoseSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSubmitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (formData: DoseSymptomsData) => {
    if (!isSubmitting) {
      setSubmitting(true);
      try {
        const dosePayload = DoseSymptomsQuestions.createDoseSymptoms(formData);
        dosePayload.dose = route.params?.dose;
        await vaccineService.saveDoseSymptoms(route.params?.assessmentData?.patientData?.patientId, dosePayload);
      } catch (e) {
        setErrorMessage(i18n.t('something-went-wrong'));
        // TODO Show error message toast?
      } finally {
        assessmentCoordinator.gotoNextScreen(route.name);
      }
    }
  };

  const registerSchema = Yup.object().shape({}).concat(DoseSymptomsQuestions.schema());
  return (
    <View style={styles.rootContainer}>
      <Screen
        navigation={navigation}
        profile={route.params?.assessmentData?.patientData?.patientState?.profile}
        testID="vaccine-dose-symptoms-screen"
      >
        <Header>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <InlineNeedle />
            <RegularText>{i18n.t('vaccines.dose-symptoms.label')}</RegularText>
          </View>

          <HeaderText>
            <HeaderText>{i18n.t('vaccines.dose-symptoms.title-1')}</HeaderText>
            <HeaderText style={{ color: colors.purple }}>{i18n.t('vaccines.dose-symptoms.title-2')}</HeaderText>
            <HeaderText>{i18n.t('vaccines.dose-symptoms.title-3')}</HeaderText>
          </HeaderText>
        </Header>

        <View>
          <Formik
            initialValues={{
              ...DoseSymptomsQuestions.initialFormValues(),
            }}
            onSubmit={(values: DoseSymptomsData) => handleSubmit(values)}
            validationSchema={registerSchema}
          >
            {(props) => {
              return (
                <Form style={{ flexGrow: 1 }}>
                  <View style={{ marginHorizontal: 16 }}>
                    <DoseSymptomsQuestions formikProps={props} />
                  </View>

                  <View style={{ flex: 1 }} />
                  <BrandedButton
                    enabled={!isSubmitting}
                    loading={isSubmitting}
                    onPress={props.handleSubmit}
                    style={styles.continueButton}
                  >
                    {i18n.t('vaccines.dose-symptoms.next')}
                  </BrandedButton>
                </Form>
              );
            }}
          </Formik>
        </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    marginBottom: 32,
    marginHorizontal: 16,
    marginTop: 16,
  },

  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
});
