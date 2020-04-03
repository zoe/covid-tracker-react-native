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
                                                <Picker mode="dropdown"
                                                        placeholder="temperatureUnit"
                                                        selectedValue={props.values.temperatureUnit}
                                                        onValueChange={props.handleChange("temperatureUnit")}
                                                        iosIcon={<Icon name="arrow-down"/>}
                                                        style={styles.smallPicker}
                                                >
                                                    <Picker.Item label="°C" value="C"/>
                                                    <Picker.Item label="°F" value="F"/>
                                                </Picker>
                                            </View>
                                        </View>
                                    </Item>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Item stackedLabel>
                                        <Label>Do you have a persistent cough (coughing a lot for more than an hour, or 3 or more coughing episodes in 24 hours)?</Label>
                                        <Picker mode="dropdown"
                                                placeholder="hasPersistentCough"
                                                selectedValue={props.values.hasPersistentCough}
                                                onValueChange={props.handleChange("hasPersistentCough")}
                                                iosIcon={<Icon name="arrow-down"/>}
                                                style={styles.picker}
                                        >
                                            <Picker.Item label="Yes" value="yes"/>
                                            <Picker.Item label="No" value="no"/>
                                        </Picker>
                                    </Item>
                                </FieldWrapper>

                                {/* Horizontal rule */}

                                <FieldWrapper>
                                    <Item stackedLabel>
                                        <Label>Are you experiencing unusual fatigue?</Label>
                                        <Picker mode="dropdown"
                                                placeholder="hasUnusualFatigue"
                                                selectedValue={props.values.hasUnusualFatigue}
                                                onValueChange={props.handleChange("hasUnusualFatigue")}
                                                iosIcon={<Icon name="arrow-down"/>}
                                                style={styles.picker}
                                        >
                                            <Picker.Item label="No" value="no"/>
                                            <Picker.Item label="Mild fatigue" value="mild"/>
                                            <Picker.Item label="Severe fatigue - I struggle to get out of bed" value="severe"/>
                                        </Picker>
                                    </Item>
                                </FieldWrapper>

                                <DropdownField
                                  placeholder="hasHeadache"
                                  selectedValue={props.values.hasHeadache}
                                  onValueChange={props.handleChange("hasHeadache")}
                                  label="Do you have a headache?"
                                />

                                <FieldWrapper>
                                    <Item stackedLabel>
                                        <Label>Are you experiencing unusual shortness of breath?</Label>
                                        <Picker mode="dropdown"
                                                placeholder="hasUnusualShortnessOfBreath"
                                                selectedValue={props.values.hasUnusualShortnessOfBreath}
                                                onValueChange={props.handleChange("hasUnusualShortnessOfBreath")}
                                                iosIcon={<Icon name="arrow-down"/>}
                                                style={styles.picker}
                                        >
                                            <Picker.Item label="No" value="no"/>
                                            <Picker.Item label="Yes. Mild symptoms - slight shortness of breath during ordinary activity" value="mild"/>
                                            <Picker.Item label="Yes. Significant symptoms - breathing is comfortable only at rest" value="significant"/>
                                            <Picker.Item label="Yes. Severe symptoms - breathing is difficult even at rest" value="severe"/>
                                        </Picker>
                                    </Item>
                                </FieldWrapper>

                                <DropdownField
                                  placeholder="hasSoreThroat"
                                  selectedValue={props.values.hasSoreThroat}
                                  onValueChange={props.handleChange("hasSoreThroat")}
                                  label="Do you have a sore throat?"
                                />

                                <FieldWrapper>
                                    <Item stackedLabel>
                                        <Label>Do you have a loss of smell/taste?</Label>
                                        <Picker mode="dropdown"
                                                placeholder="hasLossOfSmell"
                                                selectedValue={props.values.hasLossOfSmell}
                                                onValueChange={props.handleChange("hasLossOfSmell")}
                                                iosIcon={<Icon name="arrow-down"/>}
                                                style={styles.picker}
                                        >
                                            <Picker.Item label="Yes" value="yes"/>
                                            <Picker.Item label="No" value="no"/>
                                        </Picker>
                                    </Item>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Item stackedLabel>
                                        <Label>Do you have an unusually hoarse voice?</Label>
                                        <Picker mode="dropdown"
                                                placeholder="hasHoarseVoice"
                                                selectedValue={props.values.hasHoarseVoice}
                                                onValueChange={props.handleChange("hasHoarseVoice")}
                                                iosIcon={<Icon name="arrow-down"/>}
                                                style={styles.picker}
                                        >
                                            <Picker.Item label="Yes" value="yes"/>
                                            <Picker.Item label="No" value="no"/>
                                        </Picker>
                                    </Item>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Item stackedLabel>
                                        <Label>Are you feeling an unusual chest pain or tightness in your chest?</Label>
                                        <Picker mode="dropdown"
                                                placeholder="hasChestPain"
                                                selectedValue={props.values.hasChestPain}
                                                onValueChange={props.handleChange("hasChestPain")}
                                                iosIcon={<Icon name="arrow-down"/>}
                                                style={styles.picker}
                                        >
                                            <Picker.Item label="Yes" value="yes"/>
                                            <Picker.Item label="No" value="no"/>
                                        </Picker>
                                    </Item>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Item stackedLabel>
                                        <Label>Do you have an unusual abdominal pain?</Label>
                                        <Picker mode="dropdown"
                                                placeholder="hasAbdominalPain"
                                                selectedValue={props.values.hasAbdominalPain}
                                                onValueChange={props.handleChange("hasAbdominalPain")}
                                                iosIcon={<Icon name="arrow-down"/>}
                                                style={styles.picker}
                                        >
                                            <Picker.Item label="Yes" value="yes"/>
                                            <Picker.Item label="No" value="no"/>
                                        </Picker>
                                    </Item>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Item stackedLabel>
                                        <Label>{i18n.t("are-you-experiencing-diarrhoea")}</Label>
                                        <Picker mode="dropdown"
                                                placeholder={i18n.t("placeholder-diarrhoea")}
                                                selectedValue={props.values.hasDiarrhoea}
                                                onValueChange={props.handleChange("hasDiarrhoea")}
                                                iosIcon={<Icon name="arrow-down"/>}
                                                style={styles.picker}
                                        >
                                            <Picker.Item label="Yes" value="yes"/>
                                            <Picker.Item label="No" value="no"/>
                                        </Picker>
                                    </Item>
                                </FieldWrapper>

                                <DropdownField
                                  selectedValue={props.values.hasUnusualMusclePains}
                                  onValueChange={props.handleChange("hasUnusualMusclePains")}
                                  label="Do you have unusual strong muscle pains?"
                                />

                                <Divider/>

                                <FieldWrapper>
                                    <Item stackedLabel>
                                        <Label>Do you have any of the following symptoms: confusion, disorientation or drowsiness?</Label>
                                        <Picker mode="dropdown"
                                                placeholder="hasDelirium"
                                                selectedValue={props.values.hasDelirium}
                                                onValueChange={props.handleChange("hasDelirium")}
                                                iosIcon={<Icon name="arrow-down"/>}
                                                style={styles.picker}
                                        >
                                            <Picker.Item label="Yes" value="yes"/>
                                            <Picker.Item label="No" value="no"/>
                                        </Picker>
                                    </Item>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Item stackedLabel>
                                        <Label>Have you been skipping meals?</Label>
                                        <Picker mode="dropdown"
                                                placeholder="isSkippingMeals"
                                                selectedValue={props.values.isSkippingMeals}
                                                onValueChange={props.handleChange("isSkippingMeals")}
                                                iosIcon={<Icon name="arrow-down"/>}
                                                style={styles.picker}
                                        >
                                            <Picker.Item label="Yes" value="yes"/>
                                            <Picker.Item label="No" value="no"/>
                                        </Picker>
                                    </Item>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Item stackedLabel style={styles.textItemStyle}>
                                        <Label>Are there other important symptoms you want to share with us?</Label>
                                        <ValidatedTextInput
                                          placeholder="Other symptoms"
                                          value={props.values.otherSymptoms}
                                          onChangeText={props.handleChange("otherSymptoms")}
                                          onBlur={props.handleBlur("otherSymptoms")}
                                          error={props.touched.otherSymptoms && props.errors.otherSymptoms}
                                          returnKeyType="next"
                                        />
                                    </Item>
                                </FieldWrapper>

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

    picker: {
        width: screenWidth - 16,
        marginTop: 16,
    },

    smallPicker: {
        // width: 40,
    },

    button: {
        borderRadius: 8,
        height: 56,
        backgroundColor: colors.brand,
    },
    buttonText: {
        color: colors.white,
    },

});
