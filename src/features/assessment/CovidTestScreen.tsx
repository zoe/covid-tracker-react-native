import React, {Component} from "react";
import {Platform, StyleSheet} from "react-native";
import Screen, {Header, ProgressBlock, screenWidth} from "../../components/Screen";
import {BrandedButton, ErrorText, HeaderText} from "../../components/Text";
import {Form, Text} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import {Formik} from "formik";
import * as Yup from "yup";

import {colors, fontStyles} from "../../../theme"
import i18n from "../../locale/i18n"
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import UserService from "../../core/user/UserService";
import {AssessmentInfosRequest} from "../../core/user/dto/UserAPIContracts";
import DropdownField from "../../components/DropdownField";
import { ValidationErrors } from "../../components/ValidationError";


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
        const currentPatient = this.props.route.params.currentPatient
        this.setState({needBloodPressureAnswer: !currentPatient.hasBloodPressureAnswer});
    }

    handleUpdateHealth(formData: CovidTestData) {
        const {currentPatient, assessmentId} = this.props.route.params;
        const patientId = currentPatient.patientId

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
            .then(response => currentPatient.hasBloodPressureAnswer = true)
            .catch(err => {
                this.setState({errorMessage: i18n.t("something-went-wrong")});
            });
        }

        if (assessmentId == null) {
            userService.addAssessment(assessment)
                .then(response => {
                    this.props.route.params.assessmentId = response.data.id
                    this.props.navigation.navigate('HowYouFeel', {currentPatient, assessmentId: response.data.id})
                })
                .catch(err => {
                    this.setState({errorMessage: i18n.t("something-went-wrong")});
                });
        } else {
            userService.updateAssessment(assessmentId, assessment)
                .then(response => {
                    this.props.navigation.navigate('HowYouFeel', {currentPatient, assessmentId: assessmentId})
                })
                .catch(err => {
                    this.setState({errorMessage: i18n.t("something-went-wrong")});
                });
        }
    }

    render() {
        const currentPatient = this.props.route.params.currentPatient;
        const hasCovidPositiveItems = [
            {label: i18n.t('picker-no'), value: 'no'},
            {label: i18n.t('picker-yes'), value: 'yes'},
            {label: i18n.t('covid-test-picker-waiting'), value: 'waiting'}
        ];
        return (
            <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
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
                                    label={i18n.t('covid-test-question-has-covid-test')}
                                />

                                {props.values.hasCovidTest === "yes" && (
                                    <DropdownField
                                        placeholder="hasCovidPositive"
                                        selectedValue={props.values.hasCovidPositive}
                                        onValueChange={props.handleChange("hasCovidPositive")}
                                        label={i18n.t('covid-test-question-has-covid-positive')}
                                        items={hasCovidPositiveItems}
                                    />
                                )}


                                {this.state.needBloodPressureAnswer && (
                                    <DropdownField
                                        selectedValue={props.values.takesAnyBloodPressureMedications}
                                        onValueChange={props.handleChange("takesAnyBloodPressureMedications")}
                                        label={i18n.t('covid-test-question-takes-any-blood-pressure-medications')}
                                        error={props.touched.takesAnyBloodPressureMedications && props.errors.takesAnyBloodPressureMedications}
                                        androidDefaultLabel={i18n.t("label-chose-an-option")}
                                    />
                                )}


                                <ErrorText>{this.state.errorMessage}</ErrorText>
                                {!!Object.keys(props.errors).length && (
                                    <ValidationErrors errors={props.errors as string[]} />
                                )}


                                <BrandedButton onPress={props.handleSubmit}>
                                    <Text>{i18n.t("next-question")}</Text>
                                </BrandedButton>


                            </Form>
                        )
                    }}
                </Formik>

            </Screen>
        )
    }
}
