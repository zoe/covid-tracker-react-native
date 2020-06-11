import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import moment from 'moment';
import { Form, Item, Label, Text } from 'native-base';
import React, { Component } from 'react';
import * as Yup from 'yup';
import { StyleSheet } from 'react-native';

import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ValidationError, ValidationErrors } from '@covid/components/ValidationError';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService from '@covid/core/user/UserService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { cleanIntegerVal } from '@covid/core/utils/number';
import AssessmentCoordinator from '@covid/features/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { CheckboxList } from '@covid/components/Checkbox';
import {
  SupplementValue,
  supplementValues,
  VitaminSupplementData,
  VitaminSupplementsQuestion,
} from '@covid/features/patient/fields/VitaminQuestion';
import { colors, fontStyles } from '@theme';
import { FaceMaskData, FaceMaskQuestion, TypeOfMaskValues } from '@covid/features/assessment/fields/FaceMaskQuestion';
import { BloodPressureData } from '@covid/features/patient/fields/BloodPressureMedicationQuestion';
import { RaceEthnicityData } from '@covid/features/patient/fields/RaceEthnicityQuestion';
import { PeriodData } from '@covid/features/patient/fields/PeriodQuestion';
import { HormoneTreatmentData } from '@covid/features/patient/fields/HormoneTreatmentQuestion';
import { AtopyData } from '@covid/features/patient/fields/AtopyQuestions';

import { ScreenParamList } from '../ScreenParamList';

interface LevelOfIsolationData {
  isolationLittleInteraction: string;
  isolationLotsOfPeople: string;
  isolationHealthcareProvider: string;
}

type LocationProps = {
  navigation: StackNavigationProp<ScreenParamList, 'LevelOfIsolation'>;
  route: RouteProp<ScreenParamList, 'LevelOfIsolation'>;
};

type State = {
  errorMessage: string;
  enableSubmit: boolean;
};

interface LevelOfIsolationScreenData extends LevelOfIsolationData, FaceMaskData {}

const checkFormFilled = (props: FormikProps<any>) => {
  if (Object.keys(props.errors).length && props.submitCount > 0) return false;
  if (Object.keys(props.values).length === 0 && props.submitCount > 0) return false;
  return true;
};

const initialState: State = {
  errorMessage: '',
  enableSubmit: true,
};

export default class LevelOfIsolationScreen extends Component<LocationProps, State> {
  constructor(props: LocationProps) {
    super(props);
    this.state = initialState;
  }

  static initialFormValues = (): LevelOfIsolationData => {
    return {
      isolationLittleInteraction: '',
      isolationLotsOfPeople: '',
      isolationHealthcareProvider: '',
    };
  };

  private createAssessment(formData: LevelOfIsolationScreenData) {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;
    const patientId = currentPatient.patientId;

    let infos = {
      patient: patientId,
      ...(formData.isolationLittleInteraction !== '' && {
        isolation_little_interaction: cleanIntegerVal(formData.isolationLittleInteraction),
      }),
      ...(formData.isolationLotsOfPeople !== '' && {
        isolation_lots_of_people: cleanIntegerVal(formData.isolationLotsOfPeople),
      }),
      ...(formData.isolationHealthcareProvider !== '' && {
        isolation_healthcare_provider: cleanIntegerVal(formData.isolationHealthcareProvider),
      }),
    } as Partial<AssessmentInfosRequest>;

    if (formData.wornFaceMask !== '') {
      const masksDto = FaceMaskQuestion.createMasksDTO(
        formData.typesOfMask as TypeOfMaskValues[],
        formData.wornFaceMask,
        formData.otherMask
      );
      infos = {
        ...infos,
        ...masksDto,
      };
    }

    return infos;
  }

  registerSchema = Yup.object().shape({
    isolationLittleInteraction: Yup.number()
      .typeError(i18n.t('level-of-isolation.whole-number'))
      .integer(i18n.t('level-of-isolation.whole-number'))
      .min(0, i18n.t('level-of-isolation.correct-answer')),
    isolationLotsOfPeople: Yup.number()
      .typeError(i18n.t('level-of-isolation.whole-number'))
      .integer(i18n.t('level-of-isolation.whole-number'))
      .min(0, i18n.t('level-of-isolation.correct-answer')),
    isolationHealthcareProvider: Yup.number()
      .typeError(i18n.t('level-of-isolation.whole-number'))
      .integer(i18n.t('level-of-isolation.whole-number'))
      .min(0, i18n.t('level-of-isolation.correct-answer')),
  });

  private updatePatientsLastAskedDate(currentPatient: PatientStateType) {
    const userService = new UserService();
    const patientId = currentPatient.patientId;
    const timeNow = moment().toDate();
    const infos = {
      last_asked_level_of_isolation: timeNow,
    } as Partial<PatientInfosRequest>;

    return userService
      .updatePatient(patientId, infos)
      .then(() => (currentPatient.shouldAskLevelOfIsolation = false))
      .catch(() => {
        this.setState({ errorMessage: i18n.t('something-went-wrong') });
      });
  }

  async handleUpdate(formData: LevelOfIsolationScreenData) {
    try {
      const { currentPatient, assessmentId } = AssessmentCoordinator.assessmentData;
      var assessment = this.createAssessment(formData);

      const response = await assessmentService.saveAssessment(assessmentId!, assessment);
      if (!assessmentId) {
        AssessmentCoordinator.assessmentData.assessmentId = response.id;
      }
      this.updatePatientsLastAskedDate(currentPatient);
      AssessmentCoordinator.gotoNextScreen(this.props.route.name);
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
    }
  }

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;
    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('level-of-isolation.screen-title')}</HeaderText>
          <RegularText style={styles.topText}>{i18n.t('level-of-isolation.screen-justification')}</RegularText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={3} maxSteps={5} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...LevelOfIsolationScreen.initialFormValues(),
            ...FaceMaskQuestion.initialFormValues(),
          }}
          validationSchema={this.registerSchema}
          onSubmit={(values: LevelOfIsolationScreenData) => {
            return this.handleUpdate(values);
          }}>
          {(props) => {
            return (
              <Form>
                <GenericTextField
                  formikProps={props}
                  placeholder={i18n.t('level-of-isolation.placeholder-optional')}
                  label={i18n.t('level-of-isolation.question-little-interaction')}
                  name="isolationLittleInteraction"
                  keyboardType="numeric"
                  showError
                />

                <GenericTextField
                  formikProps={props}
                  placeholder={i18n.t('level-of-isolation.placeholder-optional')}
                  label={i18n.t('level-of-isolation.question-lots-of-people')}
                  name="isolationLotsOfPeople"
                  keyboardType="numeric"
                  showError
                />

                <GenericTextField
                  formikProps={props}
                  placeholder={i18n.t('level-of-isolation.placeholder-optional')}
                  label={i18n.t('level-of-isolation.question-healthcare-provider')}
                  name="isolationHealthcareProvider"
                  keyboardType="numeric"
                  showError
                />

                <FaceMaskQuestion formikProps={props as FormikProps<FaceMaskData>} />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationErrors errors={props.errors as string[]} />
                )}

                <BrandedButton
                  onPress={props.handleSubmit}
                  enable={checkFormFilled(props)}
                  hideLoading={!props.isSubmitting}>
                  {i18n.t('next-question')}
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
  infoText: {
    ...fontStyles.bodySmallLight,
    color: colors.primary,
  },
  topText: {
    marginTop: 8,
  },
});
