import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Form, Item, Label } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import YesNoField from '@covid/components/YesNoField';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { IPatientService } from '@covid/core/patient/PatientService';
import { stripAndRound } from '@covid/utils/number';

import { ScreenParamList } from '../ScreenParamList';

interface YourHealthData {
  unwellMonthBefore: string;
  stillHavePastSymptoms: string;
  pastSymptomsDaysAgo: string;
  pastSymptomsChanged: string;
  classicSymptoms: string;
}

const initialFormValues = {
  unwellMonthBefore: 'no',
  stillHavePastSymptoms: 'no',
  pastSymptomsDaysAgo: '',
  pastSymptomsChanged: 'no',
  classicSymptoms: 'no',
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
  pastSymptomAnosmia: false,
  pastSymptomShortnessOfBreath: false,
  pastSymptomFatigue: false,
  pastSymptomFever: false,
  pastSymptomSkippedMeals: false,
  pastSymptomPersistentCough: false,
  pastSymptomDiarrhoea: false,
  pastSymptomChestPain: false,
  pastSymptomHoarseVoice: false,
  pastSymptomAbdominalPain: false,
  pastSymptomDelirium: false,
  errorMessage: '',
};

export default class PreviousExposureScreen extends Component<HealthProps, State> {
  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  constructor(props: HealthProps) {
    super(props);
    this.state = initialState;
  }

  registerSchema = Yup.object().shape({
    unwellMonthBefore: Yup.string().required(),
    stillHavePastSymptoms: Yup.string().required().when('unwellMonthBefore', {
      is: 'yes',
      then: Yup.string().required(),
    }),
    pastSymptomsDaysAgo: Yup.number().when('unwellMonthBefore', {
      is: 'yes',
      then: Yup.number().required(),
    }),
    pastSymptomsChanged: Yup.string().when('stillHavePastSymptoms', {
      is: 'yes',
      then: Yup.string().required(),
    }),
  });

  handleUpdateHealth(formData: YourHealthData) {
    const currentPatient = patientCoordinator.patientData.patientState;
    const patientId = currentPatient.patientId;
    const infos = this.createPatientInfos(formData);

    this.patientService
      .updatePatientInfo(patientId, infos)
      .then((_) => {
        patientCoordinator.gotoNextScreen(this.props.route.name);
      })
      .catch((_) => {
        this.setState({ errorMessage: i18n.t('something-went-wrong') });
      });
  }

  private createPatientInfos(formData: YourHealthData) {
    let infos = {
      unwell_month_before: formData.unwellMonthBefore === 'yes',
    } as Partial<PatientInfosRequest>;

    if (infos.unwell_month_before) {
      infos = {
        ...infos,
        still_have_past_symptoms: formData.stillHavePastSymptoms === 'yes',
        past_symptom_anosmia: this.state.pastSymptomAnosmia,
        past_symptom_shortness_of_breath: this.state.pastSymptomShortnessOfBreath,
        past_symptom_fatigue: this.state.pastSymptomFatigue,
        past_symptom_fever: this.state.pastSymptomFever,
        past_symptom_skipped_meals: this.state.pastSymptomSkippedMeals,
        past_symptom_persistent_cough: this.state.pastSymptomPersistentCough,
        past_symptom_diarrhoea: this.state.pastSymptomDiarrhoea,
        past_symptom_chest_pain: this.state.pastSymptomChestPain,
        past_symptom_hoarse_voice: this.state.pastSymptomHoarseVoice,
        past_symptom_abdominal_pain: this.state.pastSymptomAbdominalPain,
        past_symptom_delirium: this.state.pastSymptomDelirium,
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
    const currentPatient = patientCoordinator.patientData.patientState;
    const symptomChangeChoices = [
      { label: i18n.t('past-symptom-changed-much-better'), value: 'much_better' },
      { label: i18n.t('past-symptom-changed-little-better'), value: 'little_better' },
      { label: i18n.t('past-symptom-changed-same'), value: 'same' },
      { label: i18n.t('past-symptom-changed-little-worse'), value: 'little_worse' },
      { label: i18n.t('past-symptom-changed-much-worse'), value: 'much_worse' },
    ];
    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('previous-exposure-title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={4} maxSteps={6} />
        </ProgressBlock>

        <Formik
          initialValues={initialFormValues}
          validationSchema={this.registerSchema}
          onSubmit={(values: YourHealthData) => {
            return this.handleUpdateHealth(values);
          }}>
          {(props) => {
            return (
              <Form>
                <View style={{ marginHorizontal: 16 }}>
                  <YesNoField
                    selectedValue={props.values.unwellMonthBefore}
                    onValueChange={props.handleChange('unwellMonthBefore')}
                    label={i18n.t('label-unwell-month-before')}
                  />

                  {props.values.unwellMonthBefore === 'yes' && (
                    <>
                      <FieldWrapper>
                        <Item stackedLabel style={styles.textItemStyle}>
                          <Label>{i18n.t('label-past-symptoms')}</Label>
                          <CheckboxList>
                            <CheckboxItem
                              value={this.state.pastSymptomAnosmia}
                              onChange={(value: boolean) => this.setState({ pastSymptomAnosmia: value })}>
                              {i18n.t('label-past-symptom-anosmia')}
                            </CheckboxItem>
                            <CheckboxItem
                              value={this.state.pastSymptomShortnessOfBreath}
                              onChange={(value: boolean) => this.setState({ pastSymptomShortnessOfBreath: value })}>
                              {i18n.t('label-past-symptom-breath')}
                            </CheckboxItem>
                            <CheckboxItem
                              value={this.state.pastSymptomFatigue}
                              onChange={(value: boolean) => this.setState({ pastSymptomFatigue: value })}>
                              {i18n.t('label-past-symptom-fatigue')}
                            </CheckboxItem>
                            <CheckboxItem
                              value={this.state.pastSymptomFever}
                              onChange={(value: boolean) => this.setState({ pastSymptomFever: value })}>
                              {i18n.t('label-past-symptom-fever')}
                            </CheckboxItem>
                            <CheckboxItem
                              value={this.state.pastSymptomSkippedMeals}
                              onChange={(value: boolean) => this.setState({ pastSymptomSkippedMeals: value })}>
                              {i18n.t('label-past-symptom-skipped-meals')}
                            </CheckboxItem>
                            <CheckboxItem
                              value={this.state.pastSymptomPersistentCough}
                              onChange={(value: boolean) => this.setState({ pastSymptomPersistentCough: value })}>
                              {i18n.t('label-past-symptom-cough')}
                            </CheckboxItem>
                            <CheckboxItem
                              value={this.state.pastSymptomDiarrhoea}
                              onChange={(value: boolean) => this.setState({ pastSymptomDiarrhoea: value })}>
                              {i18n.t('label-past-symptom-diarrhoea')}
                            </CheckboxItem>
                            <CheckboxItem
                              value={this.state.pastSymptomChestPain}
                              onChange={(value: boolean) => this.setState({ pastSymptomChestPain: value })}>
                              {i18n.t('label-past-symptom-chest-pain')}
                            </CheckboxItem>
                            <CheckboxItem
                              value={this.state.pastSymptomHoarseVoice}
                              onChange={(value: boolean) => this.setState({ pastSymptomHoarseVoice: value })}>
                              {i18n.t('label-past-symptom-hoarse-voice')}
                            </CheckboxItem>
                            <CheckboxItem
                              value={this.state.pastSymptomAbdominalPain}
                              onChange={(value: boolean) => this.setState({ pastSymptomAbdominalPain: value })}>
                              {i18n.t('label-past-symptom-abdominal-pain')}
                            </CheckboxItem>
                            <CheckboxItem
                              value={this.state.pastSymptomDelirium}
                              onChange={(value: boolean) => this.setState({ pastSymptomDelirium: value })}>
                              {i18n.t('label-past-symptom-confusion')}
                            </CheckboxItem>
                          </CheckboxList>
                        </Item>
                      </FieldWrapper>

                      <GenericTextField
                        formikProps={props}
                        label={i18n.t('label-past-symptoms-days-ago')}
                        name="pastSymptomsDaysAgo"
                        keyboardType="numeric"
                      />

                      <YesNoField
                        selectedValue={props.values.stillHavePastSymptoms}
                        onValueChange={props.handleChange('stillHavePastSymptoms')}
                        label={i18n.t('label-past-symptoms-still-have')}
                      />
                    </>
                  )}

                  {props.values.stillHavePastSymptoms === 'yes' && (
                    <>
                      <DropdownField
                        selectedValue={props.values.pastSymptomsChanged}
                        onValueChange={props.handleChange('pastSymptomsChanged')}
                        label={i18n.t('label-past-symptoms-changed')}
                        items={symptomChangeChoices}
                      />
                    </>
                  )}

                  <ErrorText>{this.state.errorMessage}</ErrorText>
                  {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                    <ValidationError error={i18n.t('validation-error-text')} />
                  )}
                </View>

                <BrandedButton onPress={props.handleSubmit}>{i18n.t('next-question')}</BrandedButton>
              </Form>
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
