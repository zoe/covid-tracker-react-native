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

            const {currentPatient, assessmentId} = this.props.route.params;
            const userService = new UserService();
            var infos = this.createAssessmentInfos(formData);

            userService.updateAssessment(assessmentId, infos)
              .then(response => {
                  this.props.navigation.navigate('WhereAreYou', {currentPatient, assessmentId: assessmentId})
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
        const currentPatient = this.props.route.params.currentPatient;
        const temperatureItems = [
            {label: '°C', value: 'C'},
            {label: '°F', value: 'F'},
        ];
        const fatigueItems = [
            {label: 'No', value: 'no'},
            {label: 'Mild fatigue', value: 'mild'},
            {label: 'Severe fatigue - I struggle to get out of bed', value: 'severe'},
        ];
        const shortnessOfBreathItems = [
            {label: 'No', value: 'no'},
            {label: 'Yes. Mild symptoms - slight shortness of breath during ordinary activity', value: 'mild'},
            {label: 'Yes. Significant symptoms - breathing is comfortable only at rest', value: 'significant'},
            {label: 'Yes. Severe symptoms - breathing is difficult even at rest', value: 'severe'},
        ];

        return (
          <Screen profile={currentPatient.profile}>
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
                        <KeyboardAvoidingView>
                            <Form>

                                <DropdownField
                                  selectedValue={props.values.hasFever}
                                  onValueChange={props.handleChange("hasFever")}
                                  label="Do you have a fever?"
                                  error={props.touched.hasFever && props.errors.hasFever}
                                />

                                <FieldWrapper>
                                    <Item stackedLabel style={styles.textItemStyle}>
                                        <Label>If you are able to measure it, what is your temperature?</Label>
                                        <View style={styles.fieldRow}>
                                            <View style={styles.primaryField}>
                                                <ValidatedTextInput
                                                  placeholder='Enter temperature'
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
                                    label={"Do you have a persistent cough (coughing a lot for more than an hour, or 3 or more coughing episodes in 24 hours)?"}
                                    selectedValue={props.values.hasPersistentCough}
                                    onValueChange={props.handleChange("hasPersistentCough")}
                                />

                                {/* Horizontal rule */}

                                <DropdownField
                                    label={"Are you experiencing unusual fatigue?"}
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
                                    label={"Are you experiencing unusual shortness of breath?"}
                                    selectedValue={props.values.hasUnusualShortnessOfBreath}
                                    onValueChange={props.handleChange("hasUnusualShortnessOfBreath")}
                                    error={props.touched.hasUnusualShortnessOfBreath && props.errors.hasUnusualShortnessOfBreath}
                                    items={shortnessOfBreathItems}
                                />

                                <DropdownField
                                  selectedValue={props.values.hasSoreThroat}
                                  onValueChange={props.handleChange("hasSoreThroat")}
                                  label="Do you have a sore throat?"
                                />

                                <DropdownField
                                  selectedValue={props.values.hasLossOfSmell}
                                  onValueChange={props.handleChange("hasLossOfSmell")}
                                  label="Do you have a loss of smell/taste?"
                                />

                                <DropdownField
                                  selectedValue={props.values.hasHoarseVoice}
                                  onValueChange={props.handleChange("hasHoarseVoice")}
                                  label="Do you have an unusually hoarse voice?"
                                />

                                <DropdownField
                                  selectedValue={props.values.hasChestPain}
                                  onValueChange={props.handleChange("hasChestPain")}
                                  label="Are you feeling an unusual chest pain or tightness in your chest?"
                                />

                                <DropdownField
                                  selectedValue={props.values.hasAbdominalPain}
                                  onValueChange={props.handleChange("hasAbdominalPain")}
                                  label="Do you have an unusual abdominal pain?"
                                />

                                <DropdownField
                                  selectedValue={props.values.hasDiarrhoea}
                                  onValueChange={props.handleChange("hasDiarrhoea")}
                                  label={i18n.t("are-you-experiencing-diarrhoea")}
                                />

                                <DropdownField
                                  selectedValue={props.values.hasUnusualMusclePains}
                                  onValueChange={props.handleChange("hasUnusualMusclePains")}
                                  label="Do you have unusual strong muscle pains?"
                                />

                                <Divider/>

                                <DropdownField
                                  selectedValue={props.values.hasDelirium}
                                  onValueChange={props.handleChange("hasDelirium")}
                                  label="Do you have any of the following symptoms: confusion, disorientation or drowsiness?"
                                />

                                <DropdownField
                                  selectedValue={props.values.isSkippingMeals}
                                  onValueChange={props.handleChange("isSkippingMeals")}
                                  label="Have you been skipping meals?"
                                />

                                <GenericTextField
                                    formikProps={props}
                                    label="Are there other important symptoms you want to share with us?"
                                    name="otherSymptoms"
                                    placeholder={'Other symptoms'}
                                />

                                <ErrorText>{this.state.errorMessage}</ErrorText>
                                {!!Object.keys(props.errors).length && (
                                  <ValidationErrors errors={props.errors as string[]}/>
                                )}

                                <BrandedButton onPress={props.handleSubmit} enable={this.state.enableSubmit}>
                                    <Text>{i18n.t("next-question")}</Text>
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
});
