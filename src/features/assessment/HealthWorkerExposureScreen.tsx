import { BrandedButton } from '@covid/components';
import { FormWrapper } from '@covid/components/Forms';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import YesNoField from '@covid/components/YesNoField';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/services';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

const initialFormValues = {
  hasUsedPPEEquipment: '',
  interactedAnyPatients: 'no',
  ppeAvailabilityAlways: '',
  ppeAvailabilityNever: '',
  ppeAvailabilitySometimes: '',
  treatedPatientsWithCovid: '',
};

interface IHealthWorkerExposureData {
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

export default class HealthWorkerExposureScreen extends React.Component<HealthWorkerExposureProps, State> {
  constructor(props: HealthWorkerExposureProps) {
    super(props);
    this.state = initialState;
  }

  handleUpdate = (formData: IHealthWorkerExposureData) => {
    try {
      const assessment = this.createAssessment(formData);
      assessmentService.saveAssessment(assessment);
      assessmentCoordinator.gotoNextScreen(this.props.route.name);
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
    }
  };

  private createAssessment(formData: IHealthWorkerExposureData) {
    return {
      interacted_any_patients: formData.interactedAnyPatients === 'yes',
      patient: assessmentCoordinator.assessmentData?.patientData?.patientState?.patientId,
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
    hasUsedPPEEquipment: Yup.string().when('interactedAnyPatients', {
      is: 'yes',
      then: Yup.string().required(i18n.t('required-has-used-ppe-equipment')),
    }),
    interactedAnyPatients: Yup.string().required(),
    ppeAvailabilityAlways: Yup.string().when(['interactedAnyPatients', 'hasUsedPPEEquipment'], {
      is: (interactedAnyPatients, hasUsedPPEEquipment) =>
        interactedAnyPatients === 'yes' && hasUsedPPEEquipment === 'always',
      then: Yup.string().required(i18n.t('required-ppe-availability-always')),
    }),
    ppeAvailabilityNever: Yup.string().when(['interactedAnyPatients', 'hasUsedPPEEquipment'], {
      is: (interactedAnyPatients, hasUsedPPEEquipment) =>
        interactedAnyPatients === 'yes' && hasUsedPPEEquipment === 'never',
      then: Yup.string().required(i18n.t('required-ppe-availability-never')),
    }),
    ppeAvailabilitySometimes: Yup.string().when(['interactedAnyPatients', 'hasUsedPPEEquipment'], {
      is: (interactedAnyPatients, hasUsedPPEEquipment) =>
        interactedAnyPatients === 'yes' && hasUsedPPEEquipment === 'sometimes',
      then: Yup.string().required(i18n.t('required-ppe-availability-sometimes')),
    }),
    treatedPatientsWithCovid: Yup.string().when('interactedAnyPatients', {
      is: 'yes',
      then: Yup.string().required(i18n.t('required-treated-patients-with-covid')),
    }),
  });

  render() {
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

    return (
      <Screen
        navigation={this.props.navigation}
        profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      >
        <Header>
          <HeaderText>{i18n.t('title-health-worker-exposure')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={5} step={1} />
        </ProgressBlock>

        <Formik
          initialValues={initialFormValues}
          onSubmit={(values: IHealthWorkerExposureData) => this.handleUpdate(values)}
          validationSchema={this.registerSchema}
        >
          {(props) => {
            return (
              <FormWrapper hasRequiredFields>
                <View>
                  <YesNoField
                    label={i18n.t('health-worker-exposure-question-interacted-any-patients')}
                    onValueChange={props.handleChange('interactedAnyPatients')}
                    selectedValue={props.values.interactedAnyPatients}
                  />

                  {!!props.values.interactedAnyPatients && props.values.interactedAnyPatients === 'yes' ? (
                    <View style={{ marginHorizontal: 16 }}>
                      <RadioInput
                        required
                        items={patientInteractionOptions}
                        label={i18n.t('health-worker-exposure-question-treated-patients-with-covid')}
                        onValueChange={props.handleChange('treatedPatientsWithCovid')}
                        selectedValue={props.values.treatedPatientsWithCovid}
                      />

                      <RadioInput
                        required
                        items={equipmentUsageOptions}
                        label={i18n.t('health-worker-exposure-question-has-used-ppe-equipment')}
                        onValueChange={props.handleChange('hasUsedPPEEquipment')}
                        selectedValue={props.values.hasUsedPPEEquipment}
                      />

                      {props.values.hasUsedPPEEquipment === 'always' ? (
                        <RadioInput
                          required
                          items={availabilityAlwaysOptions}
                          label={i18n.t('label-chose-an-option')}
                          onValueChange={props.handleChange('ppeAvailabilityAlways')}
                          selectedValue={props.values.ppeAvailabilityAlways}
                        />
                      ) : null}

                      {props.values.hasUsedPPEEquipment === 'sometimes' ? (
                        <RadioInput
                          required
                          items={availabilitySometimesOptions}
                          label={i18n.t('label-chose-an-option')}
                          onValueChange={props.handleChange('ppeAvailabilitySometimes')}
                          selectedValue={props.values.ppeAvailabilitySometimes}
                        />
                      ) : null}

                      {props.values.hasUsedPPEEquipment === 'never' ? (
                        <RadioInput
                          required
                          items={availabilityNeverOptions}
                          label={i18n.t('label-chose-an-option')}
                          onValueChange={props.handleChange('ppeAvailabilityNever')}
                          selectedValue={props.values.ppeAvailabilityNever}
                        />
                      ) : null}
                    </View>
                  ) : null}
                </View>

                {!!Object.keys(props.errors).length && props.submitCount > 0 ? (
                  <ValidationError error={i18n.t('validation-error-text')} />
                ) : null}

                <ErrorText>{this.state.errorMessage}</ErrorText>

                <BrandedButton enabled={props.isValid} onPress={props.handleSubmit}>
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
