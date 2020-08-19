import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { IUserService } from '@covid/core/user/UserService';
import { cleanFloatVal } from '@covid/utils/number';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import YesNoField from '@covid/components/YesNoField';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { ScreenParamList } from '@covid/features/ScreenParamList';

const initialFormValues = {
  hasFever: 'no',
  hasChills: 'no',
  temperature: '',
  temperatureUnit: '',
  hasPersistentCough: 'no',
  hasUnusualFatigue: 'no',
  hasHeadache: 'no',
  headacheFrequency: '',
  hasNausea: 'no',
  hasDizziness: 'no',
  hasUnusualShortnessOfBreath: 'no',
  hasSoreThroat: 'no',
  hasLossOfSmell: 'no',
  hasHoarseVoice: 'no',
  hasChestPain: 'no',
  hasAbdominalPain: 'no',
  hasRedWeltsOnFace: 'no',
  hasBlistersOnFeet: 'no',
  hasDiarrhoea: 'no',
  diarrhoeaFrequency: '',
  hasUnusualMusclePains: 'no',
  hasDelirium: 'no',
  hasEyeSoreness: 'no',
  isSkippingMeals: 'no',
  hasUnusualHayfever: 'no',
  otherSymptoms: '',
};

interface DescribeSymptomsData {
  hasFever: string;
  hasChills: string;
  temperature: string; // Temperature: 37.3
  temperatureUnit: string;
  hasPersistentCough: string;
  hasUnusualFatigue: string;
  hasHeadache: string;
  headacheFrequency: string;
  hasNausea: string;
  hasDizziness: string;
  hasUnusualShortnessOfBreath: string;
  hasSoreThroat: string;
  hasLossOfSmell: string;
  hasHoarseVoice: string;
  hasChestPain: string;
  hasAbdominalPain: string;
  hasRedWeltsOnFace: string;
  hasBlistersOnFeet: string;
  hasDiarrhoea: string;
  diarrhoeaFrequency: string;
  hasDelirium: string;
  hasUnusualMusclePains: string;
  isSkippingMeals: string;
  hasEyeSoreness: string;
  hasUnusualHayfever: string;
  otherSymptoms: string;
}

type SymptomProps = {
  navigation: StackNavigationProp<ScreenParamList, 'DescribeSymptoms'>;
  route: RouteProp<ScreenParamList, 'DescribeSymptoms'>;
};

type State = {
  errorMessage: string;
  enableSubmit: boolean;
};

const initialState: State = {
  errorMessage: '',
  enableSubmit: true,
};

export default class DescribeSymptomsScreen extends Component<SymptomProps, State> {
  @lazyInject(Services.User)
  private readonly userService: IUserService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  constructor(props: SymptomProps) {
    super(props);
    this.state = initialState;
    this.handleUpdateSymptoms = this.handleUpdateSymptoms.bind(this);
  }

  registerSchema = Yup.object().shape({
    hasFever: Yup.string().required(),
    hasChills: Yup.string().required(),
    temperature: Yup.string(),
    temperatureUnit: Yup.string().required(),
    hasPersistentCough: Yup.string().required(),
    hasUnusualFatigue: Yup.string().required(),
    hasHeadache: Yup.string().required(),
    headacheFrequency: Yup.string().when('hasHeadache', {
      is: 'yes',
      then: Yup.string().required(i18n.t('describe-symptoms.required-headache-frequency')),
    }),
    hasNausea: Yup.string().required(),
    hasDizziness: Yup.string().required(),
    hasUnusualShortnessOfBreath: Yup.string().required(),
    hasSoreThroat: Yup.string().required(),
    hasLossOfSmell: Yup.string().required(),
    hasHoarseVoice: Yup.string().required(),
    hasChestPain: Yup.string().required(),
    hasAbdominalPain: Yup.string().required(),
    hasDiarrhoea: Yup.string().required(),
    diarrhoeaFrequency: Yup.string().when('hasDiarrhoea', {
      is: 'yes',
      then: Yup.string().required(i18n.t('describe-symptoms.required-diarrhoea-frequency')),
    }),
    hasUnusualMusclePains: Yup.string().required(),
    hasDelirium: Yup.string().required(),
    isSkippingMeals: Yup.string().required(),
    hasRedWeltsOnFace: Yup.string().required(),
    hasBlistersOnFeet: Yup.string().required(),
    hasEyeSoreness: Yup.string().required(),
    hasUnusualHayfever: Yup.string().required(),
    otherSymptoms: Yup.string(),
  });

  async handleUpdateSymptoms(formData: DescribeSymptomsData) {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false }); // Stop resubmissions

      try {
        const { assessmentId } = AssessmentCoordinator.assessmentData;
        var infos = this.createAssessmentInfos(formData);
        await assessmentService.saveAssessment(assessmentId!, infos);
        AssessmentCoordinator.gotoNextScreen(this.props.route.name);
      } catch (error) {
        this.setState({ errorMessage: i18n.t('something-went-wrong') });
      }

      this.setState({ enableSubmit: true });
    }
  }

  createAssessmentInfos(formData: DescribeSymptomsData) {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;

    let infos = ({
      fever: formData.hasFever === 'yes',
      chills_or_shivers: formData.hasChills === 'yes',
      persistent_cough: formData.hasPersistentCough === 'yes',
      fatigue: formData.hasUnusualFatigue,
      headache: formData.hasHeadache === 'yes',
      nausea: formData.hasNausea === 'yes',
      dizzy_light_headed: formData.hasDizziness === 'yes',
      shortness_of_breath: formData.hasUnusualShortnessOfBreath,
      sore_throat: formData.hasSoreThroat === 'yes',
      diarrhoea: formData.hasDiarrhoea === 'yes',
      unusual_muscle_pains: formData.hasUnusualMusclePains === 'yes',
      delirium: formData.hasDelirium === 'yes',
      skipped_meals: formData.isSkippingMeals === 'yes',
      loss_of_smell: formData.hasLossOfSmell === 'yes',
      hoarse_voice: formData.hasHoarseVoice === 'yes',
      chest_pain: formData.hasChestPain === 'yes',
      abdominal_pain: formData.hasAbdominalPain === 'yes',
      red_welts_on_face_or_lips: formData.hasRedWeltsOnFace === 'yes',
      blisters_on_feet: formData.hasBlistersOnFeet === 'yes',
      eye_soreness: formData.hasEyeSoreness === 'yes',
    } as unknown) as Partial<AssessmentInfosRequest>;

    if (formData.otherSymptoms) {
      infos = {
        ...infos,
        other_symptoms: formData.otherSymptoms,
      };
    }

    if (formData.temperature) {
      // Temperature is optional.
      infos = {
        ...infos,
        temperature: cleanFloatVal(formData.temperature),
        temperature_unit: formData.temperatureUnit,
      };
    }

    if (infos.headache && formData.headacheFrequency) {
      infos = {
        ...infos,
        headache_frequency: formData.headacheFrequency,
      };
    }

    if (infos.diarrhoea && formData.diarrhoeaFrequency) {
      infos = {
        ...infos,
        diarrhoea_frequency: formData.diarrhoeaFrequency,
      };
    }

    if (currentPatient.hasHayfever && formData.hasUnusualHayfever) {
      infos = {
        ...infos,
        typical_hayfever: formData.hasUnusualHayfever === 'no',
      };
    }

    return infos;
  }

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;
    const temperatureItems = [
      { label: i18n.t('describe-symptoms.picker-celsius'), value: 'C' },
      { label: i18n.t('describe-symptoms.picker-fahrenheit'), value: 'F' },
    ];
    const fatigueItems = [
      { label: i18n.t('describe-symptoms.picker-fatigue-none'), value: 'no' },
      { label: i18n.t('describe-symptoms.picker-fatigue-mild'), value: 'mild' },
      { label: i18n.t('describe-symptoms.picker-fatigue-severe'), value: 'severe' },
    ];
    const shortnessOfBreathItems = [
      { label: i18n.t('describe-symptoms.picker-shortness-of-breath-none'), value: 'no' },
      { label: i18n.t('describe-symptoms.picker-shortness-of-breath-mild'), value: 'mild' },
      { label: i18n.t('describe-symptoms.picker-shortness-of-breath-significant'), value: 'significant' },
      { label: i18n.t('describe-symptoms.picker-shortness-of-breath-severe'), value: 'severe' },
    ];
    const headacheFrequencyItems = [
      { label: i18n.t('describe-symptoms.picker-headache-frequency-allday'), value: 'all_of_the_day' },
      { label: i18n.t('describe-symptoms.picker-headache-frequency-mostday'), value: 'most_of_day' },
      { label: i18n.t('describe-symptoms.picker-headache-frequency-someday'), value: 'some_of_day' },
    ];
    const diarrhoeaFrequencyItems = [
      { label: '1-2', value: 'one_to_two' },
      { label: '3-4', value: 'three_to_four' },
      { label: '5+', value: 'five_or_more' },
    ];

    const getInitialFormValues = (): DescribeSymptomsData => {
      const features = this.localisationService.getConfig();
      return {
        ...initialFormValues,
        temperatureUnit: features.defaultTemperatureUnit,
      };
    };

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('describe-symptoms.page-title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={3} maxSteps={5} />
        </ProgressBlock>

        <Formik
          initialValues={getInitialFormValues()}
          validationSchema={this.registerSchema}
          onSubmit={(values: DescribeSymptomsData) => {
            return this.handleUpdateSymptoms(values);
          }}>
          {(props) => {
            return (
              <Form>
                <YesNoField
                  selectedValue={props.values.hasFever}
                  onValueChange={props.handleChange('hasFever')}
                  label={i18n.t('describe-symptoms.question-has-fever')}
                  error={props.touched.hasFever && props.errors.hasFever}
                />

                <YesNoField
                  selectedValue={props.values.hasChills}
                  onValueChange={props.handleChange('hasChills')}
                  label={i18n.t('describe-symptoms.question-has-chills')}
                />

                <FieldWrapper style={styles.fieldWrapper}>
                  <RegularText>{i18n.t('describe-symptoms.question-your-temperature')}</RegularText>
                  <View style={styles.fieldRow}>
                    <View style={styles.primaryField}>
                      <ValidatedTextInput
                        placeholder={i18n.t('describe-symptoms.placeholder-temperature')}
                        value={props.values.temperature}
                        onChangeText={props.handleChange('temperature')}
                        onBlur={props.handleBlur('temperature')}
                        error={props.touched.temperature && props.errors.temperature}
                        returnKeyType="next"
                        onSubmitEditing={() => {}}
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={styles.secondaryField}>
                      <DropdownField
                        selectedValue={props.values.temperatureUnit}
                        onValueChange={props.handleChange('temperatureUnit')}
                        error={props.touched.temperatureUnit && props.errors.temperatureUnit}
                        items={temperatureItems}
                        onlyPicker
                      />
                    </View>
                  </View>
                </FieldWrapper>

                <YesNoField
                  label={i18n.t('describe-symptoms.question-has-persistent-cough')}
                  selectedValue={props.values.hasPersistentCough}
                  onValueChange={props.handleChange('hasPersistentCough')}
                />

                {/* Horizontal rule */}

                <DropdownField
                  label={i18n.t('describe-symptoms.question-has-unusual-fatigue')}
                  selectedValue={props.values.hasUnusualFatigue}
                  onValueChange={props.handleChange('hasUnusualFatigue')}
                  items={fatigueItems}
                />

                <YesNoField
                  selectedValue={props.values.hasHeadache}
                  onValueChange={props.handleChange('hasHeadache')}
                  label={i18n.t('describe-symptoms.question-has-headache')}
                />

                {props.values.hasHeadache === 'yes' && (
                  <DropdownField
                    selectedValue={props.values.headacheFrequency}
                    onValueChange={props.handleChange('headacheFrequency')}
                    label={i18n.t('describe-symptoms.question-headache-frequency')}
                    items={headacheFrequencyItems}
                    error={props.touched.headacheFrequency && props.errors.headacheFrequency}
                  />
                )}

                <YesNoField
                  selectedValue={props.values.hasNausea}
                  onValueChange={props.handleChange('hasNausea')}
                  label={i18n.t('describe-symptoms.question-has-nausea')}
                />

                <YesNoField
                  selectedValue={props.values.hasDizziness}
                  onValueChange={props.handleChange('hasDizziness')}
                  label={i18n.t('describe-symptoms.question-has-dizziness')}
                />

                <DropdownField
                  label={i18n.t('describe-symptoms.question-has-unusual-shortness-of-breath')}
                  selectedValue={props.values.hasUnusualShortnessOfBreath}
                  onValueChange={props.handleChange('hasUnusualShortnessOfBreath')}
                  error={props.touched.hasUnusualShortnessOfBreath && props.errors.hasUnusualShortnessOfBreath}
                  items={shortnessOfBreathItems}
                />

                <YesNoField
                  selectedValue={props.values.hasSoreThroat}
                  onValueChange={props.handleChange('hasSoreThroat')}
                  label={i18n.t('describe-symptoms.question-has-sore-throat')}
                />

                <YesNoField
                  selectedValue={props.values.hasLossOfSmell}
                  onValueChange={props.handleChange('hasLossOfSmell')}
                  label={i18n.t('describe-symptoms.question-has-loss-of-smell')}
                />

                <YesNoField
                  selectedValue={props.values.hasHoarseVoice}
                  onValueChange={props.handleChange('hasHoarseVoice')}
                  label={i18n.t('describe-symptoms.question-has-hoarse-voice')}
                />

                <YesNoField
                  selectedValue={props.values.hasChestPain}
                  onValueChange={props.handleChange('hasChestPain')}
                  label={i18n.t('describe-symptoms.question-has-chest-pain')}
                />

                <YesNoField
                  selectedValue={props.values.hasAbdominalPain}
                  onValueChange={props.handleChange('hasAbdominalPain')}
                  label={i18n.t('describe-symptoms.question-has-abdominal-pain')}
                />

                <YesNoField
                  selectedValue={props.values.hasDiarrhoea}
                  onValueChange={props.handleChange('hasDiarrhoea')}
                  label={i18n.t('describe-symptoms.question-has-diarrhoea')}
                />

                {props.values.hasDiarrhoea === 'yes' && (
                  <DropdownField
                    selectedValue={props.values.diarrhoeaFrequency}
                    onValueChange={props.handleChange('diarrhoeaFrequency')}
                    label={i18n.t('describe-symptoms.question-diarrhoea-frequency')}
                    items={diarrhoeaFrequencyItems}
                    error={props.touched.diarrhoeaFrequency && props.errors.diarrhoeaFrequency}
                  />
                )}

                <YesNoField
                  selectedValue={props.values.hasUnusualMusclePains}
                  onValueChange={props.handleChange('hasUnusualMusclePains')}
                  label={i18n.t('describe-symptoms.question-has-unusual-muscle-pains')}
                />

                <YesNoField
                  label={i18n.t('describe-symptoms.question-red-welts-on-face')}
                  selectedValue={props.values.hasRedWeltsOnFace}
                  onValueChange={props.handleChange('hasRedWeltsOnFace')}
                />

                <YesNoField
                  label={i18n.t('describe-symptoms.question-blisters-on-feet')}
                  selectedValue={props.values.hasBlistersOnFeet}
                  onValueChange={props.handleChange('hasBlistersOnFeet')}
                />

                <YesNoField
                  selectedValue={props.values.hasDelirium}
                  onValueChange={props.handleChange('hasDelirium')}
                  label={i18n.t('describe-symptoms.question-has-delirium')}
                />

                <YesNoField
                  selectedValue={props.values.hasEyeSoreness}
                  onValueChange={props.handleChange('hasEyeSoreness')}
                  label={i18n.t('describe-symptoms.question-has-eye-soreness')}
                />

                <YesNoField
                  selectedValue={props.values.isSkippingMeals}
                  onValueChange={props.handleChange('isSkippingMeals')}
                  label={i18n.t('describe-symptoms.question-is-skipping-meals')}
                />

                {currentPatient.hasHayfever && (
                  <YesNoField
                    selectedValue={props.values.hasUnusualHayfever}
                    onValueChange={props.handleChange('hasUnusualHayfever')}
                    label={i18n.t('describe-symptoms.question-typical-hayfever')}
                  />
                )}

                <GenericTextField
                  formikProps={props}
                  label={i18n.t('describe-symptoms.question-other-symptoms')}
                  name="otherSymptoms"
                  placeholder={i18n.t('describe-symptoms.placeholder-other-symptoms')}
                />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}

                <BrandedButton onPress={props.handleSubmit} enable={this.state.enableSubmit}>
                  <Text>{i18n.t('next-question')}</Text>
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  fieldRow: {
    flexDirection: 'row',
  },

  fieldWrapper: {
    flex: 1,
    marginHorizontal: 16,
  },

  textItemStyle: {
    borderColor: 'transparent',
  },

  primaryField: {
    flex: 3,
  },

  secondaryField: {
    flex: 1,
    margin: -8,
  },
});
