import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { GenericTextField } from '@covid/components/GenericTextField';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { YesNoField } from '@covid/components/inputs/YesNoField';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { ErrorText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { isUSCountry, localisationService } from '@covid/core/localisation/LocalisationService';
import { patientCoordinator } from '@covid/core/patient/PatientCoordinator';
import { patientService } from '@covid/core/patient/PatientService';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { AtopyQuestions, IAtopyData } from '@covid/features/patient/fields/AtopyQuestions';
import { BloodGroupQuestion, IBloodGroupData } from '@covid/features/patient/fields/BloodGroupQuestion';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { stripAndRound } from '@covid/utils/number';
import { RouteProp } from '@react-navigation/native';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

import { BloodPressureMedicationQuestion, IBloodPressureData } from './fields/BloodPressureMedicationQuestion';
import { DiabetesQuestions, IDiabetesData } from './fields/DiabetesQuestions';

interface IYourHealthData extends IBloodPressureData, IAtopyData, IDiabetesData, IBloodGroupData {
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

type TProps = {
  route: RouteProp<TScreenParamList, 'YourHealth'>;
};

type TState = {
  errorMessage: string;
  showPregnancyQuestion: boolean;
  showDiabetesQuestion: boolean;
};

const initialState: TState = {
  errorMessage: '',
  showDiabetesQuestion: false,
  showPregnancyQuestion: false,
};

export default class YourHealthScreen extends React.Component<TProps, TState> {
  constructor(props: TProps) {
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

  onSubmit = (values: IYourHealthData) => {
    const currentPatient = patientCoordinator.patientData?.patientState;
    const infos = this.createPatientInfos(values);

    patientService
      .updatePatientInfo(currentPatient.patientId, infos)
      .then(() => {
        currentPatient.hasCompletedPatientDetails = true;
        currentPatient.hasBloodPressureAnswer = true;
        currentPatient.hasAtopyAnswers = true;
        if (values.diabetesType) {
          currentPatient.hasDiabetesAnswers = true;
          currentPatient.shouldAskExtendedDiabetes = false;
        }
        if (values.hasHayfever === 'yes') {
          currentPatient.hasHayfever = true;
        }
        if (values.bloodGroup) {
          currentPatient.hasBloodGroupAnswer = true;
        }
        patientCoordinator.gotoNextScreen(this.props.route.name);
      })
      .catch(() => {
        this.setState({ errorMessage: 'Something went wrong, please try again later' });
      });
  };

  createPatientInfos = (formData: IYourHealthData) => {
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
    } as Partial<TPatientInfosRequest>;

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
  };

  render() {
    const smokerStatusItems = [
      { label: i18n.t('your-health.never-smoked'), value: 'never' },
      { label: i18n.t('your-health.not-currently-smoking'), value: 'not_currently' },
      { label: i18n.t('your-health.yes-smoking'), value: 'yes' },
    ];
    return (
      <Screen profile={patientCoordinator.patientData?.patientState?.profile} testID="your-health-screen">
        <Formik
          initialValues={{
            ...initialFormValues,
            ...BloodPressureMedicationQuestion.initialFormValues(),
            ...AtopyQuestions.initialFormValues(),
            ...DiabetesQuestions.initialFormValues(),
            ...BloodGroupQuestion.initialFormValues(),
          }}
          onSubmit={this.onSubmit}
          validationSchema={() => {
            let schema = this.registerSchema;
            schema = schema.concat(BloodGroupQuestion.schema());
            if (this.state.showDiabetesQuestion) {
              schema = schema.concat(DiabetesQuestions.schema());
            }
            return schema;
          }}
        >
          {(formikProps) => {
            return (
              <Form>
                <ProgressHeader currentStep={3} maxSteps={6} title={i18n.t('your-health.page-title')} />

                <YesNoField
                  required
                  label={i18n.t('your-health.health-problems-that-limit-activity')}
                  onValueChange={formikProps.handleChange('limitedActivity')}
                  selectedValue={formikProps.values.limitedActivity}
                />

                {this.state.showPregnancyQuestion ? (
                  <YesNoField
                    required
                    label={i18n.t('your-health.are-you-pregnant')}
                    onValueChange={formikProps.handleChange('isPregnant')}
                    selectedValue={formikProps.values.isPregnant}
                  />
                ) : null}

                <YesNoField
                  required
                  label={i18n.t('your-health.have-heart-disease')}
                  onValueChange={formikProps.handleChange('hasHeartDisease')}
                  selectedValue={formikProps.values.hasHeartDisease}
                />

                <YesNoField
                  required
                  label={i18n.t('your-health.have-diabetes')}
                  onValueChange={(value: string) => {
                    formikProps.handleChange('hasDiabetes');
                    this.setState({ showDiabetesQuestion: value === 'yes' });
                  }}
                  selectedValue={formikProps.values.hasDiabetes}
                />

                {this.state.showDiabetesQuestion ? (
                  <DiabetesQuestions formikProps={formikProps as unknown as FormikProps<IDiabetesData>} />
                ) : null}

                <AtopyQuestions formikProps={formikProps as unknown as FormikProps<IAtopyData>} />

                <RadioInput
                  required
                  error={formikProps.touched.smokerStatus ? formikProps.errors.smokerStatus : ''}
                  items={smokerStatusItems}
                  label={i18n.t('your-health.is-smoker')}
                  onValueChange={formikProps.handleChange('smokerStatus')}
                  selectedValue={formikProps.values.smokerStatus}
                />

                {formikProps.values.smokerStatus === 'not_currently' ? (
                  <GenericTextField
                    required
                    formikProps={formikProps}
                    keyboardType="numeric"
                    label={i18n.t('your-health.years-since-last-smoked')}
                    name="smokedYearsAgo"
                  />
                ) : null}

                <YesNoField
                  required
                  label={i18n.t('your-health.has-kidney-disease')}
                  onValueChange={formikProps.handleChange('hasKidneyDisease')}
                  selectedValue={formikProps.values.hasKidneyDisease}
                />

                <YesNoField
                  required
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
                      required
                      label={i18n.t('your-health.is-on-chemotherapy')}
                      onValueChange={formikProps.handleChange('doesChemiotherapy')}
                      selectedValue={formikProps.values.doesChemiotherapy}
                    />
                  </>
                ) : null}

                <YesNoField
                  required
                  label={i18n.t('your-health.takes-immunosuppressant')}
                  onValueChange={formikProps.handleChange('takesImmunosuppressants')}
                  selectedValue={formikProps.values.takesImmunosuppressants}
                />

                <YesNoField
                  required
                  label={i18n.t('your-health.takes-asprin')}
                  onValueChange={formikProps.handleChange('takesAspirin')}
                  selectedValue={formikProps.values.takesAspirin}
                />

                <YesNoField
                  required
                  label={i18n.t('your-health.takes-nsaids')}
                  onValueChange={formikProps.handleChange('takesCorticosteroids')}
                  selectedValue={formikProps.values.takesCorticosteroids}
                />

                <BloodPressureMedicationQuestion
                  formikProps={formikProps as unknown as FormikProps<IBloodPressureData>}
                />

                <BloodGroupQuestion formikProps={formikProps as unknown as FormikProps<IBloodGroupData>} />

                <View style={{ flex: 1 }} />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                  <ValidationError error={i18n.t('validation-error-text')} />
                ) : null}
                <BrandedButton
                  enabled={formikProps.isValid && formikProps.dirty}
                  onPress={formikProps.handleSubmit}
                  testID="button-submit"
                >
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
