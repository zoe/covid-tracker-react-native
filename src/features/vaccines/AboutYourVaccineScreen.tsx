import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Text } from 'native-base';
import key from 'weak-key';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { colors } from '@theme';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { vaccineService } from '@covid/Services';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { ValidationError } from '@covid/components/ValidationError';
import { VaccineDateData, VaccineDateQuestion } from '@covid/features/vaccines/fields/VaccineDateQuestion';

import { IVaccineService } from '../../core/vaccine/VaccineService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'AboutYourVaccine'>;
  route: RouteProp<ScreenParamList, 'AboutYourVaccine'>;
};

interface AboutYourVaccineData extends VaccineDateData {}

export const AboutYourVaccineScreen: React.FC<Props> = ({ route, navigation }) => {
  // TODO Inject
  const vaccineService: IVaccineService = vaccineService;
  const coordinator = assessmentCoordinator;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { assessmentData } = route.params;

  const registerSchema = Yup.object().shape({}).concat(VaccineDateQuestion.schema());

  const handleAction = (formData: AboutYourVaccineData) => {
    if (!submitting) {
      setSubmitting(true);

      const vaccine = {
        ...assessmentData.vaccineData,
        patient: assessmentData.patientData.patientId,

        ...VaccineDateQuestion.createDTO(formData),
      } as Partial<VaccineRequest>;

      submitVaccine(vaccine as VaccineRequest);
    }
  };

  const submitVaccine = (vaccine: VaccineRequest) => {
    //TODO
    coordinator.gotoNextScreen(route.name);
  };

  return (
    <Screen profile={assessmentData.patientData.profile} navigation={navigation}>
      <Header>
        <HeaderText>
          {i18n.t(
            assessmentData.vaccineData ? 'covid-test.page-title-detail-update' : 'covid-test.page-title-detail-add'
          )}
        </HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus step={1} maxSteps={2} />
      </ProgressBlock>

      <Formik
        initialValues={{
          ...VaccineDateQuestion.initialFormValues(assessmentData.vaccineData),
        }}
        validationSchema={registerSchema}
        onSubmit={(values: AboutYourVaccineData) => handleAction(values)}>
        {(props) => {
          return (
            <Form>
              <View style={{ marginHorizontal: 16 }}>
                <VaccineDateQuestion formikProps={props as FormikProps<VaccineDateData>}/>

                <ErrorText>{errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}
              </View>

              <BrandedButton onPress={props.handleSubmit}>
                <Text>{i18n.t(assessmentData.vaccineData ? 'covid-test.update-test' : 'covid-test.add-test')}</Text>
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({

});
