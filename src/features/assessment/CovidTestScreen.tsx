import React, {Component} from "react";
import {View, Platform, StyleSheet} from "react-native";
import Screen, {Header, Overview, ProgressBlock, FieldWrapper} from "../../components/Screen";
import {screenWidth, isAndroid} from "../../components/Screen";
import { BrandedButton, ErrorText, HeaderText, RegularText } from "../../components/Text";
import {Text, Form, Item, Icon, Label, Input, Picker, Button} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import {Formik} from "formik";
import * as Yup from "yup";
import {ValidatedTextInput} from "../../components/ValidatedTextInput";

import {colors, fontStyles} from "../../../theme"
import i18n from "../../locale/i18n"
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import UserService from "../../core/user/UserService";
import {AssessmentInfosRequest} from "../../core/user/dto/UserAPIContracts";
import DropdownField from "../../components/DropdownField";
import { ValidationErrors } from "../../components/ValidationError";
import { AsyncStorageService } from "../../core/AsyncStorageService";


const PICKER_WIDTH = (Platform.OS === 'ios') ? undefined : '100%';

const initialFormValues = {
    hasCovidTest: 'no',
    hasCovidPositive: 'no',

    takesAnyBloodPressureMedications: ''
}

interface CovidTestData {
    hasCovidTest: string;
    hasCovidPositive: string;

    takesAnyBloodPressureMedications: string;
}

type CovidProps = {
    navigation: StackNavigationProp<ScreenParamList, 'CovidTest'>
    route: RouteProp<ScreenParamList, 'CovidTest'>;
}


type State = {
    errorMessage: string;
    needBloodPressureAnswer: boolean;
}

const initialState: State = {
    errorMessage: "",
    needBloodPressureAnswer: false,
};


export default class CovidTestScreen extends Component<CovidProps, State> {
    constructor(props: CovidProps) {
        super(props);
        this.state = initialState;
    }

    registerSchema = Yup.object().shape({
        hasCovidTest: Yup.string().required(),
        hasCovidPositive: Yup.string().required(),
        takesAnyBloodPressureMedications: Yup.string()
    });

    async componentDidMount() {
        if (!await AsyncStorageService.hasBloodPressureAnswer()) {
            this.setState({needBloodPressureAnswer: true});
        }
    }

    handleUpdateHealth(formData: CovidTestData) {
        const {patientId, assessmentId} = this.props.route.params;

        const userService = new UserService();
        var assessment = {
            patient: patientId,
            had_covid_test: formData.hasCovidTest === 'yes',
        } as Partial<AssessmentInfosRequest>;

        if (formData.hasCovidTest === 'yes') {
            assessment = {
                ...assessment,
                tested_covid_positive: formData.hasCovidPositive,
            }
        }

        // Update patient data with blood pressure answer, if answered.
        if (patientId && formData.takesAnyBloodPressureMedications) {
            // Deliberately fire and forget.
            userService.updatePatient(patientId, {
                takes_any_blood_pressure_medications: formData.takesAnyBloodPressureMedications === 'yes'
            })
            .then(response => AsyncStorageService.setHasBloodPressureAnswer(true))
            .catch(err => {
                this.setState({errorMessage: i18n.t("something-went-wrong")});
            });
        }

        if (assessmentId == null) {
            userService.addAssessment(assessment)
                .then(response => {
                    this.props.navigation.navigate('HowYouFeel', {assessmentId: response.data.id})
                })
                .catch(err => {
                    this.setState({errorMessage: i18n.t("something-went-wrong")});
                });
        } else {
            userService.updateAssessment(assessmentId, assessment)
                .then(response => {
                    this.props.navigation.navigate('HowYouFeel', {assessmentId: assessmentId})
                })
                .catch(err => {
                    this.setState({errorMessage: i18n.t("something-went-wrong")});
                });
        }
    }

    render() {
        const hasCovidPositiveItems = [
            {label: 'No', value: 'no'},
            {label: 'Yes', value: 'yes'},
            {label: 'Waiting for results', value: 'waiting'}
        ]
        return (
            <Screen>
                <Header>
                    <HeaderText>COVID-19 status</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={2} maxSteps={5}/>
                </ProgressBlock>

                <Formik
                    initialValues={initialFormValues}
                    validationSchema={this.registerSchema}
                    onSubmit={(values: CovidTestData) => {
                        return this.handleUpdateHealth(values)
                    }}
                >
                    {props => {
                        return (
                            <Form>

                                <DropdownField
                                    placeholder="hasCovidTest"
                                    selectedValue={props.values.hasCovidTest}
                                    onValueChange={props.handleChange("hasCovidTest")}
                                    label="Have you had a test for COVID-19?"
                                />

                                {props.values.hasCovidTest === "yes" && (
                                    <DropdownField
                                        placeholder="hasCovidPositive"
                                        selectedValue={props.values.hasCovidPositive}
                                        onValueChange={props.handleChange("hasCovidPositive")}
                                        label="Did you test positive for COVID-19?"
                                        items={hasCovidPositiveItems}
                                    />
                                )}


                                {this.state.needBloodPressureAnswer && (
                                    <DropdownField
                                        selectedValue={props.values.takesAnyBloodPressureMedications}
                                        onValueChange={props.handleChange("takesAnyBloodPressureMedications")}
                                        label={"Are you regularly taking any blood pressure medications?"}
                                        error={props.touched.takesAnyBloodPressureMedications && props.errors.takesAnyBloodPressureMedications}
                                    />
                                )}


                                <ErrorText>{this.state.errorMessage}</ErrorText>
                                {!!Object.keys(props.errors).length && (
                                    <ValidationErrors errors={props.errors as string[]} />
                                )}


                                <BrandedButton onPress={props.handleSubmit}>
                                    <Text style={[fontStyles.bodyLight, styles.buttonText]}>{i18n.t("next-question")}</Text>
                                </BrandedButton>


                            </Form>
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

})
