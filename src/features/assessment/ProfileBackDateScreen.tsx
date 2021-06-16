import { BrandedButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ConfigType } from '@covid/core/Config';
import { ILocalisationService, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { IPatientService } from '@covid/core/patient/PatientService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { IUserService } from '@covid/core/user/UserService';
import { AtopyQuestions, IAtopyData } from '@covid/features/patient/fields/AtopyQuestions';
import { BloodGroupQuestion, IBloodGroupData } from '@covid/features/patient/fields/BloodGroupQuestion';
import {
  BloodPressureMedicationQuestion,
  IBloodPressureData,
} from '@covid/features/patient/fields/BloodPressureMedicationQuestion';
import { DiabetesQuestions, IDiabetesData } from '@covid/features/patient/fields/DiabetesQuestions';
import { IRaceEthnicityData, RaceEthnicityQuestion } from '@covid/features/patient/fields/RaceEthnicityQuestion';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { Form } from 'native-base';
import React, { Component } from 'react';
import * as Yup from 'yup';

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
  needAtopyAnswers: false,
  needBloodGroupAnswer: false,
  needBloodPressureAnswer: false,
  needDiabetesAnswers: false,
  needRaceEthnicityAnswer: false,
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

  state = initialState;

  validationSchema = Yup.object().shape({
    ethnicity: Yup.string().when([], {
      is: () => this.state.needRaceEthnicityAnswer && isUSCountry(),
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
  });

  async componentDidMount() {
    const currentPatient = AssessmentCoordinator.assessmentData.patientData.patientState;
    this.setState({
      needAtopyAnswers: !currentPatient.hasAtopyAnswers,
      needBloodGroupAnswer: !currentPatient.hasBloodGroupAnswer,
      needBloodPressureAnswer: !currentPatient.hasBloodPressureAnswer,
      needDiabetesAnswers: currentPatient.shouldAskExtendedDiabetes,
      needRaceEthnicityAnswer:
        (this.features.showRaceQuestion || this.features.showEthnicityQuestion) &&
        !currentPatient.hasRaceEthnicityAnswer,
    });
  }

  async onSubmit(values: IBackfillData, formikHelpers: FormikHelpers<IBackfillData>) {
    const currentPatient = AssessmentCoordinator.assessmentData.patientData.patientState;
    const { patientId } = currentPatient;
    const infos = this.createPatientInfos(values);

    try {
      await this.patientService.updatePatientInfo(patientId, infos);

      if (values.race) currentPatient.hasRaceEthnicityAnswer = true;
      if (values.takesAnyBloodPressureMedications) currentPatient.hasBloodPressureAnswer = true;
      if (values.hasHayfever) currentPatient.hasAtopyAnswers = true;
      if (values.hasHayfever === 'yes') currentPatient.hasHayfever = true;
      if (values.diabetesType) {
        currentPatient.hasDiabetesAnswers = true;
        currentPatient.shouldAskExtendedDiabetes = false;
      }
      if (values.bloodGroup) currentPatient.hasBloodGroupAnswer = true;

      AssessmentCoordinator.gotoNextScreen(this.props.route.name);
    } catch (_) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
    }

    formikHelpers.setSubmitting(false);
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
          takes_blood_pressure_medications: formData.takesBloodPressureMedications === 'yes',
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
        has_asthma: formData.hasAsthma === 'yes',
        has_eczema: formData.hasEczema === 'yes',
        has_hayfever: formData.hasHayfever === 'yes',
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

  getValidationSchema = () => {
    let schema = this.validationSchema;
    if (this.state.needDiabetesAnswers) {
      schema = schema.concat(DiabetesQuestions.schema());
    }
    if (this.state.needBloodGroupAnswer) {
      schema = schema.concat(BloodGroupQuestion.schema());
    }
    return schema;
  };

  render() {
    const initialValues = {
      ...RaceEthnicityQuestion.initialFormValues(),
      ...BloodPressureMedicationQuestion.initialFormValues(),
      ...AtopyQuestions.initialFormValues(),
      ...DiabetesQuestions.initialFormValues(),
      ...BloodGroupQuestion.initialFormValues(),
    };

    return (
      <Screen
        navigation={this.props.navigation}
        profile={AssessmentCoordinator.assessmentData.patientData.patientState.profile}
      >
        <Header>
          <HeaderText>{i18n.t('back-date-profile-title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={6} step={1} />
        </ProgressBlock>

        <Formik initialValues={initialValues} onSubmit={this.onSubmit} validationSchema={this.getValidationSchema}>
          {(formikProps) => (
            <Form>
              {this.state.needBloodPressureAnswer ? (
                <BloodPressureMedicationQuestion formikProps={formikProps as FormikProps<IBloodPressureData>} />
              ) : null}

              {this.state.needRaceEthnicityAnswer ? (
                <RaceEthnicityQuestion
                  formikProps={formikProps as FormikProps<IRaceEthnicityData>}
                  showEthnicityQuestion={this.features.showEthnicityQuestion}
                  showRaceQuestion={this.features.showRaceQuestion}
                />
              ) : null}

              {this.state.needAtopyAnswers ? (
                <AtopyQuestions formikProps={formikProps as FormikProps<IAtopyData>} />
              ) : null}

              {this.state.needDiabetesAnswers ? (
                <DiabetesQuestions formikProps={formikProps as FormikProps<IDiabetesData>} />
              ) : null}

              {this.state.needBloodGroupAnswer ? (
                <BloodGroupQuestion formikProps={formikProps as FormikProps<IBloodGroupData>} />
              ) : null}

              <ErrorText>{this.state.errorMessage}</ErrorText>
              {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                <ValidationError error={i18n.t('validation-error-text')} />
              ) : null}

              <BrandedButton enable={!formikProps.isSubmitting} onPress={formikProps.handleSubmit}>
                {i18n.t('update-profile')}
              </BrandedButton>
            </Form>
          )}
        </Formik>
      </Screen>
    );
  }
}
