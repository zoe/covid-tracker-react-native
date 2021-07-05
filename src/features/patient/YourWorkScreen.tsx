import { BrandedButton } from '@covid/components';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { FormWrapper } from '@covid/components/Forms';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import YesNoField from '@covid/components/YesNoField';
import { patientCoordinator } from '@covid/core/patient/PatientCoordinator';
import { patientService } from '@covid/core/patient/PatientService';
import {
  AvailabilityAlwaysOptions,
  AvailabilityNeverOptions,
  AvailabilitySometimesOptions,
  EquipmentUsageOptions,
  HealthCareStaffOptions,
  PatientInfosRequest,
  PatientInteractions,
} from '@covid/core/user/dto/UserAPIContracts';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Item, Label } from 'native-base';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

export interface IYourWorkData {
  isHealthcareStaff: HealthCareStaffOptions;
  isCarer: 'yes' | 'no';
  hasPatientInteraction: PatientInteractions;
  hasUsedPPEEquipment: EquipmentUsageOptions;
  ppeAvailabilityAlways: AvailabilityAlwaysOptions;
  ppeAvailabilitySometimes: AvailabilitySometimesOptions;
  ppeAvailabilityNever: AvailabilityNeverOptions;
}

export type YourWorkProps = {
  navigation: StackNavigationProp<ScreenParamList, 'YourWork'>;
  route: RouteProp<ScreenParamList, 'YourWork'>;
};

export type State = {
  isDiabetesRegistry: boolean;
  atHospitalInpatient: boolean;
  atHospitalOutpatient: boolean;
  atClinicOutsideHospital: boolean;
  atCareFacility: boolean;
  atHomeHealth: boolean;
  atSchoolClinic: boolean;
  atOtherFacility: boolean;

  errorMessage: string;
};

const initialState: State = {
  atCareFacility: false,
  atClinicOutsideHospital: false,
  atHomeHealth: false,
  atHospitalInpatient: false,
  atHospitalOutpatient: false,
  atOtherFacility: false,
  atSchoolClinic: false,
  errorMessage: '',

  isDiabetesRegistry: false,
};

export default class YourWorkScreen extends React.Component<YourWorkProps, State> {
  constructor(props: YourWorkProps) {
    super(props);
    this.state = initialState;
  }

  checkFormFilled = (props: FormikProps<IYourWorkData>) => {
    if (Object.keys(props.errors).length) return false;
    if (Object.keys(props.values).length === 0) return false;
    return true;
  };

  handleUpdateWork(formData: IYourWorkData) {
    const currentPatient = patientCoordinator.patientData?.patientState;
    const infos = this.createPatientInfos(formData);

    patientService
      .updatePatientInfo(currentPatient?.patientId, infos)
      .then(() => {
        currentPatient.isHealthWorker =
          infos.healthcare_professional === HealthCareStaffOptions.DOES_INTERACT || infos.is_carer_for_community;
        patientCoordinator.gotoNextScreen(this.props.route.name);
      })
      .catch(() =>
        this.setState({
          errorMessage: i18n.t('something-went-wrong'),
        }),
      );
  }

  private createPatientInfos(formData: IYourWorkData) {
    let infos = {
      ...(formData.isHealthcareStaff && {
        healthcare_professional: formData.isHealthcareStaff,
      }),
      is_carer_for_community: formData.isCarer === 'yes',
    } as PatientInfosRequest;

    if (formData.isHealthcareStaff === HealthCareStaffOptions.DOES_INTERACT || formData.isCarer === 'yes') {
      infos = {
        ...infos,
        have_worked_in_hospital_care_facility: this.state.atCareFacility,
        have_worked_in_hospital_clinic: this.state.atClinicOutsideHospital,
        have_worked_in_hospital_home_health: this.state.atHomeHealth,
        have_worked_in_hospital_inpatient: this.state.atHospitalInpatient,
        have_worked_in_hospital_other: this.state.atOtherFacility,
        have_worked_in_hospital_outpatient: this.state.atHospitalOutpatient,
        have_worked_in_hospital_school_clinic: this.state.atSchoolClinic,

        ...(formData.hasPatientInteraction && {
          interacted_patients_with_covid: formData.hasPatientInteraction,
        }),
        ...(formData.hasUsedPPEEquipment && {
          have_used_PPE: formData.hasUsedPPEEquipment,
        }),
        ...(formData.hasUsedPPEEquipment === 'always' &&
          formData.ppeAvailabilityAlways && {
            always_used_shortage: formData.ppeAvailabilityAlways,
          }),
        ...(formData.hasUsedPPEEquipment === 'sometimes' &&
          formData.ppeAvailabilitySometimes && {
            sometimes_used_shortage: formData.ppeAvailabilitySometimes,
          }),
        ...(formData.hasUsedPPEEquipment === 'never' &&
          formData.ppeAvailabilityNever && {
            never_used_shortage: formData.ppeAvailabilityNever,
          }),
      };
    }

    return infos;
  }

  registerSchema = Yup.object().shape({
    hasPatientInteraction: Yup.string().when(['isHealthcareStaff', 'isCarer'], {
      is: (isHealthcareStaff, isCarer) =>
        isHealthcareStaff === HealthCareStaffOptions.DOES_INTERACT || isCarer === 'yes',
      then: Yup.string().required(i18n.t('required-has-patient-interaction')),
    }),
    hasUsedPPEEquipment: Yup.string().when(['isHealthcareStaff', 'isCarer'], {
      is: (isHealthcareStaff, isCarer) =>
        isHealthcareStaff === HealthCareStaffOptions.DOES_INTERACT || isCarer === 'yes',
      then: Yup.string().required(i18n.t('required-has-used-ppe-equipment')),
    }),
    isCarer: Yup.string().required(i18n.t('required-is-carer')),
    isHealthcareStaff: Yup.string().required(i18n.t('required-is-healthcare-worker')),
    ppeAvailabilityAlways: Yup.string().when('hasUsedPPEEquipment', {
      is: 'always',
      then: Yup.string().required(i18n.t('required-ppe-availability')),
    }),
    ppeAvailabilityNever: Yup.string().when('hasUsedPPEEquipment', {
      is: 'never',
      then: Yup.string().required(i18n.t('required-ppe-availability')),
    }),
    ppeAvailabilitySometimes: Yup.string().when('hasUsedPPEEquipment', {
      is: 'sometimes',
      then: Yup.string().required(i18n.t('required-ppe-availability')),
    }),
  });

  render() {
    const healthcareStaffOptions = [
      {
        label: i18n.t('picker-no'),
        value: HealthCareStaffOptions.NO,
      },
      {
        label: i18n.t('yes-interacting-patients'),
        value: HealthCareStaffOptions.DOES_INTERACT,
      },
      {
        label: i18n.t('yes-not-interacting-patients'),
        value: HealthCareStaffOptions.DOES_NOT_INTERACT,
      },
    ];

    const equipmentUsageOptions = [
      {
        label: i18n.t('health-worker-exposure-picker-ppe-always'),
        value: EquipmentUsageOptions.ALWAYS,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-sometimes'),
        value: EquipmentUsageOptions.SOMETIMES,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-never'),
        value: EquipmentUsageOptions.NEVER,
      },
    ];

    const availabilityAlwaysOptions = [
      {
        label: i18n.t('health-worker-exposure-picker-ppe-always-all-needed'),
        value: AvailabilityAlwaysOptions.ALL_NEEDED,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-always-reused'),
        value: AvailabilityAlwaysOptions.REUSED,
      },
    ];

    const availabilitySometimesOptions = [
      {
        label: i18n.t('health-worker-exposure-picker-ppe-sometimes-all-needed'),
        value: AvailabilitySometimesOptions.ALL_NEEDED,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-sometimes-not-enough'),
        value: AvailabilitySometimesOptions.NOT_ENOUGH,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-sometimes-reused'),
        value: AvailabilitySometimesOptions.REUSED,
      },
    ];

    const availabilityNeverOptions = [
      {
        label: i18n.t('health-worker-exposure-picker-ppe-never-not-needed'),
        value: AvailabilityNeverOptions.NOT_NEEDED,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-never-not-available'),
        value: AvailabilityNeverOptions.NOT_AVAILABLE,
      },
    ];

    const patientInteractionOptions = [
      {
        label: i18n.t('exposed-yes-documented'),
        value: PatientInteractions.YES_DOCUMENTED,
      },
      {
        label: i18n.t('exposed-yes-undocumented'),
        value: PatientInteractions.YES_SUSPECTED,
      },
      {
        label: i18n.t('exposed-both'),
        value: PatientInteractions.YES_DOCUMENTED_SUSPECTED,
      },
      { label: i18n.t('exposed-no'), value: PatientInteractions.NO },
    ];

    return (
      <Screen
        navigation={this.props.navigation}
        profile={patientCoordinator.patientData?.patientState?.profile}
        testID="your-work-screen"
      >
        <Header>
          <HeaderText>{i18n.t('title-about-work')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={6} step={2} />
        </ProgressBlock>

        <Formik
          initialValues={{} as IYourWorkData}
          onSubmit={(values: IYourWorkData) => this.handleUpdateWork(values)}
          validationSchema={this.registerSchema}
        >
          {(props) => {
            const {
              isHealthcareStaff,
              isCarer,
              hasUsedPPEEquipment,
              hasPatientInteraction,
              ppeAvailabilitySometimes,
              ppeAvailabilityAlways,
              ppeAvailabilityNever,
            } = props.values;
            const { handleSubmit, handleChange, touched, errors } = props;

            const showWorkerAndCarerQuestions: boolean =
              (!!isHealthcareStaff && isHealthcareStaff === HealthCareStaffOptions.DOES_INTERACT) ||
              (!!isCarer && isCarer === 'yes');
            return (
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <FormWrapper hasRequiredFields>
                  <View style={{ marginHorizontal: 16 }}>
                    <RadioInput
                      required
                      error={touched.isHealthcareStaff ? errors.isHealthcareStaff : ''}
                      items={healthcareStaffOptions}
                      label={i18n.t('are-you-healthcare-staff')}
                      onValueChange={handleChange('isHealthcareStaff')}
                      selectedValue={isHealthcareStaff}
                      testID="input-healthcare-staff"
                    />

                    <YesNoField
                      required
                      error={touched.isCarer && errors.isCarer}
                      label={i18n.t('are-you-carer')}
                      onValueChange={handleChange('isCarer')}
                      selectedValue={isCarer}
                      testID="is-carer-question"
                    />

                    {/* if is healthcare worker question is yes */}
                    {showWorkerAndCarerQuestions ? (
                      <View>
                        <FieldWrapper>
                          <Item stackedLabel style={styles.textItemStyle}>
                            <Label>{i18n.t('label-physically-worked-in-places')}</Label>

                            <CheckboxList>
                              <CheckboxItem
                                onChange={(value: boolean) =>
                                  this.setState({
                                    atHospitalInpatient: value,
                                  })
                                }
                                value={this.state.atHospitalInpatient}
                              >
                                {i18n.t('your-work.worked-hospital-inpatient')}
                              </CheckboxItem>
                              <CheckboxItem
                                onChange={(value: boolean) =>
                                  this.setState({
                                    atHospitalOutpatient: value,
                                  })
                                }
                                value={this.state.atHospitalOutpatient}
                              >
                                {i18n.t('your-work.worked-hospital-outpatient')}
                              </CheckboxItem>
                              <CheckboxItem
                                onChange={(value: boolean) =>
                                  this.setState({
                                    atClinicOutsideHospital: value,
                                  })
                                }
                                value={this.state.atClinicOutsideHospital}
                              >
                                {i18n.t('your-work.worked-clinic-outside-hospital')}
                              </CheckboxItem>
                              <CheckboxItem
                                onChange={(value: boolean) =>
                                  this.setState({
                                    atCareFacility: value,
                                  })
                                }
                                value={this.state.atCareFacility}
                              >
                                {i18n.t('your-work.worked-nursing-home')}
                              </CheckboxItem>
                              <CheckboxItem
                                onChange={(value: boolean) =>
                                  this.setState({
                                    atHomeHealth: value,
                                  })
                                }
                                value={this.state.atHomeHealth}
                              >
                                {i18n.t('your-work.worked-home-health')}
                              </CheckboxItem>
                              <CheckboxItem
                                onChange={(value: boolean) =>
                                  this.setState({
                                    atSchoolClinic: value,
                                  })
                                }
                                value={this.state.atSchoolClinic}
                              >
                                {i18n.t('your-work.worked-school-clinic')}
                              </CheckboxItem>
                              <CheckboxItem
                                onChange={(value: boolean) =>
                                  this.setState({
                                    atOtherFacility: value,
                                  })
                                }
                                value={this.state.atOtherFacility}
                              >
                                {i18n.t('your-work.worked-other-facility')}
                              </CheckboxItem>
                            </CheckboxList>
                          </Item>
                        </FieldWrapper>

                        <RadioInput
                          required
                          error={touched.hasPatientInteraction ? errors.hasPatientInteraction : ''}
                          items={patientInteractionOptions}
                          label={i18n.t('label-interacted-with-infected-patients')}
                          onValueChange={handleChange('hasPatientInteraction')}
                          selectedValue={hasPatientInteraction}
                        />

                        <RadioInput
                          required
                          error={touched.hasUsedPPEEquipment ? errors.hasUsedPPEEquipment : ''}
                          items={equipmentUsageOptions}
                          label={i18n.t('label-used-ppe-equipment')}
                          onValueChange={handleChange('hasUsedPPEEquipment')}
                          selectedValue={hasUsedPPEEquipment}
                        />

                        {hasUsedPPEEquipment === 'always' ? (
                          <RadioInput
                            required
                            error={touched.ppeAvailabilityAlways ? errors.ppeAvailabilityAlways : ''}
                            items={availabilityAlwaysOptions}
                            label={i18n.t('label-chose-an-option')}
                            onValueChange={handleChange('ppeAvailabilityAlways')}
                            selectedValue={ppeAvailabilityAlways}
                          />
                        ) : null}

                        {hasUsedPPEEquipment === 'sometimes' ? (
                          <RadioInput
                            required
                            error={touched.ppeAvailabilitySometimes ? errors.ppeAvailabilitySometimes : ''}
                            items={availabilitySometimesOptions}
                            label={i18n.t('label-chose-an-option')}
                            onValueChange={handleChange('ppeAvailabilitySometimes')}
                            selectedValue={ppeAvailabilitySometimes}
                          />
                        ) : null}

                        {hasUsedPPEEquipment === 'never' ? (
                          <RadioInput
                            required
                            error={touched.ppeAvailabilityNever ? errors.ppeAvailabilityNever : ''}
                            items={availabilityNeverOptions}
                            label={i18n.t('label-chose-an-option')}
                            onValueChange={handleChange('ppeAvailabilityNever')}
                            selectedValue={ppeAvailabilityNever}
                          />
                        ) : null}
                      </View>
                    ) : null}
                  </View>

                  <ErrorText>{this.state.errorMessage}</ErrorText>
                  {!!Object.keys(errors).length && props.submitCount > 0 ? (
                    <ValidationError error={i18n.t('validation-error-text')} />
                  ) : null}

                  <BrandedButton
                    enabled={this.checkFormFilled(props)}
                    loading={props.isSubmitting}
                    onPress={handleSubmit}
                    testID="button-submit"
                  >
                    {i18n.t('next-question')}
                  </BrandedButton>
                </FormWrapper>
              </KeyboardAvoidingView>
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
});
