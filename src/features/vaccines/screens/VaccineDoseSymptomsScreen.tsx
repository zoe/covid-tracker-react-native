import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { InlineNeedle } from '@covid/components/InlineNeedle';
import { Screen } from '@covid/components/Screen';
import { ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { useAddDoseSymptomsMutation } from '@covid/core/api/vaccineApi';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
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
  const [addDoseSymptoms, { isLoading: isSubmitting, isError }] = useAddDoseSymptomsMutation();

  const onSubmit = async (values: TDoseSymptomsData) => {
    if (!isSubmitting) {
      const dosePayload = DoseSymptomsQuestions.createDoseSymptoms(values);
      dosePayload.dose = route.params?.dose;

      await addDoseSymptoms({
        patientId: route.params?.assessmentData?.patientData?.patientId,
        payload: dosePayload,
      });

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

              {isError ? <ErrorText style={{ textAlign: 'center' }}>{i18n.t('something-went-wrong')}</ErrorText> : null}

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
