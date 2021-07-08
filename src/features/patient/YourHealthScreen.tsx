import { BrandedButton } from '@covid/components';
import { FormWrapper } from '@covid/components/Forms';
import { GenericTextField } from '@covid/components/GenericTextField';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import YesNoField from '@covid/components/YesNoField';
import { isUSCountry, localisationService } from '@covid/core/localisation/LocalisationService';
import { patientCoordinator } from '@covid/core/patient/PatientCoordinator';
import { patientService } from '@covid/core/patient/PatientService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { ScreenParamList } from '@covid/features';
import { AtopyQuestions, IAtopyData } from '@covid/features/patient/fields/AtopyQuestions';
import { BloodGroupQuestion, IBloodGroupData } from '@covid/features/patient/fields/BloodGroupQuestion';
import i18n from '@covid/locale/i18n';
import { stripAndRound } from '@covid/utils/number';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

import { BloodPressureMedicationQuestion, IBloodPressureData } from './fields/BloodPressureMedicationQuestion';
import { DiabetesQuestions, IDiabetesData } from './fields/DiabetesQuestions';

export interface IYourHealthData extends IBloodPressureData, IAtopyData, IDiabetesData, IBloodGroupData {
  isPregnant: string;
  hasHeartDisease: string;
  hasDiabetes: string;
  smokerStatus: string;
  smokedYearsAgo: string;
  hasKidneyDisease: string;

  hasCancer: string;
  cancerType: string;

  doesChemiotherapy: string;
  takesImmunosuppressants: string;
  takesAspirin: string;
  takesCorticosteroids: string;

  limitedActivity: string;
}

const initialFormValues = {
  cancerType: '',
  doesChemiotherapy: 'no',
  hasCancer: 'no',
  hasDiabetes: 'no',
  hasHeartDisease: 'no',
  hasKidneyDisease: 'no',

  isPregnant: 'no',
  limitedActivity: 'no',

  smokedYearsAgo: '',
  smokerStatus: 'never',
  takesAspirin: 'no',
  takesCorticosteroids: 'no',

  takesImmunosuppressants: 'no',
};

type HealthProps = {
  navigation: StackNavigationProp<ScreenParamList, 'YourHealth'>;
  route: RouteProp<ScreenParamList, 'YourHealth'>;
};

type State = {
  errorMessage: string;
  showPregnancyQuestion: boolean;
  showDiabetesQuestion: boolean;
};

const initialState: State = {
  errorMessage: '',
  showDiabetesQuestion: false,
  showPregnancyQuestion: false,
};

export default class YourHealthScreen extends React.Component<HealthProps, State> {
  constructor(props: HealthProps) {
    super(props);
    const config = localisationService.getConfig();
    this.state = {
      ...initialState,
      showDiabetesQuestion: false,
      showPregnancyQuestion: !!config?.showPregnancyQuestion && patientCoordinator.patientData?.patientState?.isFemale,
    };
  }

  registerSchema = Yup.object().shape({
    cancerType: Yup.string().when('hasCancer', {
      is: (value) => isUSCountry() && value && value === 'yes',
      then: Yup.string().required(),
    }),
    doesChemiotherapy: Yup.string(),
    hasAsthma: Yup.string().required(),
    hasCancer: Yup.string().required(),
    hasDiabetes: Yup.string().required(),
    hasEczema: Yup.string().required(),
    hasHayfever: Yup.string().required(),
    hasHeartDisease: Yup.string().required(),
    hasKidneyDisease: Yup.string().required(),
    hasLungDisease: Yup.string().required(),

    isPregnant: Yup.string().when([], {
      is: () => this.state.showPregnancyQuestion,
      then: Yup.string().required(),
    }),
    smokedYearsAgo: Yup.number().when('smokerStatus', {
      is: 'not_currently',
      then: Yup.number().required(),
    }),

    smokerStatus: Yup.string().required(),

    takesAnyBloodPressureMedications: Yup.string().required(),

    takesAspirin: Yup.string().required(),

    takesBloodPressureMedications: Yup.string().required(),

    takesBloodPressureMedicationsSartan: Yup.string().required(),
    takesCorticosteroids: Yup.string().required(),
    takesImmunosuppressants: Yup.string().required(),
  });

  handleUpdateHealth(formData: IYourHealthData) {
    const currentPatient = patientCoordinator.patientData?.patientState;
    const infos = this.createPatientInfos(formData);

    patientService
      .updatePatientInfo(currentPatient.patientId, infos)
      .then((_) => {
        currentPatient.hasCompletedPatientDetails = true;
        currentPatient.hasBloodPressureAnswer = true;
        currentPatient.hasAtopyAnswers = true;
        if (formData.diabetesType) {
          currentPatient.hasDiabetesAnswers = true;
          currentPatient.shouldAskExtendedDiabetes = false;
        }
        if (formData.hasHayfever === 'yes') {
          currentPatient.hasHayfever = true;
        }
        if (formData.bloodGroup) {
          currentPatient.hasBloodGroupAnswer = true;
        }
        patientCoordinator.gotoNextScreen(this.props.route.name);
      })
      .catch((_) => {
        this.setState({ errorMessage: 'Something went wrong, please try again later' });
      });
  }

  private createPatientInfos(formData: IYourHealthData) {
    const smokerStatus = formData.smokerStatus === 'no' ? 'never' : formData.smokerStatus;
    let infos = {
      has_asthma: formData.hasAsthma === 'yes',
      has_cancer: formData.hasCancer === 'yes',
      has_diabetes: formData.hasDiabetes === 'yes',
      has_eczema: formData.hasEczema === 'yes',
      has_hayfever: formData.hasHayfever === 'yes',
      has_heart_disease: formData.hasHeartDisease === 'yes',
      has_kidney_disease: formData.hasKidneyDisease === 'yes',
      has_lung_disease_only: formData.hasLungDisease === 'yes',
      limited_activity: formData.limitedActivity === 'yes',
      takes_any_blood_pressure_medications: formData.takesAnyBloodPressureMedications === 'yes',
      takes_aspirin: formData.takesAspirin === 'yes',
      takes_corticosteroids: formData.takesCorticosteroids === 'yes',
      takes_immunosuppressants: formData.takesImmunosuppressants === 'yes',
      ...BloodGroupQuestion.createDTO(formData),
    } as Partial<PatientInfosRequest>;

    if (this.state.showPregnancyQuestion) {
      infos = {
        ...infos,
        is_pregnant: formData.isPregnant === 'yes',
      };
    }

    if (infos.takes_any_blood_pressure_medications) {
      infos = {
        ...infos,
        takes_blood_pressure_medications: formData.takesBloodPressureMedications === 'yes',
        takes_blood_pressure_medications_sartan: formData.takesBloodPressureMedicationsSartan === 'yes',
      };
    }

    if (smokerStatus) {
      infos = {
        ...infos,
        smoker_status: smokerStatus,
      };

      if (smokerStatus === 'not_currently') {
        infos = {
          ...infos,
          smoked_years_ago: stripAndRound(formData.smokedYearsAgo),
        };
      }
    }

    if (infos.has_cancer) {
      infos = {
        ...infos,
        does_chemiotherapy: formData.doesChemiotherapy === 'yes',
      };

      if (isUSCountry()) {
        infos = {
          ...infos,
          cancer_type: formData.cancerType,
        };
      }
    }

    if (this.state.showDiabetesQuestion) {
      infos = {
        ...infos,
        ...DiabetesQuestions.createDTO(formData),
      };
    }

    return infos;
  }

  render() {
    const smokerStatusItems = [
      { label: i18n.t('your-health.never-smoked'), value: 'never' },
      { label: i18n.t('your-health.not-currently-smoking'), value: 'not_currently' },
      { label: i18n.t('your-health.yes-smoking'), value: 'yes' },
    ];
    return (
      <Screen
        navigation={this.props.navigation}
        profile={patientCoordinator.patientData?.patientState?.profile}
        testID="your-health-screen"
      >
        <Header>
          <HeaderText>{i18n.t('your-health.page-title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={6} step={3} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...initialFormValues,
            ...BloodPressureMedicationQuestion.initialFormValues(),
            ...AtopyQuestions.initialFormValues(),
            ...DiabetesQuestions.initialFormValues(),
            ...BloodGroupQuestion.initialFormValues(),
          }}
          onSubmit={(values: IYourHealthData) => {
            return this.handleUpdateHealth(values);
          }}
          validationSchema={() => {
            let schema = this.registerSchema;
            schema = schema.concat(BloodGroupQuestion.schema());
            if (this.state.showDiabetesQuestion) {
              schema = schema.concat(DiabetesQuestions.schema());
            }
            return schema;
          }}
        >
          {(props) => {
            return (
              <FormWrapper hasRequiredFields>
                <View style={{ marginHorizontal: 16 }}>
                  <YesNoField
                    required
                    label={i18n.t('your-health.health-problems-that-limit-activity')}
                    onValueChange={props.handleChange('limitedActivity')}
                    selectedValue={props.values.limitedActivity}
                  />

                  {this.state.showPregnancyQuestion ? (
                    <YesNoField
                      required
                      label={i18n.t('your-health.are-you-pregnant')}
                      onValueChange={props.handleChange('isPregnant')}
                      selectedValue={props.values.isPregnant}
                    />
                  ) : null}

                  <YesNoField
                    required
                    label={i18n.t('your-health.have-heart-disease')}
                    onValueChange={props.handleChange('hasHeartDisease')}
                    selectedValue={props.values.hasHeartDisease}
                  />

                  <YesNoField
                    required
                    label={i18n.t('your-health.have-diabetes')}
                    onValueChange={(value: string) => {
                      props.handleChange('hasDiabetes');
                      this.setState({ showDiabetesQuestion: value === 'yes' });
                    }}
                    selectedValue={props.values.hasDiabetes}
                  />

                  {this.state.showDiabetesQuestion ? (
                    <DiabetesQuestions formikProps={props as FormikProps<IDiabetesData>} />
                  ) : null}

                  <AtopyQuestions formikProps={props as FormikProps<IAtopyData>} />

                  <RadioInput
                    required
                    error={props.touched.smokerStatus ? props.errors.smokerStatus : ''}
                    items={smokerStatusItems}
                    label={i18n.t('your-health.is-smoker')}
                    onValueChange={props.handleChange('smokerStatus')}
                    selectedValue={props.values.smokerStatus}
                  />

                  {props.values.smokerStatus === 'not_currently' ? (
                    <GenericTextField
                      required
                      formikProps={props}
                      keyboardType="numeric"
                      label={i18n.t('your-health.years-since-last-smoked')}
                      name="smokedYearsAgo"
                    />
                  ) : null}

                  <YesNoField
                    required
                    label={i18n.t('your-health.has-kidney-disease')}
                    onValueChange={props.handleChange('hasKidneyDisease')}
                    selectedValue={props.values.hasKidneyDisease}
                  />

                  <YesNoField
                    required
                    label={i18n.t('your-health.has-cancer')}
                    onValueChange={props.handleChange('hasCancer')}
                    selectedValue={props.values.hasCancer}
                  />

                  {props.values.hasCancer === 'yes' ? (
                    <>
                      {isUSCountry() && (
                        <GenericTextField
                          formikProps={props}
                          label={i18n.t('your-health.what-cancer-type')}
                          name="cancerType"
                        />
                      )}
                      <YesNoField
                        required
                        label={i18n.t('your-health.is-on-chemotherapy')}
                        onValueChange={props.handleChange('doesChemiotherapy')}
                        selectedValue={props.values.doesChemiotherapy}
                      />
                    </>
                  ) : null}

                  <YesNoField
                    required
                    label={i18n.t('your-health.takes-immunosuppressant')}
                    onValueChange={props.handleChange('takesImmunosuppressants')}
                    selectedValue={props.values.takesImmunosuppressants}
                  />

                  <YesNoField
                    required
                    label={i18n.t('your-health.takes-asprin')}
                    onValueChange={props.handleChange('takesAspirin')}
                    selectedValue={props.values.takesAspirin}
                  />

                  <YesNoField
                    required
                    label={i18n.t('your-health.takes-nsaids')}
                    onValueChange={props.handleChange('takesCorticosteroids')}
                    selectedValue={props.values.takesCorticosteroids}
                  />

                  <BloodPressureMedicationQuestion formikProps={props as FormikProps<IBloodPressureData>} />

                  <BloodGroupQuestion formikProps={props as FormikProps<IBloodGroupData>} />

                  <ErrorText>{this.state.errorMessage}</ErrorText>
                  {!!Object.keys(props.errors).length && props.submitCount > 0 ? (
                    <ValidationError error={i18n.t('validation-error-text')} />
                  ) : null}
                </View>
                <BrandedButton
                  enabled={props.isValid && props.dirty}
                  onPress={props.handleSubmit}
                  testID="button-submit"
                >
                  {i18n.t('next-question')}
                </BrandedButton>
              </FormWrapper>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
