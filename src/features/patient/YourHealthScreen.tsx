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


const PICKER_WIDTH = (Platform.OS === 'ios') ? undefined : '100%';


interface YourHealthData {
    isPregnant: string;
    hasHeartDisease: string;
    hasDiabetes: string;
    hasLungDisease: string;
    smokerStatus: string;
    smokedYearsAgo: string;
    hasKidneyDisease: string,

    hasCancer: string,
    cancerType: string,

    doesChemiotherapy: string,
    takesImmunosuppressants: string,
    takesAspirin: string,
    takesCorticosteroids: string,
    takesBloodPressureMedications: string, // pril
    takesAnyBloodPressureMedications: string,
    takesBloodPressureMedicationsSartan: string,
    alreadyHadCovid: string,
    classicSymptoms: string,
    classicSymptomsDaysAgo: string,

    limitedActivity: string,
}


const initialFormValues = {
    isPregnant: 'no',
    hasHeartDisease: 'no',
    hasDiabetes: 'no',
    hasLungDisease: 'no',
    smokerStatus: 'never',
    smokedYearsAgo: '',
    hasKidneyDisease: 'no',

    hasCancer: 'no',
    cancerType: '',

    doesChemiotherapy: 'no',
    takesImmunosuppressants: 'no',
    takesCorticosteroids: 'no',
    takesAspirin: 'no',
    takesBloodPressureMedications: 'no', // pril
    takesAnyBloodPressureMedications: 'no',
    takesBloodPressureMedicationsSartan: 'no',
    alreadyHadCovid: 'no',
    classicSymptoms: 'no',
    classicSymptomsDaysAgo: '',

    limitedActivity: 'no',
};


type HealthProps = {
    navigation: StackNavigationProp<ScreenParamList, 'YourHealth'>
    route: RouteProp<ScreenParamList, 'YourHealth'>;
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

export default class YourHealthScreen extends Component<HealthProps, State> {
    constructor(props: HealthProps) {
        super(props);
        this.state = initialState;
    }


    registerSchema = Yup.object().shape({
        isPregnant: Yup.string().required(),
        hasHeartDisease: Yup.string().required(),
        hasDiabetes: Yup.string().required(),
        hasLungDisease: Yup.string().required(),
        smokerStatus: Yup.string().required(),
        smokedYearsAgo: Yup.number().when("smokerStatus", {
            is: "not_currently",
            then: Yup.number().required(),
        }),
        hasKidneyDisease: Yup.string().required(),

        hasCancer: Yup.string().required(),
        cancerType: Yup.string().when("hasCancer", {
            is: (value) => isUSLocale() && value && value === 'yes',
            then: Yup.string().required()
        }),

        doesChemiotherapy: Yup.string(),
        takesImmunosuppressants: Yup.string().required(),
        takesAspirin: Yup.string().required(),
        takesCorticosteroids: Yup.string().required(),
        takesBloodPressureMedications: Yup.string().required(), // pril
        takesAnyBloodPressureMedications: Yup.string().required(),
        takesBloodPressureMedicationsSartan: Yup.string().required(),
        alreadyHadCovid: Yup.string().required(),
        classicSymptoms: Yup.string().required(),
        classicSymptomsDaysAgo: Yup.number().when("classicSymptoms", {
            is: "yes",
            then: Yup.number().required(),
        }),
    });

    handleUpdateHealth(formData: YourHealthData) {
        const currentPatient = this.props.route.params.currentPatient;
        const patientId = currentPatient.patientId;

        const userService = new UserService();
        var infos = this.createPatientInfos(formData);

        userService.updatePatient(patientId, infos)
            .then(response => {
                currentPatient.hasCompletePatientDetails = true;
                currentPatient.hasBloodPressureAnswer = true;

                this.props.navigation.navigate('StartAssessment', {currentPatient});
            })
            .catch(err => {
                this.setState({errorMessage: "Something went wrong, please try again later"})
            });
    }


    private createPatientInfos(formData: YourHealthData) {
        const currentPatient = this.props.route.params.currentPatient;
        const smokerStatus = formData.smokerStatus === "no" ? "never" : formData.smokerStatus;
        let infos = {
            has_heart_disease: formData.hasHeartDisease === "yes",
            has_diabetes: formData.hasDiabetes === "yes",
            has_lung_disease: formData.hasLungDisease === "yes",
            has_kidney_disease: formData.hasKidneyDisease === "yes",
            has_cancer: formData.hasCancer === "yes",
            takes_immunosuppressants: formData.takesImmunosuppressants === "yes",
            takes_aspirin: formData.takesAspirin === "yes",
            takes_corticosteroids: formData.takesCorticosteroids === "yes",
            takes_any_blood_pressure_medications: formData.takesAnyBloodPressureMedications === "yes",
            already_had_covid: formData.alreadyHadCovid === 'yes',
            limited_activity: formData.limitedActivity === "yes",
        } as Partial<PatientInfosRequest>;

        if (currentPatient.isFemale) {
            infos = {
                ...infos,
                is_pregnant: formData.isPregnant === "yes",
            }
        }

        if (infos.takes_any_blood_pressure_medications) {
            infos = {
                ...infos,
                takes_blood_pressure_medications: formData.takesBloodPressureMedications === "yes", // pril
                takes_blood_pressure_medications_sartan: formData.takesBloodPressureMedicationsSartan === "yes",
            }
        }


        if (smokerStatus) {
            infos = {
                ...infos,
                smoker_status: smokerStatus,
            }

            if (smokerStatus === 'not_currently') {
                infos = {
                    ...infos,
                    smoked_years_ago: stripAndRound(formData.smokedYearsAgo),
                }
            }
        }


        if (infos.has_cancer) {
            infos = {
                ...infos,
                does_chemiotherapy: formData.doesChemiotherapy === "yes",
            }

            if (isUSLocale()) {
                infos = {
                    ...infos,
                    cancer_type: formData.cancerType,
                }
            }
        }

        if (infos.already_had_covid) {
            infos = {
                ...infos,
                classic_symptoms: formData.classicSymptoms === "yes",
                ...(formData.classicSymptomsDaysAgo && {classic_symptoms_days_ago: stripAndRound(formData.classicSymptomsDaysAgo)}),
            }
        }

        return infos;
    }

    render() {
        const currentPatient = this.props.route.params.currentPatient;
        const smokerStatusItems = [
            {label: 'Never', value: 'never'},
            {label: 'Not currently', value: 'not_currently'},
            {label: 'Yes', value: 'yes'},
        ]
        return (
            <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
                <Header>
                    <HeaderText>About your health</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={2} maxSteps={5}/>
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
                                        selectedValue={props.values.limitedActivity}
                                        onValueChange={props.handleChange("limitedActivity")}
                                        label="In general, do you have any health problems that require you to limit your activities?"
                                    />

                                    <Divider/>

                                    {currentPatient.isFemale && (
                                        <>
                                            <DropdownField
                                                selectedValue={props.values.isPregnant}
                                                onValueChange={props.handleChange("isPregnant")}
                                                label="Are you pregnant?"
                                            />
                                            <Divider/>
                                        </>
                                    )}

                                    <DropdownField
                                        selectedValue={props.values.hasHeartDisease}
                                        onValueChange={props.handleChange("hasHeartDisease")}
                                        label="Do you have heart disease?"
                                    />

                                    <DropdownField
                                        selectedValue={props.values.hasDiabetes}
                                        onValueChange={props.handleChange("hasDiabetes")}
                                        label="Do you have diabetes?"
                                    />

                                    <Divider/>

                                    <DropdownField
                                        selectedValue={props.values.hasLungDisease}
                                        onValueChange={props.handleChange("hasLungDisease")}
                                        label="Do you have lung disease or asthma?"
                                    />

                                    <DropdownField
                                        selectedValue={props.values.smokerStatus}
                                        onValueChange={props.handleChange("smokerStatus")}
                                        label="Do you smoke?"
                                        items={smokerStatusItems}
                                        error={props.touched.smokerStatus && props.errors.smokerStatus}
                                    />

                                    {props.values.smokerStatus === 'not_currently' && (
                                        <GenericTextField
                                            formikProps={props}
                                            label="How many years since you last smoked?"
                                            name="smokedYearsAgo"
                                            keyboardType="numeric"
                                        />
                                    )}

                                    <Divider/>

                                    <DropdownField
                                        selectedValue={props.values.hasKidneyDisease}
                                        onValueChange={props.handleChange("hasKidneyDisease")}
                                        label="Do you have kidney disease?"
                                    />

                                    <Divider/>

                                    <DropdownField
                                        selectedValue={props.values.hasCancer}
                                        onValueChange={props.handleChange("hasCancer")}
                                        label="Are you living with cancer?"
                                    />

                                    {props.values.hasCancer === 'yes' && (
                                        <>
                                            {isUSLocale() && (
                                                <>
                                                    <GenericTextField
                                                        formikProps={props}
                                                        label="What type of cancer do you have?"
                                                        name="cancerType"
                                                    />

                                                </>
                                            )}
                                            <DropdownField
                                                selectedValue={props.values.doesChemiotherapy}
                                                onValueChange={props.handleChange("doesChemiotherapy")}
                                                label="Are you on chemotherapy or immunotherapy for cancer?"
                                            />
                                        </>
                                    )}

                                    <DropdownField
                                        selectedValue={props.values.takesImmunosuppressants}
                                        onValueChange={props.handleChange("takesImmunosuppressants")}
                                        label="Do you regularly take immunosuppressant medications (including steroids, methotrexate, biologic agents)?"
                                    />

                                    <DropdownField
                                        selectedValue={props.values.takesAspirin}
                                        onValueChange={props.handleChange("takesAspirin")}
                                        label="Do you regularly take aspirin (baby aspirin or standard dose)?"
                                    />

                                    <DropdownField
                                        selectedValue={props.values.takesCorticosteroids}
                                        onValueChange={props.handleChange("takesCorticosteroids")}
                                        label={"Do you regularly take \"NSAIDs\" like ibuprofen, nurofen, diclofenac, naproxen?"}
                                    />

                                    <DropdownField
                                        selectedValue={props.values.takesAnyBloodPressureMedications}
                                        onValueChange={props.handleChange("takesAnyBloodPressureMedications")}
                                        label={"Are you regularly taking any blood pressure medications?"}
                                    />

                                    {props.values.takesAnyBloodPressureMedications === 'yes' && (
                                        <>
                                            <DropdownField
                                                selectedValue={props.values.takesBloodPressureMedications}
                                                onValueChange={props.handleChange("takesBloodPressureMedications")}
                                                label={"Are you regularly taking blood pressure medications ending in \"-pril\", such as enalapril, lisinopril, captopril, ramipril?"}
                                            />

                                            <DropdownField
                                                selectedValue={props.values.takesBloodPressureMedicationsSartan}
                                                onValueChange={props.handleChange("takesBloodPressureMedicationsSartan")}
                                                label={"Are you regularly taking blood pressure medications ending in \"-sartan\", such as losarton, valsartan, irbesartan?"}
                                            />
                                        </>
                                    )}


                                    <Divider/>

                                    <DropdownField
                                        selectedValue={props.values.alreadyHadCovid}
                                        onValueChange={props.handleChange("alreadyHadCovid")}
                                        label={"Do you think you have already had COVID-19, but were not tested?"}
                                    />

                                    {props.values.alreadyHadCovid === 'yes' && (
                                        <>
                                            <DropdownField
                                                selectedValue={props.values.classicSymptoms}
                                                onValueChange={props.handleChange("classicSymptoms")}
                                                label={"Did you have the classic symptoms (high fever and persistent cough) for several days?"}
                                            />

                                            <GenericTextField
                                                formikProps={props}
                                                label="How many days ago did your symptoms start?"
                                                name="classicSymptomsDaysAgo"
                                                keyboardType="numeric"
                                            />
                                        </>
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