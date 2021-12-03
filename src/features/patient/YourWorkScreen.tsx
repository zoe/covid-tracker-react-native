import { BrandedButton } from '@covid/components';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { Form } from '@covid/components/Form';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { YesNoField } from '@covid/components/inputs/YesNoField';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { ErrorText, RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { patientCoordinator } from '@covid/core/patient/PatientCoordinator';
import { patientService } from '@covid/core/patient/PatientService';
import {
  EAvailabilityAlwaysOptions,
  EAvailabilityNeverOptions,
  EAvailabilitySometimesOptions,
  EEquipmentUsageOptions,
  EHealthCareStaffOptions,
  EPatientInteractions,
  TPatientInfosRequest,
} from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

interface IYourWorkData {
  isHealthcareStaff: EHealthCareStaffOptions;
  isCarer: 'yes' | 'no';
  hasPatientInteraction: EPatientInteractions;
  hasUsedPPEEquipment: EEquipmentUsageOptions;
  ppeAvailabilityAlways: EAvailabilityAlwaysOptions;
  ppeAvailabilitySometimes: EAvailabilitySometimesOptions;
  ppeAvailabilityNever: EAvailabilityNeverOptions;
}

type TYourWorkProps = {
  route: RouteProp<TScreenParamList, 'YourWork'>;
};

type TState = {
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

const initialState: TState = {
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

const initialFormValues = {} as IYourWorkData;

export default class YourWorkScreen extends React.Component<TYourWorkProps, TState> {
  constructor(props: TYourWorkProps) {
    super(props);
    this.state = initialState;
  }

  checkFormFilled = (props: FormikProps<IYourWorkData>) => {
    if (Object.keys(props.errors).length) return false;
    if (Object.keys(props.values).length === 0) return false;
    return true;
  };

  onSubmit = (values: IYourWorkData, formikHelpers: FormikHelpers<IYourWorkData>) => {
    const currentPatient = patientCoordinator.patientData?.patientState;
    const infos = this.createPatientInfos(values);

    patientService
      .updatePatientInfo(currentPatient?.patientId, infos)
      .then(() => {
        currentPatient.isHealthWorker =
          infos.healthcare_professional === EHealthCareStaffOptions.DOES_INTERACT || infos.is_carer_for_community;
        patientCoordinator.gotoNextScreen(this.props.route.name);
        formikHelpers.setSubmitting(false);
      })
      .catch(() => {
        this.setState({
          errorMessage: i18n.t('something-went-wrong'),
        });
        formikHelpers.setSubmitting(false);
      });
  };

  createPatientInfos = (values: IYourWorkData) => {
    let infos = {
      ...(values.isHealthcareStaff && {
        healthcare_professional: values.isHealthcareStaff,
      }),
      is_carer_for_community: values.isCarer === 'yes',
    } as TPatientInfosRequest;

    if (values.isHealthcareStaff === EHealthCareStaffOptions.DOES_INTERACT || values.isCarer === 'yes') {
      infos = {
        ...infos,
        have_worked_in_hospital_care_facility: this.state.atCareFacility,
        have_worked_in_hospital_clinic: this.state.atClinicOutsideHospital,
        have_worked_in_hospital_home_health: this.state.atHomeHealth,
        have_worked_in_hospital_inpatient: this.state.atHospitalInpatient,
        have_worked_in_hospital_other: this.state.atOtherFacility,
        have_worked_in_hospital_outpatient: this.state.atHospitalOutpatient,
        have_worked_in_hospital_school_clinic: this.state.atSchoolClinic,

        ...(values.hasPatientInteraction && {
          interacted_patients_with_covid: values.hasPatientInteraction,
        }),
        ...(values.hasUsedPPEEquipment && {
          have_used_PPE: values.hasUsedPPEEquipment,
        }),
        ...(values.hasUsedPPEEquipment === 'always' &&
          values.ppeAvailabilityAlways && {
            always_used_shortage: values.ppeAvailabilityAlways,
          }),
        ...(values.hasUsedPPEEquipment === 'sometimes' &&
          values.ppeAvailabilitySometimes && {
            sometimes_used_shortage: values.ppeAvailabilitySometimes,
          }),
        ...(values.hasUsedPPEEquipment === 'never' &&
          values.ppeAvailabilityNever && {
            never_used_shortage: values.ppeAvailabilityNever,
          }),
      };
    }

    return infos;
  };

  registerSchema = Yup.object().shape({
    hasPatientInteraction: Yup.string().when(['isHealthcareStaff', 'isCarer'], {
      is: (isHealthcareStaff, isCarer) =>
        isHealthcareStaff === EHealthCareStaffOptions.DOES_INTERACT || isCarer === 'yes',
      then: Yup.string().required(i18n.t('required-has-patient-interaction')),
    }),
    hasUsedPPEEquipment: Yup.string().when(['isHealthcareStaff', 'isCarer'], {
      is: (isHealthcareStaff, isCarer) =>
        isHealthcareStaff === EHealthCareStaffOptions.DOES_INTERACT || isCarer === 'yes',
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
        value: EHealthCareStaffOptions.NO,
      },
      {
        label: i18n.t('yes-interacting-patients'),
        value: EHealthCareStaffOptions.DOES_INTERACT,
      },
      {
        label: i18n.t('yes-not-interacting-patients'),
        value: EHealthCareStaffOptions.DOES_NOT_INTERACT,
      },
    ];

    const equipmentUsageOptions = [
      {
        label: i18n.t('health-worker-exposure-picker-ppe-always'),
        value: EEquipmentUsageOptions.ALWAYS,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-sometimes'),
        value: EEquipmentUsageOptions.SOMETIMES,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-never'),
        value: EEquipmentUsageOptions.NEVER,
      },
    ];

    const availabilityAlwaysOptions = [
      {
        label: i18n.t('health-worker-exposure-picker-ppe-always-all-needed'),
        value: EAvailabilityAlwaysOptions.ALL_NEEDED,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-always-reused'),
        value: EAvailabilityAlwaysOptions.REUSED,
      },
    ];

    const availabilitySometimesOptions = [
      {
        label: i18n.t('health-worker-exposure-picker-ppe-sometimes-all-needed'),
        value: EAvailabilitySometimesOptions.ALL_NEEDED,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-sometimes-not-enough'),
        value: EAvailabilitySometimesOptions.NOT_ENOUGH,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-sometimes-reused'),
        value: EAvailabilitySometimesOptions.REUSED,
      },
    ];

    const availabilityNeverOptions = [
      {
        label: i18n.t('health-worker-exposure-picker-ppe-never-not-needed'),
        value: EAvailabilityNeverOptions.NOT_NEEDED,
      },
      {
        label: i18n.t('health-worker-exposure-picker-ppe-never-not-available'),
        value: EAvailabilityNeverOptions.NOT_AVAILABLE,
      },
    ];

    const patientInteractionOptions = [
      {
        label: i18n.t('exposed-yes-documented'),
        value: EPatientInteractions.YES_DOCUMENTED,
      },
      {
        label: i18n.t('exposed-yes-undocumented'),
        value: EPatientInteractions.YES_SUSPECTED,
      },
      {
        label: i18n.t('exposed-both'),
        value: EPatientInteractions.YES_DOCUMENTED_SUSPECTED,
      },
      { label: i18n.t('exposed-no'), value: EPatientInteractions.NO },
    ];

    return (
      <Screen profile={patientCoordinator.patientData?.patientState?.profile} testID="your-work-screen">
        <Formik initialValues={initialFormValues} onSubmit={this.onSubmit} validationSchema={this.registerSchema}>
          {(formikProps) => {
            const {
              isHealthcareStaff,
              isCarer,
              hasUsedPPEEquipment,
              hasPatientInteraction,
              ppeAvailabilitySometimes,
              ppeAvailabilityAlways,
              ppeAvailabilityNever,
            } = formikProps.values;

            const showWorkerAndCarerQuestions: boolean =
              (!!isHealthcareStaff && isHealthcareStaff === EHealthCareStaffOptions.DOES_INTERACT) ||
              (!!isCarer && isCarer === 'yes');
            return (
              <Form>
                <ProgressHeader currentStep={2} maxSteps={6} title={i18n.t('title-about-work')} />

                <RadioInput
                  required
                  error={formikProps.touched.isHealthcareStaff ? formikProps.errors.isHealthcareStaff : ''}
                  items={healthcareStaffOptions}
                  label={i18n.t('are-you-healthcare-staff')}
                  onValueChange={formikProps.handleChange('isHealthcareStaff')}
                  selectedValue={isHealthcareStaff}
                  testID="input-healthcare-staff"
                />

                <YesNoField
                  required
                  error={formikProps.touched.isCarer && formikProps.errors.isCarer}
                  label={i18n.t('are-you-carer')}
                  onValueChange={formikProps.handleChange('isCarer')}
                  selectedValue={isCarer}
                  testID="is-carer-question"
                />

                {showWorkerAndCarerQuestions ? (
                  <>
                    <RegularText style={{ marginTop: sizes.m }}>
                      {i18n.t('label-physically-worked-in-places')}
                    </RegularText>

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

                    <RadioInput
                      required
                      error={formikProps.touched.hasPatientInteraction ? formikProps.errors.hasPatientInteraction : ''}
                      items={patientInteractionOptions}
                      label={i18n.t('label-interacted-with-infected-patients')}
                      onValueChange={formikProps.handleChange('hasPatientInteraction')}
                      selectedValue={hasPatientInteraction}
                    />

                    <RadioInput
                      required
                      error={formikProps.touched.hasUsedPPEEquipment ? formikProps.errors.hasUsedPPEEquipment : ''}
                      items={equipmentUsageOptions}
                      label={i18n.t('label-used-ppe-equipment')}
                      onValueChange={formikProps.handleChange('hasUsedPPEEquipment')}
                      selectedValue={hasUsedPPEEquipment}
                    />

                    {hasUsedPPEEquipment === 'always' ? (
                      <RadioInput
                        required
                        error={
                          formikProps.touched.ppeAvailabilityAlways ? formikProps.errors.ppeAvailabilityAlways : ''
                        }
                        items={availabilityAlwaysOptions}
                        label={i18n.t('label-chose-an-option')}
                        onValueChange={formikProps.handleChange('ppeAvailabilityAlways')}
                        selectedValue={ppeAvailabilityAlways}
                      />
                    ) : null}

                    {hasUsedPPEEquipment === 'sometimes' ? (
                      <RadioInput
                        required
                        error={
                          formikProps.touched.ppeAvailabilitySometimes
                            ? formikProps.errors.ppeAvailabilitySometimes
                            : ''
                        }
                        items={availabilitySometimesOptions}
                        label={i18n.t('label-chose-an-option')}
                        onValueChange={formikProps.handleChange('ppeAvailabilitySometimes')}
                        selectedValue={ppeAvailabilitySometimes}
                      />
                    ) : null}

                    {hasUsedPPEEquipment === 'never' ? (
                      <RadioInput
                        required
                        error={formikProps.touched.ppeAvailabilityNever ? formikProps.errors.ppeAvailabilityNever : ''}
                        items={availabilityNeverOptions}
                        label={i18n.t('label-chose-an-option')}
                        onValueChange={formikProps.handleChange('ppeAvailabilityNever')}
                        selectedValue={ppeAvailabilityNever}
                      />
                    ) : null}
                  </>
                ) : null}

                <View style={{ flex: 1 }} />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                  <ValidationError error={i18n.t('validation-error-text')} />
                ) : null}

                <BrandedButton
                  enabled={this.checkFormFilled(formikProps)}
                  loading={formikProps.isSubmitting}
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
