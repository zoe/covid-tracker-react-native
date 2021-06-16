import { SubmitButton } from '@covid/components';
import { InlineNeedle } from '@covid/components/InlineNeedle';
import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { IVaccineService } from '@covid/core/vaccine/VaccineService';
import { ScreenParamList } from '@covid/features';
import { DoseSymptomsData, DoseSymptomsQuestions } from '@covid/features/vaccines/fields/DoseSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineDoseSymptoms'>;
  route: RouteProp<ScreenParamList, 'VaccineDoseSymptoms'>;
};

const initialValues = {
  ...DoseSymptomsQuestions.initialFormValues(),
};

const validationSchema = Yup.object().shape({}).concat(DoseSymptomsQuestions.schema());

export function VaccineDoseSymptomsScreen(props: TProps) {
  const [errorMessage, setErrorMessage] = React.useState('');
  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);

  async function onSubmit(values: DoseSymptomsData) {
    try {
      const dosePayload = DoseSymptomsQuestions.createDoseSymptoms(values);
      dosePayload.dose = props.route.params.dose;
      await vaccineService.saveDoseSymptoms(props.route.params.assessmentData.patientData.patientId, dosePayload);
      assessmentCoordinator.gotoNextScreen(props.route.name);
    } catch (_) {
      setErrorMessage(i18n.t('something-went-wrong'));
    }
  }

  return (
    <Screen navigation={props.navigation} profile={props.route.params.assessmentData.patientData.patientState.profile}>
      <Header>
        <View style={styles.view}>
          <InlineNeedle />
          <RegularText>{i18n.t('vaccines.dose-symptoms.label')}</RegularText>
        </View>

        <HeaderText>
          <HeaderText>{i18n.t('vaccines.dose-symptoms.title-1')}</HeaderText>
          <HeaderText style={styles.purple}>{i18n.t('vaccines.dose-symptoms.title-2')}</HeaderText>
          <HeaderText>{i18n.t('vaccines.dose-symptoms.title-3')}</HeaderText>
        </HeaderText>
      </Header>

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(props) => {
          return (
            <View style={styles.flexGrow}>
              <DoseSymptomsQuestions formikProps={props} style={styles.questions} />

              <SubmitButton
                enable={!props.isSubmitting}
                errorMessage={errorMessage}
                loading={props.isSubmitting}
                onPress={props.handleSubmit}
                style={styles.button}
              >
                {i18n.t('vaccines.dose-symptoms.next')}
              </SubmitButton>
            </View>
          );
        }}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
    marginTop: 'auto',
  },
  flexGrow: {
    flexGrow: 1,
  },
  purple: {
    color: colors.purple,
  },
  questions: {
    margin: 16,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
