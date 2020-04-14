import React, { Component } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import Screen, { Header, isAndroid, ProgressBlock } from "../../components/Screen";
import { BrandedButton, ErrorText, HeaderText } from "../../components/Text";
import { Form } from "native-base";
import ProgressStatus from "../../components/ProgressStatus";
import { Formik } from "formik";
import * as Yup from "yup";
import i18n from "../../locale/i18n"
import UserService from "../../core/user/UserService";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenParamList } from "../ScreenParamList";
import { RouteProp } from "@react-navigation/native";
import { AssessmentInfosRequest } from "../../core/user/dto/UserAPIContracts";
import DropdownField from "../../components/DropdownField";


const initialFormValues = {
    interactedAnyPatients: "",
    treatedPatientsWithCovid: "",
    hasUsedPPEEquipment: "",
    ppeAvailabilityAlways: "",
    ppeAvailabilitySometimes: "",
    ppeAvailabilityNever: "",
};

interface HealthWorkerExposureData {
    interactedAnyPatients: string;
    treatedPatientsWithCovid: string;
    hasUsedPPEEquipment: string;
    ppeAvailabilityAlways: string;
    ppeAvailabilitySometimes: string;
    ppeAvailabilityNever: string;
}


type HealthWorkerExposureProps = {
    navigation: StackNavigationProp<ScreenParamList, 'HealthWorkerExposure'>
    route: RouteProp<ScreenParamList, 'HealthWorkerExposure'>
}


type State = {
    errorMessage: string;
}

const initialState: State = {
    errorMessage: ""
};


export default class HealthWorkerExposureScreen extends Component<HealthWorkerExposureProps, State> {

    constructor(props: HealthWorkerExposureProps) {
        super(props);
        this.state = initialState;
    }

    handleUpdate(formData: HealthWorkerExposureData) {
        const patientId = this.props.route.params.patientId;
        const userService = new UserService();
        var assessment = this.createAssessment(formData);

        userService.addAssessment(assessment)
            .then(response => this.props.navigation.navigate('CovidTest', {patientId: patientId, assessmentId: response.data.id}))
            .catch(err => this.setState({errorMessage: i18n.t("something-went-wrong")}));
    }

    private createAssessment(formData: HealthWorkerExposureData) {
        const patientId = this.props.route.params.patientId;

        return {
            patient: patientId,
            interacted_any_patients: formData.interactedAnyPatients === 'yes',
            ...(formData.treatedPatientsWithCovid && {treated_patients_with_covid: formData.treatedPatientsWithCovid}),
            ...(formData.hasUsedPPEEquipment && {have_used_PPE: formData.hasUsedPPEEquipment}),
            ...(formData.hasUsedPPEEquipment === 'always' && formData.ppeAvailabilityAlways && {always_used_shortage: formData.ppeAvailabilityAlways}),
            ...(formData.hasUsedPPEEquipment === 'sometimes' && formData.ppeAvailabilitySometimes && {sometimes_used_shortage: formData.ppeAvailabilitySometimes}),
            ...(formData.hasUsedPPEEquipment === 'never' && formData.ppeAvailabilityNever && {never_used_shortage: formData.ppeAvailabilityNever}),
        } as Partial<AssessmentInfosRequest>;
    }

    registerSchema = Yup.object().shape({
        interactedAnyPatients: Yup.string().required(),
        treatedPatientsWithCovid: Yup.string().when('interactedAnyPatients', {
            is: 'yes',
            then: Yup.string().required(i18n.t("required-treated-patients-with-covid")),
        }),
        hasUsedPPEEquipment: Yup.string().when('interactedAnyPatients', {
            is: 'yes',
            then: Yup.string().required(i18n.t("required-has-used-ppe-equipment")),
        }),
        ppeAvailabilityAlways: Yup.string().when(['interactedAnyPatients', 'hasUsedPPEEquipment'], {
            is: (interactedAnyPatients, hasUsedPPEEquipment) => interactedAnyPatients === 'yes' && hasUsedPPEEquipment === 'always',
            then: Yup.string().required(i18n.t("required-ppe-availability-always")),
        }),
        ppeAvailabilitySometimes: Yup.string().when('hasUsedPPEEquipment', {
            is: (interactedAnyPatients, hasUsedPPEEquipment) => interactedAnyPatients === 'yes' && hasUsedPPEEquipment === 'sometimes',
            then: Yup.string().required(i18n.t("required-ppe-availability-sometimes"))
        }),
        ppeAvailabilityNever: Yup.string().when('hasUsedPPEEquipment', {
            is: (interactedAnyPatients, hasUsedPPEEquipment) => interactedAnyPatients === 'yes' && hasUsedPPEEquipment === 'never',
            then: Yup.string().required(i18n.t("required-ppe-availability-never"))
        }),
    });


    render() {
        const patientInteractionOptions = [
            {label: "Yes, documented COVID-19 cases only", value: 'yes_documented'},
            {label: "Yes, suspected COVID-19 cases only", value: 'yes_suspected'},
            {label: "Yes, both documented and suspected COVID-19 cases", value: 'yes_documented_suspected'},
            {label: "Not that I know of", value: 'no'}
        ];
        const equipmentUsageOptions = [
            {label: 'Always', value: 'always'},
            {label: 'Sometimes', value: 'sometimes'},
            {label: 'Never', value: 'never'},
        ];

        const availabilityAlwaysOptions = [
            {label: 'I have had all the PPE I need for work', value: 'all_needed'},
            {label: 'I had to reuse PPE because of shortage', value: 'reused'},
        ];
        const availabilitySometimesOptions = [
            {label: "I haven't always needed to use PPE, but have had enough when I did", value: 'all_needed'},
            {label: "I would have used PPE all the time, but I haven't had enough", value: 'not_enough'},
            {label: "I've had to reuse PPE because of shortage", value: 'reused'},
        ];
        const availabilityNeverOptions = [
            {label: "I haven't needed PPE", value: 'not_needed'},
            {label: "I needed PPE, but it was not available", value: 'not_available'},
        ];



        if (isAndroid) {
            equipmentUsageOptions.unshift({label: i18n.t("choose-one-of-these-options"), value: ""});
            availabilityAlwaysOptions.unshift({label: i18n.t("choose-one-of-these-options"), value: ""});
            availabilitySometimesOptions.unshift({label: i18n.t("choose-one-of-these-options"), value: ""});
            availabilityNeverOptions.unshift({label: i18n.t("choose-one-of-these-options"), value: ""});
            patientInteractionOptions.unshift({label: i18n.t("choose-one-of-these-options"), value: ""});
        }

        return (
            <Screen>
                <Header>
                    <HeaderText>{i18n.t("title-health-worker-exposure")}</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={1} maxSteps={5}/>
                </ProgressBlock>

                <Formik
                    initialValues={initialFormValues}
                    validationSchema={this.registerSchema}
                    onSubmit={(values: HealthWorkerExposureData) => this.handleUpdate(values)}
                >
                    {props => {
                        return (
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
                                <Form>

                                    <View>
                                        <DropdownField
                                            selectedValue={props.values.interactedAnyPatients}
                                            onValueChange={props.handleChange("interactedAnyPatients")}
                                            label={i18n.t("label-interacted-with-any-patients-last-day")}
                                        />

                                        {!!props.values.interactedAnyPatients && props.values.interactedAnyPatients === "yes" &&
                                        <>
                                            <DropdownField
                                                selectedValue={props.values.treatedPatientsWithCovid}
                                                onValueChange={props.handleChange("treatedPatientsWithCovid")}
                                                label={i18n.t("label-interacted-with-infected-patients-last-day")}
                                                items={patientInteractionOptions}
                                            />

                                            <DropdownField
                                                selectedValue={props.values.hasUsedPPEEquipment}
                                                onValueChange={props.handleChange("hasUsedPPEEquipment")}
                                                label={i18n.t("label-used-ppe-equipment-last-day")}
                                                items={equipmentUsageOptions}
                                            />

                                            {props.values.hasUsedPPEEquipment === 'always' && (
                                                <DropdownField
                                                    selectedValue={props.values.ppeAvailabilityAlways}
                                                    onValueChange={props.handleChange("ppeAvailabilityAlways")}
                                                    label={i18n.t("label-chose-an-option")}
                                                    items={availabilityAlwaysOptions}
                                                />
                                            )}

                                            {props.values.hasUsedPPEEquipment === 'sometimes' && (
                                                <DropdownField
                                                    selectedValue={props.values.ppeAvailabilitySometimes}
                                                    onValueChange={props.handleChange("ppeAvailabilitySometimes")}
                                                    label={i18n.t("label-chose-an-option")}
                                                    items={availabilitySometimesOptions}
                                                />
                                            )}

                                            {props.values.hasUsedPPEEquipment === 'never' && (
                                                <DropdownField
                                                    selectedValue={props.values.ppeAvailabilityNever}
                                                    onValueChange={props.handleChange("ppeAvailabilityNever")}
                                                    label={i18n.t("label-chose-an-option")}
                                                    items={availabilityNeverOptions}
                                                />
                                            )}
                                        </>
                                        }

                                    </View>


                                    {!!Object.keys(props.errors).length && (
                                        <ErrorText>Please fill in or correct the above information</ErrorText>
                                    )}
                                    <ErrorText>{this.state.errorMessage}</ErrorText>


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