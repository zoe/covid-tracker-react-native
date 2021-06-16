import { BrandedButton } from '@covid/components';
import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import YesNoField from '@covid/components/YesNoField';
import { ILocalisationService, isUSCountry } from '@covid/core/localisation/LocalisationService';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import { IPatientService } from '@covid/core/patient/PatientService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { ScreenParamList } from '@covid/features';
import { AtopyQuestions, IAtopyData } from '@covid/features/patient/fields/AtopyQuestions';
import { BloodGroupQuestion, IBloodGroupData } from '@covid/features/patient/fields/BloodGroupQuestion';
import i18n from '@covid/locale/i18n';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { stripAndRound } from '@covid/utils/number';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import React, { Component } from 'react';
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

export default class YourHealthScreen extends Component<HealthProps, State> {
  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  constructor(props: HealthProps) {
    super(props);
    const currentPatient = patientCoordinator.patientData.patientState;
    const features = this.localisationService.getConfig();
    this.state = {
      ...initialState,
      showDiabetesQuestion: false,
      showPregnancyQuestion: features.showPregnancyQuestion && currentPatient.isFemale,
    };
  }

  validationSchema = Yup.object().shape({
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

  onSubmit(formData: IYourHealthData) {
    const currentPatient = patientCoordinator.patientData.patientState;
    const { patientId } = currentPatient;
    const infos = this.createPatientInfos(formData);

    this.patientService
      .updatePatientInfo(patientId, infos)
      .then((_) => {
        currentPatient.hasCompletedPatientDetails = true;
        currentPatient.hasBloodPressureAnswer = true;
        currentPatient.hasAtopyAnswers = true;
        if (formData.diabetesType) {
          currentPatient.hasDiabetesAnswers = true;
          currentPatient.shouldAskExtendedDiabetes = false;
        }
        if (formData.hasHayfever === 'yes') currentPatient.hasHayfever = true;
        if (formData.bloodGroup) currentPatient.hasBloodGroupAnswer = true;

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

  getValidationSchema = () => {
    let schema = this.validationSchema;
    schema = schema.concat(BloodGroupQuestion.schema());
    if (this.state.showDiabetesQuestion) {
      schema = schema.concat(DiabetesQuestions.schema());
    }
    return schema;
  };

  render() {
    const initialValues = {
      ...initialFormValues,
      ...BloodPressureMedicationQuestion.initialFormValues(),
      ...AtopyQuestions.initialFormValues(),
      ...DiabetesQuestions.initialFormValues(),
      ...BloodGroupQuestion.initialFormValues(),
    };
    const smokerStatusItems = [
      { label: i18n.t('your-health.never-smoked'), value: 'never' },
      { label: i18n.t('your-health.not-currently-smoking'), value: 'not_currently' },
      { label: i18n.t('your-health.yes-smoking'), value: 'yes' },
    ];
    return (
      <Screen navigation={this.props.navigation} profile={patientCoordinator.patientData.patientState.profile}>
        <Header>
          <HeaderText>{i18n.t('your-health.page-title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={6} step={3} />
        </ProgressBlock>

        <Formik initialValues={initialValues} onSubmit={this.onSubmit} validationSchema={this.getValidationSchema}>
          {(formikProps) => (
            <Form>
              <View style={{ marginHorizontal: 16 }}>
                <YesNoField
                  label={i18n.t('your-health.health-problems-that-limit-activity')}
                  onValueChange={formikProps.handleChange('limitedActivity')}
                  selectedValue={formikProps.values.limitedActivity}
                />

                {this.state.showPregnancyQuestion ? (
                  <YesNoField
                    label={i18n.t('your-health.are-you-pregnant')}
                    onValueChange={formikProps.handleChange('isPregnant')}
                    selectedValue={formikProps.values.isPregnant}
                  />
                ) : null}

                <YesNoField
                  label={i18n.t('your-health.have-heart-disease')}
                  onValueChange={formikProps.handleChange('hasHeartDisease')}
                  selectedValue={formikProps.values.hasHeartDisease}
                />

                <YesNoField
                  label={i18n.t('your-health.have-diabetes')}
                  onValueChange={(value: string) => {
                    formikProps.handleChange('hasDiabetes');
                    this.setState({ showDiabetesQuestion: value === 'yes' });
                  }}
                  selectedValue={formikProps.values.hasDiabetes}
                />

                {this.state.showDiabetesQuestion ? (
                  <DiabetesQuestions formikProps={formikProps as FormikProps<IDiabetesData>} />
                ) : null}

                <AtopyQuestions formikProps={formikProps as FormikProps<IAtopyData>} />

                <DropdownField
                  error={formikProps.touched.smokerStatus && formikProps.errors.smokerStatus}
                  items={smokerStatusItems}
                  label={i18n.t('your-health.is-smoker')}
                  onValueChange={formikProps.handleChange('smokerStatus')}
                  selectedValue={formikProps.values.smokerStatus}
                />

                {formikProps.values.smokerStatus === 'not_currently' ? (
                  <GenericTextField
                    formikProps={formikProps}
                    keyboardType="numeric"
                    label={i18n.t('your-health.years-since-last-smoked')}
                    name="smokedYearsAgo"
                  />
                ) : null}

                <YesNoField
                  label={i18n.t('your-health.has-kidney-disease')}
                  onValueChange={formikProps.handleChange('hasKidneyDisease')}
                  selectedValue={formikProps.values.hasKidneyDisease}
                />

                <YesNoField
                  label={i18n.t('your-health.has-cancer')}
                  onValueChange={formikProps.handleChange('hasCancer')}
                  selectedValue={formikProps.values.hasCancer}
                />

                {formikProps.values.hasCancer === 'yes' ? (
                  <>
                    {isUSCountry() && (
                      <GenericTextField
                        formikProps={formikProps}
                        label={i18n.t('your-health.what-cancer-type')}
                        name="cancerType"
                      />
                    )}
                    <YesNoField
                      label={i18n.t('your-health.is-on-chemotherapy')}
                      onValueChange={formikProps.handleChange('doesChemiotherapy')}
                      selectedValue={formikProps.values.doesChemiotherapy}
                    />
                  </>
                ) : null}

                <YesNoField
                  label={i18n.t('your-health.takes-immunosuppressant')}
                  onValueChange={formikProps.handleChange('takesImmunosuppressants')}
                  selectedValue={formikProps.values.takesImmunosuppressants}
                />

                <YesNoField
                  label={i18n.t('your-health.takes-asprin')}
                  onValueChange={formikProps.handleChange('takesAspirin')}
                  selectedValue={formikProps.values.takesAspirin}
                />

                <YesNoField
                  label={i18n.t('your-health.takes-nsaids')}
                  onValueChange={formikProps.handleChange('takesCorticosteroids')}
                  selectedValue={formikProps.values.takesCorticosteroids}
                />

                <BloodPressureMedicationQuestion formikProps={formikProps as FormikProps<IBloodPressureData>} />

                <BloodGroupQuestion formikProps={formikProps as FormikProps<IBloodGroupData>} />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                  <ValidationError error={i18n.t('validation-error-text')} />
                ) : null}
              </View>
              <BrandedButton onPress={formikProps.handleSubmit}>{i18n.t('next-question')}</BrandedButton>
            </Form>
          )}
        </Formik>
      </Screen>
    );
  }
}
