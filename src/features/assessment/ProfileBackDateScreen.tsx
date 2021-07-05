import { BrandedButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { ConfigType } from '@covid/core/Config';
import { isUSCountry, localisationService } from '@covid/core/localisation/LocalisationService';
import { patientService } from '@covid/core/patient/PatientService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
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
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import * as React from 'react';
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

export default class ProfileBackDateScreen extends React.Component<BackDateProps, State> {
  get features(): ConfigType | undefined {
    return localisationService.getConfig();
  }

  constructor(props: BackDateProps) {
    super(props);
    this.state = initialState;
  }

  registerSchema = Yup.object().shape({
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
    const currentPatient = assessmentCoordinator.assessmentData?.patientData?.patientState;
    this.setState({
      needAtopyAnswers: currentPatient?.hasAtopyAnswers,
      needBloodGroupAnswer: currentPatient?.hasBloodGroupAnswer,
      needBloodPressureAnswer: currentPatient?.hasBloodPressureAnswer,
      needDiabetesAnswers: currentPatient?.shouldAskExtendedDiabetes,
      needRaceEthnicityAnswer:
        (this.features?.showRaceQuestion || this.features?.showEthnicityQuestion) &&
        currentPatient?.hasRaceEthnicityAnswer,
    });
  }

  handleProfileUpdate(formData: IBackfillData) {
    const currentPatient = assessmentCoordinator.assessmentData?.patientData?.patientState;
    const infos = this.createPatientInfos(formData);

    patientService
      .updatePatientInfo(currentPatient?.patientId, infos)
      .then(() => {
        if (formData.race) currentPatient.hasRaceEthnicityAnswer = true;
        if (formData.takesAnyBloodPressureMedications) currentPatient.hasBloodPressureAnswer = true;
        if (formData.hasHayfever) currentPatient.hasAtopyAnswers = true;
        if (formData.hasHayfever === 'yes') currentPatient.hasHayfever = true;
        if (formData.diabetesType) {
          currentPatient.hasDiabetesAnswers = true;
          currentPatient.shouldAskExtendedDiabetes = false;
        }
        if (formData.bloodGroup) currentPatient.hasBloodGroupAnswer = true;

        assessmentCoordinator.gotoNextScreen(this.props.route.name);
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

  render() {
    return (
      <Screen
        navigation={this.props.navigation}
        profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
        testID="profile-back-date-screen"
      >
        <Header>
          <HeaderText>{i18n.t('back-date-profile-title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={6} step={1} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...RaceEthnicityQuestion.initialFormValues(),
            ...BloodPressureMedicationQuestion.initialFormValues(),
            ...AtopyQuestions.initialFormValues(),
            ...DiabetesQuestions.initialFormValues(),
            ...BloodGroupQuestion.initialFormValues(),
          }}
          onSubmit={(values: IBackfillData) => {
            return this.handleProfileUpdate(values);
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
        >
          {(props) => {
            return (
              <Form>
                {this.state.needBloodPressureAnswer ? (
                  <BloodPressureMedicationQuestion formikProps={props as FormikProps<IBloodPressureData>} />
                ) : null}

                {this.state.needRaceEthnicityAnswer ? (
                  <RaceEthnicityQuestion
                    formikProps={props as FormikProps<IRaceEthnicityData>}
                    showEthnicityQuestion={this.features?.showEthnicityQuestion}
                    showRaceQuestion={this.features?.showRaceQuestion}
                  />
                ) : null}

                {this.state.needAtopyAnswers ? <AtopyQuestions formikProps={props as FormikProps<IAtopyData>} /> : null}

                {this.state.needDiabetesAnswers ? (
                  <DiabetesQuestions formikProps={props as FormikProps<IDiabetesData>} />
                ) : null}

                {this.state.needBloodGroupAnswer ? (
                  <BloodGroupQuestion formikProps={props as FormikProps<IBloodGroupData>} />
                ) : null}

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 ? (
                  <ValidationError error={i18n.t('validation-error-text')} />
                ) : null}

                <BrandedButton enabled={!props.isSubmitting} onPress={props.handleSubmit}>
                  {i18n.t('update-profile')}
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
