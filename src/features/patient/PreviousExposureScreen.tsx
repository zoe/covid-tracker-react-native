import { BrandedButton } from '@covid/components';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { FormWrapper } from '@covid/components/Forms';
import { GenericTextField } from '@covid/components/GenericTextField';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import YesNoField from '@covid/components/YesNoField';
import { patientCoordinator } from '@covid/core/patient/PatientCoordinator';
import { patientService } from '@covid/core/patient/PatientService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { stripAndRound } from '@covid/utils/number';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Item, Label } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

interface IYourHealthData {
  unwellMonthBefore: string;
  stillHavePastSymptoms: string;
  pastSymptomsDaysAgo: string;
  pastSymptomsChanged: string;
  classicSymptoms: string;
}

const initialFormValues = {
  classicSymptoms: 'no',
  pastSymptomsChanged: 'much_better',
  pastSymptomsDaysAgo: '',
  stillHavePastSymptoms: 'no',
  unwellMonthBefore: 'no',
};

type HealthProps = {
  navigation: StackNavigationProp<ScreenParamList, 'PreviousExposure'>;
  route: RouteProp<ScreenParamList, 'PreviousExposure'>;
};

type State = {
  pastSymptomAnosmia: boolean;
  pastSymptomShortnessOfBreath: boolean;
  pastSymptomFatigue: boolean;
  pastSymptomFever: boolean;
  pastSymptomSkippedMeals: boolean;
  pastSymptomPersistentCough: boolean;
  pastSymptomDiarrhoea: boolean;
  pastSymptomChestPain: boolean;
  pastSymptomHoarseVoice: boolean;
  pastSymptomAbdominalPain: boolean;
  pastSymptomDelirium: boolean;
  errorMessage: string;
};

const initialState: State = {
  errorMessage: '',
  pastSymptomAbdominalPain: false,
  pastSymptomAnosmia: false,
  pastSymptomChestPain: false,
  pastSymptomDelirium: false,
  pastSymptomDiarrhoea: false,
  pastSymptomFatigue: false,
  pastSymptomFever: false,
  pastSymptomHoarseVoice: false,
  pastSymptomPersistentCough: false,
  pastSymptomShortnessOfBreath: false,
  pastSymptomSkippedMeals: false,
};

export default class PreviousExposureScreen extends React.Component<HealthProps, State> {
  constructor(props: HealthProps) {
    super(props);
    this.state = initialState;
  }

  registerSchema = Yup.object().shape({
    pastSymptomsChanged: Yup.string().when('stillHavePastSymptoms', {
      is: 'yes',
      then: Yup.string().required(),
    }),
    pastSymptomsDaysAgo: Yup.number().when('unwellMonthBefore', {
      is: 'yes',
      then: Yup.number().required(),
    }),
    stillHavePastSymptoms: Yup.string().required().when('unwellMonthBefore', {
      is: 'yes',
      then: Yup.string().required(),
    }),
    unwellMonthBefore: Yup.string().required(),
  });

  handleUpdateHealth(formData: IYourHealthData) {
    const infos = this.createPatientInfos(formData);

    patientService
      .updatePatientInfo(patientCoordinator.patientData?.patientState?.patientId, infos)
      .then(async (info) => {
        const currentState = patientCoordinator.patientData.patientState;
        patientCoordinator.patientData.patientInfo = info;
        patientCoordinator.patientData.patientState = await patientService.updatePatientState(currentState, info);
        patientCoordinator.gotoNextScreen(this.props.route.name);
      })
      .catch((_) => {
        this.setState({ errorMessage: i18n.t('something-went-wrong') });
      });
  }

  private createPatientInfos(formData: IYourHealthData) {
    let infos = {
      unwell_month_before: formData.unwellMonthBefore === 'yes',
    } as Partial<PatientInfosRequest>;

    if (infos.unwell_month_before) {
      infos = {
        ...infos,
        past_symptom_abdominal_pain: this.state.pastSymptomAbdominalPain,
        past_symptom_anosmia: this.state.pastSymptomAnosmia,
        past_symptom_chest_pain: this.state.pastSymptomChestPain,
        past_symptom_delirium: this.state.pastSymptomDelirium,
        past_symptom_diarrhoea: this.state.pastSymptomDiarrhoea,
        past_symptom_fatigue: this.state.pastSymptomFatigue,
        past_symptom_fever: this.state.pastSymptomFever,
        past_symptom_hoarse_voice: this.state.pastSymptomHoarseVoice,
        past_symptom_persistent_cough: this.state.pastSymptomPersistentCough,
        past_symptom_shortness_of_breath: this.state.pastSymptomShortnessOfBreath,
        past_symptom_skipped_meals: this.state.pastSymptomSkippedMeals,
        still_have_past_symptoms: formData.stillHavePastSymptoms === 'yes',
        ...(formData.pastSymptomsDaysAgo && { past_symptoms_days_ago: stripAndRound(formData.pastSymptomsDaysAgo) }),
      };

      if (infos.still_have_past_symptoms) {
        infos = {
          ...infos,
          past_symptoms_changed: formData.pastSymptomsChanged,
        };
      }
    }

    return infos;
  }

  render() {
    const symptomChangeChoices = [
      { label: i18n.t('past-symptom-changed-much-better'), value: 'much_better' },
      { label: i18n.t('past-symptom-changed-little-better'), value: 'little_better' },
      { label: i18n.t('past-symptom-changed-same'), value: 'same' },
      { label: i18n.t('past-symptom-changed-little-worse'), value: 'little_worse' },
      { label: i18n.t('past-symptom-changed-much-worse'), value: 'much_worse' },
    ];
    return (
      <Screen
        navigation={this.props.navigation}
        profile={patientCoordinator.patientData?.patientState?.profile}
        testID="previous-exposure-screen"
      >
        <Header>
          <HeaderText>{i18n.t('previous-exposure-title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={6} step={4} />
        </ProgressBlock>

        <Formik
          validateOnChange
          initialValues={initialFormValues}
          onSubmit={(values: IYourHealthData) => {
            return this.handleUpdateHealth(values);
          }}
          validationSchema={this.registerSchema}
        >
          {(props) => {
            return (
              <FormWrapper hasRequiredFields>
                <View style={{ marginHorizontal: 16 }}>
                  <YesNoField
                    required
                    label={i18n.t('label-unwell-month-before')}
                    onValueChange={props.handleChange('unwellMonthBefore')}
                    selectedValue={props.values.unwellMonthBefore}
                  />

                  {props.values.unwellMonthBefore === 'yes' ? (
                    <>
                      <FieldWrapper>
                        <Item stackedLabel style={styles.textItemStyle}>
                          <Label>{i18n.t('label-past-symptoms')}</Label>
                          <CheckboxList>
                            <CheckboxItem
                              onChange={(value: boolean) => this.setState({ pastSymptomAnosmia: value })}
                              value={this.state.pastSymptomAnosmia}
                            >
                              {i18n.t('label-past-symptom-anosmia')}
                            </CheckboxItem>
                            <CheckboxItem
                              onChange={(value: boolean) => this.setState({ pastSymptomShortnessOfBreath: value })}
                              value={this.state.pastSymptomShortnessOfBreath}
                            >
                              {i18n.t('label-past-symptom-breath')}
                            </CheckboxItem>
                            <CheckboxItem
                              onChange={(value: boolean) => this.setState({ pastSymptomFatigue: value })}
                              value={this.state.pastSymptomFatigue}
                            >
                              {i18n.t('label-past-symptom-fatigue')}
                            </CheckboxItem>
                            <CheckboxItem
                              onChange={(value: boolean) => this.setState({ pastSymptomFever: value })}
                              value={this.state.pastSymptomFever}
                            >
                              {i18n.t('label-past-symptom-fever')}
                            </CheckboxItem>
                            <CheckboxItem
                              onChange={(value: boolean) => this.setState({ pastSymptomSkippedMeals: value })}
                              value={this.state.pastSymptomSkippedMeals}
                            >
                              {i18n.t('label-past-symptom-skipped-meals')}
                            </CheckboxItem>
                            <CheckboxItem
                              onChange={(value: boolean) => this.setState({ pastSymptomPersistentCough: value })}
                              value={this.state.pastSymptomPersistentCough}
                            >
                              {i18n.t('label-past-symptom-cough')}
                            </CheckboxItem>
                            <CheckboxItem
                              onChange={(value: boolean) => this.setState({ pastSymptomDiarrhoea: value })}
                              value={this.state.pastSymptomDiarrhoea}
                            >
                              {i18n.t('label-past-symptom-diarrhoea')}
                            </CheckboxItem>
                            <CheckboxItem
                              onChange={(value: boolean) => this.setState({ pastSymptomChestPain: value })}
                              value={this.state.pastSymptomChestPain}
                            >
                              {i18n.t('label-past-symptom-chest-pain')}
                            </CheckboxItem>
                            <CheckboxItem
                              onChange={(value: boolean) => this.setState({ pastSymptomHoarseVoice: value })}
                              value={this.state.pastSymptomHoarseVoice}
                            >
                              {i18n.t('label-past-symptom-hoarse-voice')}
                            </CheckboxItem>
                            <CheckboxItem
                              onChange={(value: boolean) => this.setState({ pastSymptomAbdominalPain: value })}
                              value={this.state.pastSymptomAbdominalPain}
                            >
                              {i18n.t('label-past-symptom-abdominal-pain')}
                            </CheckboxItem>
                            <CheckboxItem
                              onChange={(value: boolean) => this.setState({ pastSymptomDelirium: value })}
                              value={this.state.pastSymptomDelirium}
                            >
                              {i18n.t('label-past-symptom-confusion')}
                            </CheckboxItem>
                          </CheckboxList>
                        </Item>
                      </FieldWrapper>

                      <GenericTextField
                        required
                        formikProps={props}
                        keyboardType="numeric"
                        label={i18n.t('label-past-symptoms-days-ago')}
                        name="pastSymptomsDaysAgo"
                      />

                      <YesNoField
                        required
                        label={i18n.t('label-past-symptoms-still-have')}
                        onValueChange={props.handleChange('stillHavePastSymptoms')}
                        selectedValue={props.values.stillHavePastSymptoms}
                      />
                    </>
                  ) : null}

                  {props.values.stillHavePastSymptoms === 'yes' ? (
                    <RadioInput
                      required
                      items={symptomChangeChoices}
                      label={i18n.t('label-past-symptoms-changed')}
                      onValueChange={props.handleChange('pastSymptomsChanged')}
                      selectedValue={props.values.pastSymptomsChanged}
                    />
                  ) : null}

                  <ErrorText>{this.state.errorMessage}</ErrorText>
                  {!!Object.keys(props.errors).length && props.submitCount > 0 ? (
                    <ValidationError error={i18n.t('validation-error-text')} />
                  ) : null}
                </View>

                <BrandedButton enabled={props.isValid} onPress={props.handleSubmit} testID="button-submit">
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

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
