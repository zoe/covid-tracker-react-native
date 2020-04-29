import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {Formik, FormikProps} from 'formik';
import { Form } from 'native-base';
import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import * as Yup from 'yup';

import DropdownField from '../../components/DropdownField';
import { GenericTextField } from '../../components/GenericTextField';
import ProgressStatus from '../../components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '../../components/Screen';
import { BrandedButton, Divider, ErrorText, HeaderText } from '../../components/Text';
import { ValidationErrors } from '../../components/ValidationError';
import UserService, { isUSCountry } from '../../core/user/UserService';
import { PatientInfosRequest } from '../../core/user/dto/UserAPIContracts';
import i18n from '../../locale/i18n';
import { stripAndRound } from '../../utils/helpers';
import { ScreenParamList } from '../ScreenParamList';
import {BloodPressureData, BloodPressureMedicationQuestion} from "./fields/BloodPressureMedicationQuestion";

export interface YourHealthData extends BloodPressureData {
  isPregnant: string;
  hasHeartDisease: string;
  hasDiabetes: string;
  hasLungDisease: string;
  smokerStatus: string;
  smokedYearsAgo: string;
  hasKidneyDisease: string;

  hasCancer: string;
  cancerType: string;

  doesChemiotherapy: string;
  takesImmunosuppressants: string;
  takesAspirin: string;
  takesCorticosteroids: string;
  takesBloodPressureMedications: string; // pril
  takesAnyBloodPressureMedications: string;
  takesBloodPressureMedicationsSartan: string;

  limitedActivity: string;
}

const initialFormValues = {
  isPregnant: 'no',
  hasHeartDisease: 'no',
  hasDiabetes: 'no',
  hasLungDisease: 'no',
  smokerStatus: 'never',
  smokedYearsAgo: '',
  hasKidneyDisease: 'no',

  hasCancer: 'no',
  cancerType: '',

  doesChemiotherapy: 'no',
  takesImmunosuppressants: 'no',
  takesCorticosteroids: 'no',
  takesAspirin: 'no',
  takesBloodPressureMedications: 'no', // pril
  takesAnyBloodPressureMedications: 'no',
  takesBloodPressureMedicationsSartan: 'no',

  limitedActivity: 'no',
};

type HealthProps = {
  navigation: StackNavigationProp<ScreenParamList, 'YourHealth'>;
  route: RouteProp<ScreenParamList, 'YourHealth'>;
};

type State = {
  errorMessage: string;
};

const initialState: State = {
  errorMessage: '',
};

export default class YourHealthScreen extends Component<HealthProps, State> {
  constructor(props: HealthProps) {
    super(props);
    this.state = initialState;
  }

  registerSchema = Yup.object().shape({
    isPregnant: Yup.string().required(),
    hasHeartDisease: Yup.string().required(),
    hasDiabetes: Yup.string().required(),
    hasLungDisease: Yup.string().required(),
    smokerStatus: Yup.string().required(),
    smokedYearsAgo: Yup.number().when('smokerStatus', {
      is: 'not_currently',
      then: Yup.number().required(),
    }),
    hasKidneyDisease: Yup.string().required(),

    hasCancer: Yup.string().required(),
    cancerType: Yup.string().when('hasCancer', {
      is: (value) => isUSCountry() && value && value === 'yes',
      then: Yup.string().required(),
    }),

    doesChemiotherapy: Yup.string(),
    takesImmunosuppressants: Yup.string().required(),
    takesAspirin: Yup.string().required(),
    takesCorticosteroids: Yup.string().required(),
    takesBloodPressureMedications: Yup.string().required(), // pril
    takesAnyBloodPressureMedications: Yup.string().required(),
    takesBloodPressureMedicationsSartan: Yup.string().required(),
  });

  handleUpdateHealth(formData: YourHealthData) {
    const currentPatient = this.props.route.params.currentPatient;
    const patientId = currentPatient.patientId;

    const userService = new UserService();
    var infos = this.createPatientInfos(formData);

    userService
      .updatePatient(patientId, infos)
      .then((response) => {
        currentPatient.hasCompletePatientDetails = true;
        currentPatient.hasBloodPressureAnswer = true;

        this.props.navigation.navigate('PreviousExposure', { currentPatient });
      })
      .catch((err) => {
        this.setState({ errorMessage: 'Something went wrong, please try again later' });
      });
  }

  private createPatientInfos(formData: YourHealthData) {
    const currentPatient = this.props.route.params.currentPatient;
    const smokerStatus = formData.smokerStatus === 'no' ? 'never' : formData.smokerStatus;
    let infos = {
      has_heart_disease: formData.hasHeartDisease === 'yes',
      has_diabetes: formData.hasDiabetes === 'yes',
      has_lung_disease: formData.hasLungDisease === 'yes',
      has_kidney_disease: formData.hasKidneyDisease === 'yes',
      has_cancer: formData.hasCancer === 'yes',
      takes_immunosuppressants: formData.takesImmunosuppressants === 'yes',
      takes_aspirin: formData.takesAspirin === 'yes',
      takes_corticosteroids: formData.takesCorticosteroids === 'yes',
      takes_any_blood_pressure_medications: formData.takesAnyBloodPressureMedications === 'yes',
      limited_activity: formData.limitedActivity === 'yes',
    } as Partial<PatientInfosRequest>;

    if (currentPatient.isFemale) {
      infos = {
        ...infos,
        is_pregnant: formData.isPregnant === 'yes',
      };
    }

    if (infos.takes_any_blood_pressure_medications) {
      infos = {
        ...infos,
        takes_blood_pressure_medications: formData.takesBloodPressureMedications === 'yes', // pril
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
    return infos;
  }

  render() {
    const currentPatient = this.props.route.params.currentPatient;
    const smokerStatusItems = [
      { label: i18n.t('your-health.never-smoked'), value: 'never' },
      { label: i18n.t('your-health.not-currently-smoking'), value: 'not_currently' },
      { label: i18n.t('your-health.yes-smoking'), value: 'yes' },
    ];
    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('your-health.page-title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={3} maxSteps={6} />
        </ProgressBlock>

        <Formik
          initialValues={initialFormValues}
          validationSchema={this.registerSchema}
          onSubmit={(values: YourHealthData) => {
            return this.handleUpdateHealth(values);
          }}>
          {(props) => {
            return (
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Form>
                  <DropdownField
                    selectedValue={props.values.limitedActivity}
                    onValueChange={props.handleChange('limitedActivity')}
                    label={i18n.t('your-health.health-problems-that-limit-activity')}
                  />

                  <Divider />

                  {currentPatient.isFemale && (
                    <>
                      <DropdownField
                        selectedValue={props.values.isPregnant}
                        onValueChange={props.handleChange('isPregnant')}
                        label={i18n.t('your-health.are-you-pregnant')}
                      />
                      <Divider />
                    </>
                  )}

                  <DropdownField
                    selectedValue={props.values.hasHeartDisease}
                    onValueChange={props.handleChange('hasHeartDisease')}
                    label={i18n.t('your-health.have-heart-disease')}
                  />

                  <DropdownField
                    selectedValue={props.values.hasDiabetes}
                    onValueChange={props.handleChange('hasDiabetes')}
                    label={i18n.t('your-health.have-diabetes')}
                  />

                  <Divider />

                  <DropdownField
                    selectedValue={props.values.hasLungDisease}
                    onValueChange={props.handleChange('hasLungDisease')}
                    label={i18n.t('your-health.have-lung-disease')}
                  />

                  <DropdownField
                    selectedValue={props.values.smokerStatus}
                    onValueChange={props.handleChange('smokerStatus')}
                    label={i18n.t('your-health.is-smoker')}
                    items={smokerStatusItems}
                    error={props.touched.smokerStatus && props.errors.smokerStatus}
                  />

                  {props.values.smokerStatus === 'not_currently' && (
                    <GenericTextField
                      formikProps={props}
                      label={i18n.t('your-health.years-since-last-smoked')}
                      name="smokedYearsAgo"
                      keyboardType="numeric"
                    />
                  )}

                  <Divider />

                  <DropdownField
                    selectedValue={props.values.hasKidneyDisease}
                    onValueChange={props.handleChange('hasKidneyDisease')}
                    label={i18n.t('your-health.has-kidney-disease')}
                  />

                  <Divider />

                  <DropdownField
                    selectedValue={props.values.hasCancer}
                    onValueChange={props.handleChange('hasCancer')}
                    label={i18n.t('your-health.has-cancer')}
                  />

                  {props.values.hasCancer === 'yes' && (
                    <>
                      {isUSCountry() && (
                        <>
                          <GenericTextField
                            formikProps={props}
                            label={i18n.t('your-health.what-cancer-type')}
                            name="cancerType"
                          />
                        </>
                      )}
                      <DropdownField
                        selectedValue={props.values.doesChemiotherapy}
                        onValueChange={props.handleChange('doesChemiotherapy')}
                        label={i18n.t('your-health.is-on-chemotherapy')}
                      />
                    </>
                  )}

                  <DropdownField
                    selectedValue={props.values.takesImmunosuppressants}
                    onValueChange={props.handleChange('takesImmunosuppressants')}
                    label={i18n.t('your-health.takes-immunosuppressant')}
                  />

                  <DropdownField
                    selectedValue={props.values.takesAspirin}
                    onValueChange={props.handleChange('takesAspirin')}
                    label={i18n.t('your-health.takes-asprin')}
                  />

                  <DropdownField
                    selectedValue={props.values.takesCorticosteroids}
                    onValueChange={props.handleChange('takesCorticosteroids')}
                    label={i18n.t('your-health.takes-nsaids')}
                  />

                  <BloodPressureMedicationQuestion formikProps={props as FormikProps<BloodPressureData>}/>

                  <ErrorText>{this.state.errorMessage}</ErrorText>
                  {!!Object.keys(props.errors).length && <ValidationErrors errors={props.errors as string[]} />}

                  <BrandedButton onPress={props.handleSubmit}>{i18n.t('next-question')}</BrandedButton>
                </Form>
              </KeyboardAvoidingView>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
