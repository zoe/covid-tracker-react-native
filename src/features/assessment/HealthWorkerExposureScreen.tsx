import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { YesNoField } from '@covid/components/inputs/YesNoField';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { ErrorText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { assessmentService } from '@covid/services';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
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

type TProps = {
  route: RouteProp<TScreenParamList, 'HealthWorkerExposure'>;
};

type TState = {
  errorMessage: string;
};

const initialState: TState = {
  errorMessage: '',
};

export default class HealthWorkerExposureScreen extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = initialState;
  }

  onSubmit = (values: IHealthWorkerExposureData) => {
    try {
      const assessment = this.createAssessment(values);
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
    } as Partial<TAssessmentInfosRequest>;
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
        profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
        testID="health-worker-exposure-screen"
      >
        <ProgressHeader
          currentStep={1}
          maxSteps={5}
          style={styling.marginBottomHuge}
          title={i18n.t('title-health-worker-exposure')}
        />

        <Formik initialValues={initialFormValues} onSubmit={this.onSubmit} validationSchema={this.registerSchema}>
          {(formikProps) => {
            return (
              <Form hasRequiredFields>
                <YesNoField
                  label={i18n.t('health-worker-exposure-question-interacted-any-patients')}
                  onValueChange={formikProps.handleChange('interactedAnyPatients')}
                  selectedValue={formikProps.values.interactedAnyPatients}
                />

                {!!formikProps.values.interactedAnyPatients && formikProps.values.interactedAnyPatients === 'yes' ? (
                  <>
                    <RadioInput
                      required
                      items={patientInteractionOptions}
                      label={i18n.t('health-worker-exposure-question-treated-patients-with-covid')}
                      onValueChange={formikProps.handleChange('treatedPatientsWithCovid')}
                      selectedValue={formikProps.values.treatedPatientsWithCovid}
                    />

                    <RadioInput
                      required
                      items={equipmentUsageOptions}
                      label={i18n.t('health-worker-exposure-question-has-used-ppe-equipment')}
                      onValueChange={formikProps.handleChange('hasUsedPPEEquipment')}
                      selectedValue={formikProps.values.hasUsedPPEEquipment}
                    />

                    {formikProps.values.hasUsedPPEEquipment === 'always' ? (
                      <RadioInput
                        required
                        items={availabilityAlwaysOptions}
                        label={i18n.t('label-chose-an-option')}
                        onValueChange={formikProps.handleChange('ppeAvailabilityAlways')}
                        selectedValue={formikProps.values.ppeAvailabilityAlways}
                      />
                    ) : null}

                    {formikProps.values.hasUsedPPEEquipment === 'sometimes' ? (
                      <RadioInput
                        required
                        items={availabilitySometimesOptions}
                        label={i18n.t('label-chose-an-option')}
                        onValueChange={formikProps.handleChange('ppeAvailabilitySometimes')}
                        selectedValue={formikProps.values.ppeAvailabilitySometimes}
                      />
                    ) : null}

                    {formikProps.values.hasUsedPPEEquipment === 'never' ? (
                      <RadioInput
                        required
                        items={availabilityNeverOptions}
                        label={i18n.t('label-chose-an-option')}
                        onValueChange={formikProps.handleChange('ppeAvailabilityNever')}
                        selectedValue={formikProps.values.ppeAvailabilityNever}
                      />
                    ) : null}
                  </>
                ) : null}

                <View style={styling.flex} />

                {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                  <ValidationError error={i18n.t('validation-error-text')} />
                ) : null}

                <ErrorText>{this.state.errorMessage}</ErrorText>

                <BrandedButton enabled={formikProps.isValid} onPress={formikProps.handleSubmit}>
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
