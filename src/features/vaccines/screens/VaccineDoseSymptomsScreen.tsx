import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { InlineNeedle } from '@covid/components/InlineNeedle';
import { Screen } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { DoseSymptomsQuestions, TDoseSymptomsData } from '@covid/features/vaccines/questions/DoseSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import { Formik } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<TScreenParamList, 'VaccineDoseSymptoms'>;
};

export const VaccineDoseSymptomsScreen: React.FC<TProps> = ({ route }) => {
  const [isSubmitting, setSubmitting] = React.useState(false);

  const onSubmit = async (values: TDoseSymptomsData) => {
    if (!isSubmitting) {
      setSubmitting(true);
      try {
        const dosePayload = DoseSymptomsQuestions.createDoseSymptoms(values);
        dosePayload.dose = route.params?.dose;
        await vaccineService.saveDoseSymptoms(route.params?.assessmentData?.patientData?.patientId, dosePayload);
      } catch (e) {}
      assessmentCoordinator.gotoNextScreen(route.name);
    }
  };

  const registerSchema = Yup.object().shape({}).concat(DoseSymptomsQuestions.schema());
  return (
    <Screen
      backgroundColor={colors.backgroundPrimary}
      profile={route.params?.assessmentData?.patientData?.patientState?.profile}
      testID="vaccine-dose-symptoms-screen"
    >
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <InlineNeedle />
        <RegularText>{i18n.t('vaccines.dose-symptoms.label')}</RegularText>
      </View>

      <HeaderText>
        <HeaderText>{i18n.t('vaccines.dose-symptoms.title-1')}</HeaderText>
        <HeaderText style={{ color: colors.purple }}>{i18n.t('vaccines.dose-symptoms.title-2')}</HeaderText>
        <HeaderText>{i18n.t('vaccines.dose-symptoms.title-3')}</HeaderText>
      </HeaderText>

      <Formik
        initialValues={{
          ...DoseSymptomsQuestions.initialFormValues(),
        }}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
      >
        {(formikProps) => {
          return (
            <Form>
              <DoseSymptomsQuestions formikProps={formikProps} />

              <View style={{ flex: 1 }} />

              <BrandedButton
                enabled={!isSubmitting}
                loading={isSubmitting}
                onPress={formikProps.handleSubmit}
                style={styles.marginTop}
              >
                {i18n.t('vaccines.dose-symptoms.next')}
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: sizes.m,
  },
});
