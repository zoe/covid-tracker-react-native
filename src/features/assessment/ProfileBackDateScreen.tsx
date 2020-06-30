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
import { isUSCountry, ICoreService } from '@covid/core/user/UserService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { AtopyData, AtopyQuestions } from '@covid/features/patient/fields/AtopyQuestions';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import i18n from '@covid/locale/i18n';
import { BloodGroupData, BloodGroupQuestion } from '@covid/features/patient/fields/BloodGroupQuestion';

import { ScreenParamList } from '../ScreenParamList';
import { BloodPressureData, BloodPressureMedicationQuestion } from '../patient/fields/BloodPressureMedicationQuestion';
import {
  HormoneTreatmentData,
  HormoneTreatmentQuestion,
  TreatmentValue,
} from '../patient/fields/HormoneTreatmentQuestion';
import { PeriodData, PeriodQuestion, periodValues } from '../patient/fields/PeriodQuestion';
import { RaceEthnicityData, RaceEthnicityQuestion } from '../patient/fields/RaceEthnicityQuestion';
import {
  VitaminSupplementsQuestion,
  VitaminSupplementData,
  supplementValues,
  SupplementValue,
} from '../patient/fields/VitaminQuestion';
import { DiabetesData, DiabetesQuestions } from '../patient/fields/DiabetesQuestions';

interface BackfillData
  extends BloodPressureData,
    RaceEthnicityData,
    PeriodData,
    HormoneTreatmentData,
    VitaminSupplementData,
    AtopyData,
    DiabetesData,
    BloodGroupData {}

type BackDateProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ProfileBackDate'>;
  route: RouteProp<ScreenParamList, 'ProfileBackDate'>;
};

type State = {
  errorMessage: string;
  needBloodPressureAnswer: boolean;
  needRaceEthnicityAnswer: boolean;
  needPeriodStatusAnswer: boolean;
  needHormoneTreatmentAnswer: boolean;
  needVitaminAnswer: boolean;
  needAtopyAnswers: boolean;
  needDiabetesAnswers: boolean;
  needBloodGroupAnswer: boolean;
};

const initialState: State = {
  errorMessage: '',
  needBloodPressureAnswer: false,
  needRaceEthnicityAnswer: false,
  needPeriodStatusAnswer: false,
  needHormoneTreatmentAnswer: false,
  needVitaminAnswer: false,
  needAtopyAnswers: false,
  needDiabetesAnswers: false,
  needBloodGroupAnswer: false,
};

export default class ProfileBackDateScreen extends Component<BackDateProps, State> {
  @lazyInject(Services.User)
  private userService: ICoreService;

  features = this.userService.getConfig();

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

    havingPeriods: Yup.string().when([], {
      is: () => this.state.needPeriodStatusAnswer,
      then: Yup.string().required(i18n.t('your-health.please-select-periods')),
    }),
    periodFrequency: Yup.string().when('havingPeriods', {
      is: periodValues.CURRENTLY,
      then: Yup.string().required(i18n.t('your-health.please-select-period-frequency')),
    }),
    weeksPregnant: Yup.number().when('havingPeriods', {
      is: periodValues.PREGNANT,
      then: Yup.number()
        .typeError(i18n.t('your-health.correct-weeks-pregnant'))
        .min(0, i18n.t('your-health.correct-weeks-pregnant'))
        .max(50, i18n.t('your-health.correct-weeks-pregnant')),
    }),
    periodStoppedAge: Yup.number().when('havingPeriods', {
      is: periodValues.STOPPED,
      then: Yup.number()
        .typeError(i18n.t('your-health.correct-period-stopped-age'))
        .min(0, i18n.t('your-health.correct-period-stopped-age'))
        .max(100, i18n.t('your-health.correct-period-stopped-age')),
    }),
    hormoneTreatment: Yup.array<string>().when([], {
      is: () => this.state.needHormoneTreatmentAnswer,
      then: Yup.array<string>().min(1, i18n.t('your-health.please-select-hormone-treatments')),
    }),
    vitaminSupplements: Yup.array<string>().when([], {
      is: () => this.state.needVitaminAnswer,
      then: Yup.array<string>().min(1, i18n.t('your-health.vitamins.please-select-vitamins')),
    }),
    vitaminOther: Yup.string().when('vitaminSupplements', {
      is: (val: string[]) => val.includes(supplementValues.OTHER),
      then: Yup.string(),
    }),
  });

  async componentDidMount() {
    const features = this.userService.getConfig();
    const { currentPatient } = AssessmentCoordinator.assessmentData;
    this.setState({
      needBloodPressureAnswer: !currentPatient.hasBloodPressureAnswer,
      needRaceEthnicityAnswer:
        (features.showRaceQuestion || features.showEthnicityQuestion) && !currentPatient.hasRaceEthnicityAnswer,
      needPeriodStatusAnswer: !currentPatient.hasPeriodAnswer,
      needHormoneTreatmentAnswer: !currentPatient.hasHormoneTreatmentAnswer,
      needVitaminAnswer: !currentPatient.hasVitaminAnswer,
      needAtopyAnswers: !currentPatient.hasAtopyAnswers,
      needDiabetesAnswers: currentPatient.shouldAskExtendedDiabetes,
      needBloodGroupAnswer: !currentPatient.hasBloodGroupAnswer,
    });
  }

  handleProfileUpdate(formData: BackfillData) {
    const { currentPatient } = AssessmentCoordinator.assessmentData;
    const patientId = currentPatient.patientId;
    const infos = this.createPatientInfos(formData);

    this.userService
      .updatePatient(patientId, infos)
      .then((response) => {
        if (formData.race) currentPatient.hasRaceEthnicityAnswer = true;
        if (formData.takesAnyBloodPressureMedications) currentPatient.hasBloodPressureAnswer = true;
        if (formData.havingPeriods) currentPatient.hasPeriodAnswer = true;
        if (formData.hormoneTreatment?.length) currentPatient.hasHormoneTreatmentAnswer = true;
        if (formData.vitaminSupplements?.length) currentPatient.hasVitaminAnswer = true;
        if (formData.hasHayfever) currentPatient.hasAtopyAnswers = true;
        if (formData.hasHayfever == 'yes') currentPatient.hasHayfever = true;
        if (formData.diabetesType) {
          currentPatient.hasDiabetesAnswers = true;
          currentPatient.shouldAskExtendedDiabetes = false;
        }
        if (formData.bloodGroup) currentPatient.hasBloodGroupAnswer = true;

        AssessmentCoordinator.gotoNextScreen(this.props.route.name);
      })
      .catch((err) => {
        this.setState({ errorMessage: i18n.t('something-went-wrong') });
      });
  }

  createPatientInfos(formData: BackfillData) {
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

    if (this.state.needPeriodStatusAnswer) {
      const periodDoc = PeriodQuestion.createPeriodDoc(formData);
      infos = {
        ...infos,
        ...periodDoc,
      };
    }

    if (this.state.needHormoneTreatmentAnswer) {
      const treatmentsDoc = HormoneTreatmentQuestion.createTreatmentsDoc(formData.hormoneTreatment as TreatmentValue[]);
      infos = {
        ...infos,
        ...treatmentsDoc,
      };
    }

    if (this.state.needVitaminAnswer) {
      const supplementsDoc = VitaminSupplementsQuestion.createSupplementsDoc(
        formData.vitaminSupplements as SupplementValue[],
        formData.vitaminOther as string
      );
      infos = {
        ...infos,
        ...supplementsDoc,
      };
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
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;

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
            ...HormoneTreatmentQuestion.initialFormValues(),
            ...PeriodQuestion.initialFormValues(),
            ...VitaminSupplementsQuestion.initialFormValues(),
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
          onSubmit={(values: BackfillData) => {
            return this.handleProfileUpdate(values);
          }}>
          {(props) => {
            return (
              <Form>
                {this.state.needBloodPressureAnswer && (
                  <BloodPressureMedicationQuestion formikProps={props as FormikProps<BloodPressureData>} />
                )}

                {this.state.needRaceEthnicityAnswer && (
                  <RaceEthnicityQuestion
                    showRaceQuestion={this.features.showRaceQuestion}
                    showEthnicityQuestion={this.features.showEthnicityQuestion}
                    formikProps={props as FormikProps<RaceEthnicityData>}
                  />
                )}

                {this.state.needPeriodStatusAnswer && <PeriodQuestion formikProps={props as FormikProps<PeriodData>} />}

                {this.state.needHormoneTreatmentAnswer && (
                  <HormoneTreatmentQuestion formikProps={props as FormikProps<HormoneTreatmentData>} />
                )}

                {this.state.needVitaminAnswer && (
                  <VitaminSupplementsQuestion formikProps={props as FormikProps<VitaminSupplementData>} />
                )}

                {this.state.needAtopyAnswers && <AtopyQuestions formikProps={props as FormikProps<AtopyData>} />}

                {this.state.needDiabetesAnswers && (
                  <DiabetesQuestions formikProps={props as FormikProps<DiabetesData>} />
                )}

                {this.state.needBloodGroupAnswer && (
                  <BloodGroupQuestion formikProps={props as FormikProps<BloodGroupData>} />
                )}

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}

                <BrandedButton onPress={props.handleSubmit}>
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
