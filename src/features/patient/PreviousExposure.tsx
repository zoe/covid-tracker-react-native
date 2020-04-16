import React, {Component} from "react";
import {KeyboardAvoidingView, Platform} from "react-native";
import Screen, {Header, ProgressBlock} from "../../components/Screen";
import {BrandedButton, Divider, ErrorText, HeaderText} from "../../components/Text";
import {Form} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import {Formik} from "formik";
import * as Yup from "yup";
import i18n from "../../locale/i18n"
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import UserService, {isUSLocale} from "../../core/user/UserService";
import {PatientInfosRequest} from "../../core/user/dto/UserAPIContracts";
import DropdownField from "../../components/DropdownField";
import {GenericTextField} from "../../components/GenericTextField";
import {ValidationErrors} from "../../components/ValidationError";


interface YourHealthData {
    unusualSymptomsMonthBefore: string,
    stillExperiencingUnusualSymptoms: string,
    unusualSymptomsDaysAgo: string,
    unusualSymptomsChanged: string,
    alreadyHadCovid: string,
    classicSymptoms: string,
}

const initialFormValues = {
    unusualSymptomsMonthBefore: 'no',
    stillExperiencingUnusualSymptoms: 'no',
    unusualSymptomsDaysAgo: '',
    unusualSymptomsChanged: 'no',
    alreadyHadCovid: 'no',
    classicSymptoms: 'no',
};

type HealthProps = {
    navigation: StackNavigationProp<ScreenParamList, 'PreviousExposure'>
    route: RouteProp<ScreenParamList, 'PreviousExposure'>;
}

type State = {
    errorMessage: string;
}

const initialState: State = {
    errorMessage: ""
};

const stripAndRound = (str: string): number => {
    return Math.round(parseFloat(str.replace(/,/g, '')))
};

export default class PreviousExposureScreen extends Component<HealthProps, State> {
    constructor(props: HealthProps) {
        super(props);
        this.state = initialState;
    }

    registerSchema = Yup.object().shape({
        unusualSymptomsMonthBefore: Yup.string().required(),
        stillExperiencingUnusualSymptoms: Yup.string().required().when("unusualSymptomsMonthBefore", {
            is: "yes",
            then: Yup.string().required(),
        }),
        unusualSymptomsDaysAgo: Yup.number().when("stillExperiencingUnusualSymptoms", {
            is: "yes",
            then: Yup.number().required(),
        }),
        unusualSymptomsChanged: Yup.string().when("stillExperiencingUnusualSymptoms", {
            is: "yes",
            then: Yup.string().required(),
        }),
        alreadyHadCovid: Yup.string().when("unusualSymptomsMonthBefore", {
            is: "yes",
            then: Yup.string().required(),
        }),
        classicSymptoms: Yup.string().when("alreadyHadCovid", {
            is: "yes",
            then: Yup.string().required(),
        }),
    });

    handleUpdateHealth(formData: YourHealthData) {
        const currentPatient = this.props.route.params.currentPatient;
        const patientId = currentPatient.patientId;

        const userService = new UserService();
        let infos = this.createPatientInfos(formData);

        userService.updatePatient(patientId, infos)
            .then(response => {
                this.props.navigation.navigate('StartAssessment', {currentPatient});
            })
            .catch(err => {
                this.setState({errorMessage: "Something went wrong, please try again later"})
            });
    }

    private createPatientInfos(formData: YourHealthData) {
        let infos = {
            unusual_symptoms_month_before: formData.unusualSymptomsMonthBefore === 'yes',
        } as Partial<PatientInfosRequest>;

        if (infos.unusual_symptoms_month_before) {
            infos = {
                ...infos,
                still_experiencing_unusual_symptoms: formData.stillExperiencingUnusualSymptoms === "yes",
                already_had_covid: formData.alreadyHadCovid === "yes"
            }

            if (infos.still_experiencing_unusual_symptoms) {
                infos = {
                    ...infos,
                    ...(formData.unusualSymptomsDaysAgo && {unusual_symptoms_days_ago: stripAndRound(formData.unusualSymptomsDaysAgo)}),
                    unusual_symptoms_changed: formData.unusualSymptomsChanged === "yes" // TODO?
                }
            }
        }

        if (infos.already_had_covid) {
            infos = {
                ...infos,
                classic_symptoms: formData.classicSymptoms === "yes"
            }
        }

        return infos;
    }

    render() {
        const currentPatient = this.props.route.params.currentPatient;
        const symptomChangeChoices = [
            {label: 'Much better', value: 'much_better'},
            {label: 'A little better', value: 'little_better'},
            {label: 'The same', value: 'same'},
            {label: 'A little worse', value: 'little_worse'},
            {label: 'Much worse', value: 'much_worse'},
        ]
        return (
            <Screen profile={currentPatient.profile}>
                <Header>
                    <HeaderText>Previous Exposure to COVID</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={4} maxSteps={6}/>
                </ProgressBlock>

                <Formik
                    initialValues={initialFormValues}
                    validationSchema={this.registerSchema}
                    onSubmit={(values: YourHealthData) => {
                        return this.handleUpdateHealth(values)
                    }}
                >
                    {props => {
                        return (
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
                                <Form>

                                    <DropdownField
                                        selectedValue={props.values.unusualSymptomsMonthBefore}
                                        onValueChange={props.handleChange("unusualSymptomsMonthBefore")}
                                        label={"Do you have unusual symptoms in the month before you started reporting on this app?"}
                                    />

                                    {props.values.unusualSymptomsMonthBefore === 'yes' && (
                                        <DropdownField
                                            selectedValue={props.values.stillExperiencingUnusualSymptoms}
                                            onValueChange={props.handleChange("stillExperiencingUnusualSymptoms")}
                                            label={"Are you still experiencing symptoms?"}
                                        />
                                    )}

                                    {props.values.stillExperiencingUnusualSymptoms === 'yes' && (
                                        <>
                                            <GenericTextField
                                                formikProps={props}
                                                label="How many days ago did your symptoms start?"
                                                name="unusualSymptomsDaysAgo"
                                                keyboardType="numeric"
                                            />
                                            <DropdownField
                                                selectedValue={props.values.unusualSymptomsChanged}
                                                onValueChange={props.handleChange("unusualSymptomsChanged")}
                                                label={"How have your symptoms changed over the last few days?"}
                                                items={symptomChangeChoices}
                                            />
                                        </>
                                    )}

                                    {props.values.unusualSymptomsMonthBefore === 'yes' && (
                                        <DropdownField
                                            selectedValue={props.values.alreadyHadCovid}
                                            onValueChange={props.handleChange("alreadyHadCovid")}
                                            label={"Do you think you have already had COVID -19, but were not tested)?"}
                                        />
                                    )}

                                    {props.values.alreadyHadCovid === 'yes' && (
                                        <DropdownField
                                            selectedValue={props.values.classicSymptoms}
                                            onValueChange={props.handleChange("classicSymptoms")}
                                            label={"Did you have the classic symptoms (high fever and persistent cough) for several days?"}
                                        />
                                    )}

                                    <ErrorText>{this.state.errorMessage}</ErrorText>
                                    {!!Object.keys(props.errors).length && (
                                        <ValidationErrors errors={props.errors as string[]}/>
                                    )}

                                    <BrandedButton onPress={props.handleSubmit}>{i18n.t("next-question")}</BrandedButton>

                                </Form>
                            </KeyboardAvoidingView>
                        )
                    }}
                </Formik>

            </Screen>
        )
    }

}