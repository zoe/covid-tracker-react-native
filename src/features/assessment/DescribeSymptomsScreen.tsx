import React, {Component} from "react";
import {KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
import Screen, {FieldWrapper, Header, ProgressBlock, screenWidth} from "../../components/Screen";
import {BrandedButton, Divider, ErrorText, HeaderText} from "../../components/Text";
import {Form, Icon, Item, Label, Picker, Text} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import {Formik} from "formik";
import * as Yup from "yup";
import {ValidatedTextInput} from "../../components/ValidatedTextInput";

import {colors, fontStyles} from "../../../theme"
import i18n from "../../locale/i18n"
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import UserService, {isUSLocale} from "../../core/user/UserService";
import {AssessmentInfosRequest} from "../../core/user/dto/UserAPIContracts";
import DropdownField from "../../components/DropdownField";
import {ValidationErrors} from "../../components/ValidationError";
import { GenericTextField } from "../../components/GenericTextField";


const PICKER_WIDTH = (Platform.OS === 'ios') ? undefined : '100%';

const initialFormValues = {
    hasFever: 'no',
    temperature: '',
    temperatureUnit: '',
    hasPersistentCough: 'no',
    hasUnusualFatigue: 'no',
    hasHeadache: 'no',
    hasUnusualShortnessOfBreath: 'no',
    hasSoreThroat: 'no',
    hasLossOfSmell: 'no',
    hasHoarseVoice: 'no',
    hasChestPain: 'no',
    hasAbdominalPain: 'no',

    hasDiarrhoea: 'no',
    hasUnusualMusclePains: 'no',
    hasDelirium: "no",
    isSkippingMeals: "no",
    otherSymptoms: '',
};

interface DescribeSymptomsData {
    hasFever: string;
    temperature: string;        // Temperature: 37.3
    temperatureUnit: string;
    hasPersistentCough: string;
    hasUnusualFatigue: string;
    hasHeadache: string;
    hasUnusualShortnessOfBreath: string;
    hasSoreThroat: string;
    hasLossOfSmell: string;
    hasHoarseVoice: string;
    hasChestPain: string;
    hasAbdominalPain: string;

    hasDiarrhoea: string;
    hasDelirium: string;
    hasUnusualMusclePains: string;
    isSkippingMeals: string;
    otherSymptoms: string;
}

type SymptomProps = {
    navigation: StackNavigationProp<ScreenParamList, 'DescribeSymptoms'>
    route: RouteProp<ScreenParamList, 'DescribeSymptoms'>;
}

type State = {
    errorMessage: string;
    enableSubmit: boolean;
}

const initialState: State = {
    errorMessage: "",
    enableSubmit: true
};

export default class DescribeSymptomsScreen extends Component<SymptomProps, State> {
    constructor(props: SymptomProps) {
        super(props);
        this.state = initialState;
        this.handleUpdateSymptoms = this.handleUpdateSymptoms.bind(this);

        initialFormValues.temperatureUnit = isUSLocale() ? 'F' : 'C';
    }


    registerSchema = Yup.object().shape({
        hasFever: Yup.string().required(),
        temperature: Yup.string(),
        temperatureUnit: Yup.string().required(),
        hasPersistentCough: Yup.string().required(),
        hasUnusualFatigue: Yup.string().required(),
        hasHeadache: Yup.string().required(),
        hasUnusualShortnessOfBreath: Yup.string().required(),
        hasSoreThroat: Yup.string().required(),
        hasLossOfSmell: Yup.string().required(),
        hasHoarseVoice: Yup.string().required(),
        hasChestPain: Yup.string().required(),
        hasAbdominalPain: Yup.string().required(),
        hasDiarrhoea: Yup.string().required(),
        hasUnusualMusclePains: Yup.string().required(),
        hasDelirium: Yup.string().required(),
        isSkippingMeals: Yup.string().required(),
        otherSymptoms: Yup.string(),
    });

    handleUpdateSymptoms(formData: DescribeSymptomsData) {
        if (this.state.enableSubmit) {
            this.setState({enableSubmit: false}); // Stop resubmissions

            const assessmentId = this.props.route.params.assessmentId;
            const userService = new UserService();
            var infos = this.createAssessmentInfos(formData);

            userService.updateAssessment(assessmentId, infos)
              .then(response => {
                  this.props.navigation.navigate('WhereAreYou', {assessmentId: assessmentId})
              })
              .catch(err => {
                  this.setState({errorMessage: i18n.t("something-went-wrong")});
              })
              .then(() => {
                  this.setState({enableSubmit: true});
              });
        }
    }

    createAssessmentInfos(formData: DescribeSymptomsData) {
        let infos = {
            fever: formData.hasFever === 'yes',
            persistent_cough: formData.hasPersistentCough === 'yes',
            fatigue: formData.hasUnusualFatigue,
            headache: formData.hasHeadache === 'yes',
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
        } as unknown as Partial<AssessmentInfosRequest>;

        if (formData.otherSymptoms) {
            infos = {
                ...infos,
                other_symptoms: formData.otherSymptoms
            }
        }

        if (formData.temperature) {
            // Temperature is optional.
            infos = {
                ...infos,
                temperature: parseFloat(formData.temperature),
                temperature_unit: formData.temperatureUnit,
            };
        }

        return infos;
    }

    render() {
        const temperatureItems = [
            {label: i18n.t('describe-symptoms-picker-celsius'), value: 'C'},
            {label: i18n.t('describe-symptoms-picker-fahrenheit'), value: 'F'},
        ];
        const fatigueItems = [
            {label: i18n.t('describe-symptoms-picker-fatigue-none'), value: 'no'},
            {label: i18n.t('describe-symptoms-picker-fatigue-mild'), value: 'mild'},
            {label: i18n.t('describe-symptoms-picker-fatigue-severe'), value: 'severe'},
        ];
        const shortnessOfBreathItems = [
            {label: i18n.t('describe-symptoms-picker-shortness-of-breath-none'), value: 'no'},
            {label: i18n.t('describe-symptoms-picker-shortness-of-breath-mild'), value: 'mild'},
            {label: i18n.t('describe-symptoms-picker-shortness-of-breath-significant'), value: 'significant'},
            {label: i18n.t('describe-symptoms-picker-shortness-of-breath-severe'), value: 'severe'},
        ];

        return (
          <Screen>
              <Header>
                  <HeaderText>Describe the symptoms you are experiencing right now.</HeaderText>
              </Header>

              <ProgressBlock>
                  <ProgressStatus step={3} maxSteps={5}/>
              </ProgressBlock>

              <Formik
                initialValues={initialFormValues}
                validationSchema={this.registerSchema}
                onSubmit={(values: DescribeSymptomsData) => {
                    return this.handleUpdateSymptoms(values)
                }}
              >
                  {props => {
                      return (
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
                            <Form>

                                <DropdownField
                                  selectedValue={props.values.hasFever}
                                  onValueChange={props.handleChange("hasFever")}
                                  label={i18n.t('describe-symptoms-question-has-fever')}
                                  error={props.touched.hasFever && props.errors.hasFever}
                                />

                                <FieldWrapper>
                                    <Item stackedLabel style={styles.textItemStyle}>
                                        <Label>If you are able to measure it, what is your temperature?</Label>
                                        <View style={styles.fieldRow}>
                                            <View style={styles.primaryField}>
                                                <ValidatedTextInput
                                                  placeholder={i18n.t('describe-symptoms-placeholder-temperature')}
                                                  value={props.values.temperature}
                                                  onChangeText={props.handleChange("temperature")}
                                                  onBlur={props.handleBlur("temperature")}
                                                  error={props.touched.temperature && props.errors.temperature}
                                                  returnKeyType="next"
                                                  onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                  }}
                                                  keyboardType='numeric'
                                                />
                                            </View>

                                            <View style={styles.secondaryField}>
                                                <DropdownField
                                                  selectedValue={props.values.temperatureUnit}
                                                  onValueChange={props.handleChange("temperatureUnit")}
                                                  error={props.touched.temperatureUnit && props.errors.temperatureUnit}
                                                  items={temperatureItems}
                                                  onlyPicker
                                                />
                                            </View>
                                        </View>
                                    </Item>
                                </FieldWrapper>

                                <DropdownField
                                    label={i18n.t('describe-symptoms-question-has-persistent-cough')}
                                    selectedValue={props.values.hasPersistentCough}
                                    onValueChange={props.handleChange("hasPersistentCough")}
                                />

                                {/* Horizontal rule */}

                                <DropdownField
                                    label={i18n.t('describe-symptoms-question-has-unusual-fatigue')}
                                    selectedValue={props.values.hasUnusualFatigue}
                                    onValueChange={props.handleChange("hasUnusualFatigue")}
                                    items={fatigueItems}
                                />


                                <DropdownField
                                  selectedValue={props.values.hasHeadache}
                                  onValueChange={props.handleChange("hasHeadache")}
                                  label="Do you have a headache?"
                                />

                                <DropdownField
                                    label={i18n.t('describe-symptoms-question-has-unusual-shortness-of-breath')}
                                    selectedValue={props.values.hasUnusualShortnessOfBreath}
                                    onValueChange={props.handleChange("hasUnusualShortnessOfBreath")}
                                    error={props.touched.hasUnusualShortnessOfBreath && props.errors.hasUnusualShortnessOfBreath}
                                    items={shortnessOfBreathItems}
                                />

                                <DropdownField
                                  selectedValue={props.values.hasSoreThroat}
                                  onValueChange={props.handleChange("hasSoreThroat")}
                                  label={i18n.t('describe-symptoms-question-has-sore-throat')}
                                />

                                <DropdownField
                                  selectedValue={props.values.hasLossOfSmell}
                                  onValueChange={props.handleChange("hasLossOfSmell")}
                                  label={i18n.t('describe-symptoms-question-has-loss-of-smell')}
                                />

                                <DropdownField
                                  selectedValue={props.values.hasHoarseVoice}
                                  onValueChange={props.handleChange("hasHoarseVoice")}
                                  label={i18n.t('describe-symptoms-question-has-hoarse-voice')}
                                />

                                <DropdownField
                                  selectedValue={props.values.hasChestPain}
                                  onValueChange={props.handleChange("hasChestPain")}
                                  label={i18n.t('describe-symptoms-question-has-chest-pain')}
                                />

                                <DropdownField
                                  selectedValue={props.values.hasAbdominalPain}
                                  onValueChange={props.handleChange("hasAbdominalPain")}
                                  label={i18n.t('describe-symptoms-question-has-abdominal-pain')}
                                />

                                <DropdownField
                                  selectedValue={props.values.hasDiarrhoea}
                                  onValueChange={props.handleChange("hasDiarrhoea")}
                                  label={i18n.t('describe-symptoms-question-has-diarrhoea')}
                                />

                                <DropdownField
                                  selectedValue={props.values.hasUnusualMusclePains}
                                  onValueChange={props.handleChange("hasUnusualMusclePains")}
                                  label={i18n.t('describe-symptoms-question-has-unusual-muscle-pains')}
                                />

                                <Divider/>

                                <DropdownField
                                  selectedValue={props.values.hasDelirium}
                                  onValueChange={props.handleChange("hasDelirium")}
                                  label={i18n.t('describe-symptoms-question-has-delirium')}
                                />

                                <DropdownField
                                  selectedValue={props.values.isSkippingMeals}
                                  onValueChange={props.handleChange("isSkippingMeals")}
                                  label={i18n.t('describe-symptoms-question-is-skipping-meals')}
                                />

                                <GenericTextField
                                    formikProps={props}
                                    label={i18n.t('describe-symptoms-question-other-symptoms')}
                                    name="otherSymptoms"
                                    placeholder={i18n.t('describe-symptoms-placeholder-other-symptoms')}
                                />

                                <ErrorText>{this.state.errorMessage}</ErrorText>
                                {!!Object.keys(props.errors).length && (
                                  <ValidationErrors errors={props.errors as string[]}/>
                                )}

                                <BrandedButton onPress={props.handleSubmit} enable={this.state.enableSubmit}>
                                    <Text style={[fontStyles.bodyLight, styles.buttonText]}>{i18n.t("next-question")}</Text>
                                </BrandedButton>

                            </Form>
                        </KeyboardAvoidingView>
                      )
                  }}
              </Formik>

          </Screen>
        )
    }
}


const styles = StyleSheet.create({
    fieldRow: {
        flexDirection: "row",
    },

    textItemStyle: {
        borderColor: 'transparent'
    },

    primaryField: {
        flex: 3,
    },

    secondaryField: {
        flex: 1,
    },

    buttonText: {
        color: colors.white,
    },
});
