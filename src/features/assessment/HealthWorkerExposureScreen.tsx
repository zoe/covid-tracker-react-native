import { assessmentService } from '@covid/Services';
import DropdownField from '@covid/components/DropdownField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, isAndroid, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import AssessmentCoordinator from '@covid/features/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Form } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

import { ScreenParamList } from '../ScreenParamList';

const initialFormValues = {
  interactedAnyPatients: 'no',
  treatedPatientsWithCovid: '',
  hasUsedPPEEquipment: '',
  ppeAvailabilityAlways: '',
  ppeAvailabilitySometimes: '',
  ppeAvailabilityNever: '',
};

interface HealthWorkerExposureData {
  interactedAnyPatients: string;
  treatedPatientsWithCovid: string;
  hasUsedPPEEquipment: string;
  ppeAvailabilityAlways: string;
  ppeAvailabilitySometimes: string;
  ppeAvailabilityNever: string;
}

type HealthWorkerExposureProps = {
  navigation: StackNavigationProp<ScreenParamList, 'HealthWorkerExposure'>;
  route: RouteProp<ScreenParamList, 'HealthWorkerExposure'>;
};

type State = {
  errorMessage: string;
};

const initialState: State = {
  errorMessage: '',
};

export default class HealthWorkerExposureScreen extends Component<HealthWorkerExposureProps, State> {
  constructor(props: HealthWorkerExposureProps) {
    super(props);
    this.state = initialState;
  }

  handleUpdate = async (formData: HealthWorkerExposureData) => {
    try {
      const { assessmentId } = AssessmentCoordinator.assessmentData;
      var assessment = this.createAssessment(formData);

      const response = await assessmentService.saveAssessment(assessmentId!, assessment);
      if (!assessmentId) {
        AssessmentCoordinator.assessmentData.assessmentId = response.id;
      }
      AssessmentCoordinator.gotoNextScreen(this.props.route.name);
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
    }
  };

  private createAssessment(formData: HealthWorkerExposureData) {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;
    const patientId = currentPatient.patientId;

    return {
      patient: patientId,
      interacted_any_patients: formData.interactedAnyPatients === 'yes',
      ...(formData.treatedPatientsWithCovid && { treated_patients_with_covid: formData.treatedPatientsWithCovid }),
      ...(formData.hasUsedPPEEquipment && { have_used_PPE: formData.hasUsedPPEEquipment }),
      ...(formData.hasUsedPPEEquipment === 'always' &&
        formData.ppeAvailabilityAlways && { always_used_shortage: formData.ppeAvailabilityAlways }),
      ...(formData.hasUsedPPEEquipment === 'sometimes' &&
        formData.ppeAvailabilitySometimes && { sometimes_used_shortage: formData.ppeAvailabilitySometimes }),
      ...(formData.hasUsedPPEEquipment === 'never' &&
        formData.ppeAvailabilityNever && { never_used_shortage: formData.ppeAvailabilityNever }),
    } as Partial<AssessmentInfosRequest>;
  }

  registerSchema = Yup.object().shape({
    interactedAnyPatients: Yup.string().required(),
    treatedPatientsWithCovid: Yup.string().when('interactedAnyPatients', {
      is: 'yes',
      then: Yup.string().required(i18n.t('required-treated-patients-with-covid')),
    }),
    hasUsedPPEEquipment: Yup.string().when('interactedAnyPatients', {
      is: 'yes',
      then: Yup.string().required(i18n.t('required-has-used-ppe-equipment')),
    }),
    ppeAvailabilityAlways: Yup.string().when(['interactedAnyPatients', 'hasUsedPPEEquipment'], {
      is: (interactedAnyPatients, hasUsedPPEEquipment) =>
        interactedAnyPatients === 'yes' && hasUsedPPEEquipment === 'always',
      then: Yup.string().required(i18n.t('required-ppe-availability-always')),
    }),
    ppeAvailabilitySometimes: Yup.string().when(['interactedAnyPatients', 'hasUsedPPEEquipment'], {
      is: (interactedAnyPatients, hasUsedPPEEquipment) =>
        interactedAnyPatients === 'yes' && hasUsedPPEEquipment === 'sometimes',
      then: Yup.string().required(i18n.t('required-ppe-availability-sometimes')),
    }),
    ppeAvailabilityNever: Yup.string().when(['interactedAnyPatients', 'hasUsedPPEEquipment'], {
      is: (interactedAnyPatients, hasUsedPPEEquipment) =>
        interactedAnyPatients === 'yes' && hasUsedPPEEquipment === 'never',
      then: Yup.string().required(i18n.t('required-ppe-availability-never')),
    }),
  });

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;
    const patientInteractionOptions = [
      { label: i18n.t('health-worker-exposure-picker-patient-interaction-yes-documented'), value: 'yes_documented' },
      { label: i18n.t('health-worker-exposure-picker-patient-interaction-yes-suspected'), value: 'yes_suspected' },
      {
        label: i18n.t('health-worker-exposure-picker-patient-interaction-yes-both'),
        value: 'yes_documented_suspected',
      },
      { label: i18n.t('health-worker-exposure-picker-patient-interaction-no'), value: 'no' },
    ];
    const equipmentUsageOptions = [
      { label: i18n.t('health-worker-exposure-picker-ppe-always'), value: 'always' },
      { label: i18n.t('health-worker-exposure-picker-ppe-sometimes'), value: 'sometimes' },
      { label: i18n.t('health-worker-exposure-picker-ppe-never'), value: 'never' },
    ];

    const availabilityAlwaysOptions = [
      { label: i18n.t('health-worker-exposure-picker-ppe-always-all-needed'), value: 'all_needed' },
      { label: i18n.t('health-worker-exposure-picker-ppe-always-reused'), value: 'reused' },
    ];
    const availabilitySometimesOptions = [
      { label: i18n.t('health-worker-exposure-picker-ppe-sometimes-all-needed'), value: 'all_needed' },
      { label: i18n.t('health-worker-exposure-picker-ppe-sometimes-not-enough'), value: 'not_enough' },
      { label: i18n.t('health-worker-exposure-picker-ppe-sometimes-reused'), value: 'reused' },
    ];
    const availabilityNeverOptions = [
      { label: i18n.t('health-worker-exposure-picker-ppe-never-not-needed'), value: 'not_needed' },
      { label: i18n.t('health-worker-exposure-picker-ppe-never-not-available'), value: 'not_available' },
    ];

    if (isAndroid) {
      equipmentUsageOptions.unshift({ label: i18n.t('choose-one-of-these-options'), value: '' });
      availabilityAlwaysOptions.unshift({ label: i18n.t('choose-one-of-these-options'), value: '' });
      availabilitySometimesOptions.unshift({ label: i18n.t('choose-one-of-these-options'), value: '' });
      availabilityNeverOptions.unshift({ label: i18n.t('choose-one-of-these-options'), value: '' });
      patientInteractionOptions.unshift({ label: i18n.t('choose-one-of-these-options'), value: '' });
    }

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('title-health-worker-exposure')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={1} maxSteps={5} />
        </ProgressBlock>

        <Formik
          initialValues={initialFormValues}
          validationSchema={this.registerSchema}
          onSubmit={(values: HealthWorkerExposureData) => this.handleUpdate(values)}>
          {(props) => {
            return (
              <Form>
                <View>
                  <DropdownField
                    selectedValue={props.values.interactedAnyPatients}
                    onValueChange={props.handleChange('interactedAnyPatients')}
                    label={i18n.t('health-worker-exposure-question-interacted-any-patients')}
                  />

                  {!!props.values.interactedAnyPatients && props.values.interactedAnyPatients === 'yes' && (
                    <>
                      <DropdownField
                        selectedValue={props.values.treatedPatientsWithCovid}
                        onValueChange={props.handleChange('treatedPatientsWithCovid')}
                        label={i18n.t('health-worker-exposure-question-treated-patients-with-covid')}
                        items={patientInteractionOptions}
                      />

                      <DropdownField
                        selectedValue={props.values.hasUsedPPEEquipment}
                        onValueChange={props.handleChange('hasUsedPPEEquipment')}
                        label={i18n.t('health-worker-exposure-question-has-used-ppe-equipment')}
                        items={equipmentUsageOptions}
                      />

                      {props.values.hasUsedPPEEquipment === 'always' && (
                        <DropdownField
                          selectedValue={props.values.ppeAvailabilityAlways}
                          onValueChange={props.handleChange('ppeAvailabilityAlways')}
                          label={i18n.t('label-chose-an-option')}
                          items={availabilityAlwaysOptions}
                        />
                      )}

                      {props.values.hasUsedPPEEquipment === 'sometimes' && (
                        <DropdownField
                          selectedValue={props.values.ppeAvailabilitySometimes}
                          onValueChange={props.handleChange('ppeAvailabilitySometimes')}
                          label={i18n.t('label-chose-an-option')}
                          items={availabilitySometimesOptions}
                        />
                      )}

                      {props.values.hasUsedPPEEquipment === 'never' && (
                        <DropdownField
                          selectedValue={props.values.ppeAvailabilityNever}
                          onValueChange={props.handleChange('ppeAvailabilityNever')}
                          label={i18n.t('label-chose-an-option')}
                          items={availabilityNeverOptions}
                        />
                      )}
                    </>
                  )}
                </View>

                {!!Object.keys(props.errors).length && <ErrorText>{i18n.t('validation-error-text-no-info')}</ErrorText>}
                <ErrorText>{this.state.errorMessage}</ErrorText>

                <BrandedButton onPress={props.handleSubmit}>{i18n.t('next-question')}</BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
