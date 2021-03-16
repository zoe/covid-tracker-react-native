import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import * as Yup from 'yup';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { IUserService } from '@covid/core/user/UserService';
import { isUSCountry, ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { IAtopyData, AtopyQuestions } from '@covid/features/patient/fields/AtopyQuestions';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import i18n from '@covid/locale/i18n';
import { ConfigType } from '@covid/core/Config';
import { IPatientService } from '@covid/core/patient/PatientService';
import { IBloodGroupData, BloodGroupQuestion } from '@covid/features/patient/fields/BloodGroupQuestion';
import {
  IBloodPressureData,
  BloodPressureMedicationQuestion,
} from '@covid/features/patient/fields/BloodPressureMedicationQuestion';
import { IRaceEthnicityData, RaceEthnicityQuestion } from '@covid/features/patient/fields/RaceEthnicityQuestion';
import { IDiabetesData, DiabetesQuestions } from '@covid/features/patient/fields/DiabetesQuestions';
import { ScreenParamList } from '@covid/features/ScreenParamList';

interface IBackfillData extends IBloodPressureData, IRaceEthnicityData, IAtopyData, IDiabetesData, IBloodGroupData {}

type BackDateProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ProfileBackDate'>;
  route: RouteProp<ScreenParamList, 'ProfileBackDate'>;
};

type State = {
  errorMessage: string;
  needBloodPressureAnswer: boolean;
  needRaceEthnicityAnswer: boolean;
  needAtopyAnswers: boolean;
  needDiabetesAnswers: boolean;
  needBloodGroupAnswer: boolean;
};

const initialState: State = {
  errorMessage: '',
  needBloodPressureAnswer: false,
  needRaceEthnicityAnswer: false,
  needAtopyAnswers: false,
  needDiabetesAnswers: false,
  needBloodGroupAnswer: false,
};

export default class ProfileBackDateScreen extends Component<BackDateProps, State> {
  @lazyInject(Services.User)
  private readonly userService: IUserService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  get features(): ConfigType {
    return this.localisationService.getConfig();
  }

  constructor(props: BackDateProps) {
    super(props);
    this.state = initialState;
  }

  registerSchema = Yup.object().shape({
    takesAnyBloodPressureMedications: Yup.string().when([], {
      is: () => this.state.needBloodPressureAnswer,
      then: Yup.string().required(),
    }),
    takesBloodPressureMedications: Yup.string().when([], {
      is: () => this.state.needBloodPressureAnswer,
      then: Yup.string().required(),
    }),
    takesBloodPressureMedicationsSartan: Yup.string().when([], {
      is: () => this.state.needBloodPressureAnswer,
      then: Yup.string().required(),
    }),

    race: Yup.array<string>().when([], {
      is: () => this.state.needRaceEthnicityAnswer,
      then: Yup.array<string>().min(1, i18n.t('please-select-race')),
    }),
    raceOther: Yup.string().when('race', {
      is: (val: string[]) => this.state.needRaceEthnicityAnswer && val.includes('other'),
      then: Yup.string().required(),
    }),
    ethnicity: Yup.string().when([], {
      is: () => this.state.needRaceEthnicityAnswer && isUSCountry(),
      then: Yup.string().required(),
    }),
  });

  async componentDidMount() {
    const currentPatient = AssessmentCoordinator.assessmentData.patientData.patientState;
    this.setState({
      needBloodPressureAnswer: !currentPatient.hasBloodPressureAnswer,
      needRaceEthnicityAnswer:
        (this.features.showRaceQuestion || this.features.showEthnicityQuestion) &&
        !currentPatient.hasRaceEthnicityAnswer,
      needAtopyAnswers: !currentPatient.hasAtopyAnswers,
      needDiabetesAnswers: currentPatient.shouldAskExtendedDiabetes,
      needBloodGroupAnswer: !currentPatient.hasBloodGroupAnswer,
    });
  }

  handleProfileUpdate(formData: IBackfillData) {
    const currentPatient = AssessmentCoordinator.assessmentData.patientData.patientState;
    const patientId = currentPatient.patientId;
    const infos = this.createPatientInfos(formData);

    this.patientService
      .updatePatientInfo(patientId, infos)
      .then((response) => {
        if (formData.race) currentPatient.hasRaceEthnicityAnswer = true;
        if (formData.takesAnyBloodPressureMedications) currentPatient.hasBloodPressureAnswer = true;
        if (formData.hasHayfever) currentPatient.hasAtopyAnswers = true;
        if (formData.hasHayfever === 'yes') currentPatient.hasHayfever = true;
        if (formData.diabetesType) {
          currentPatient.hasDiabetesAnswers = true;
          currentPatient.shouldAskExtendedDiabetes = false;
        }
        if (formData.bloodGroup) currentPatient.hasBloodGroupAnswer = true;

        AssessmentCoordinator.gotoNextScreen(this.props.route.name);
      })
      .catch((_) => {
        this.setState({ errorMessage: i18n.t('something-went-wrong') });
      });
  }

  createPatientInfos(formData: IBackfillData) {
    let infos: Partial<PatientInfosRequest> = {};

    if (this.state.needBloodPressureAnswer) {
      if (formData.takesAnyBloodPressureMedications) {
        infos = {
          ...infos,
          takes_any_blood_pressure_medications: formData.takesAnyBloodPressureMedications === 'yes',
        };
      }

      if (infos.takes_any_blood_pressure_medications) {
        infos = {
          ...infos,
          takes_blood_pressure_medications: formData.takesBloodPressureMedications === 'yes', // pril
          takes_blood_pressure_medications_sartan: formData.takesBloodPressureMedicationsSartan === 'yes',
        };
      }
    }

    if (this.state.needRaceEthnicityAnswer) {
      if (formData.race) {
        infos = {
          ...infos,
          race: formData.race,
        };
      }

      if (formData.ethnicity) {
        infos = {
          ...infos,
          ethnicity: formData.ethnicity,
        };
      }

      if (formData.raceOther) {
        infos = {
          ...infos,
          race_other: formData.raceOther,
        };
      }
    }

    if (this.state.needAtopyAnswers) {
      infos = {
        ...infos,
        has_hayfever: formData.hasHayfever === 'yes',
        has_eczema: formData.hasEczema === 'yes',
        has_asthma: formData.hasAsthma === 'yes',
        has_lung_disease_only: formData.hasLungDisease === 'yes',
      };
    }

    if (this.state.needDiabetesAnswers) {
      infos = {
        ...infos,
        ...DiabetesQuestions.createDTO(formData),
      };
    }

    if (this.state.needBloodGroupAnswer) {
      infos = {
        ...infos,
        ...BloodGroupQuestion.createDTO(formData),
      };
    }

    return infos;
  }

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.patientData.patientState;

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('back-date-profile-title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={1} maxSteps={6} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...RaceEthnicityQuestion.initialFormValues(),
            ...BloodPressureMedicationQuestion.initialFormValues(),
            ...AtopyQuestions.initialFormValues(),
            ...DiabetesQuestions.initialFormValues(),
            ...BloodGroupQuestion.initialFormValues(),
          }}
          validationSchema={() => {
            let schema = this.registerSchema;
            if (this.state.needDiabetesAnswers) {
              schema = schema.concat(DiabetesQuestions.schema());
            }
            if (this.state.needBloodGroupAnswer) {
              schema = schema.concat(BloodGroupQuestion.schema());
            }
            return schema;
          }}
          onSubmit={(values: IBackfillData) => {
            return this.handleProfileUpdate(values);
          }}>
          {(props) => {
            return (
              <Form>
                {this.state.needBloodPressureAnswer && (
                  <BloodPressureMedicationQuestion formikProps={props as FormikProps<IBloodPressureData>} />
                )}

                {this.state.needRaceEthnicityAnswer && (
                  <RaceEthnicityQuestion
                    showRaceQuestion={this.features.showRaceQuestion}
                    showEthnicityQuestion={this.features.showEthnicityQuestion}
                    formikProps={props as FormikProps<IRaceEthnicityData>}
                  />
                )}

                {this.state.needAtopyAnswers && <AtopyQuestions formikProps={props as FormikProps<IAtopyData>} />}

                {this.state.needDiabetesAnswers && (
                  <DiabetesQuestions formikProps={props as FormikProps<IDiabetesData>} />
                )}

                {this.state.needBloodGroupAnswer && (
                  <BloodGroupQuestion formikProps={props as FormikProps<IBloodGroupData>} />
                )}

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}

                <BrandedButton onPress={props.handleSubmit} enable={!props.isSubmitting}>
                  <Text>{i18n.t('update-profile')}</Text>
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
