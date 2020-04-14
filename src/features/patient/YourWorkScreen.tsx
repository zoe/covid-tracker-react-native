import React, {Component} from "react";
import {KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
import Screen, {FieldWrapper, Header, isAndroid, ProgressBlock} from "../../components/Screen";
import {BrandedButton, ErrorText, HeaderText} from "../../components/Text";
import {Form, Item, Label} from "native-base";
import ProgressStatus from "../../components/ProgressStatus";
import {Formik} from "formik";
import * as Yup from "yup";
import i18n from "../../locale/i18n"
import UserService, {isGBLocale, isUSLocale} from "../../core/user/UserService";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {PatientInfosRequest} from "../../core/user/dto/UserAPIContracts";
import DropdownField from "../../components/DropdownField";
import {CheckboxItem, CheckboxList} from "../../components/Checkbox";
import {ValidationErrors} from "../../components/ValidationError";


const initialFormValues = {
    inHospitalInpatient: false,

    isHealthcareStaff: "",
    isCarer: "",
    hasPatientInteraction: "",
    hasUsedPPEEquipment: "",
    ppeAvailabilityAlways: "",
    ppeAvailabilitySometimes: "",
    ppeAvailabilityNever: "",
};

interface YourWorkData {
    inHospitalInpatient: boolean;

    isHealthcareStaff: string;
    isCarer: string;
    hasPatientInteraction: string;
    hasUsedPPEEquipment: string;
    ppeAvailabilityAlways: string;
    ppeAvailabilitySometimes: string;
    ppeAvailabilityNever: string;
}


type YourWorkProps = {
    navigation: StackNavigationProp<ScreenParamList, 'AboutYou'>
    route: RouteProp<ScreenParamList, 'AboutYou'>
}


type State = {
    isDiabetesRegistry: boolean;
    atHospitalInpatient: boolean;
    atHospitalOutpatient: boolean;
    atClinicOutsideHospital: boolean;
    atCareFacility: boolean;
    atHomeHealth: boolean;
    atSchoolClinic: boolean;
    atOtherFacility: boolean;


    errorMessage: string;
}

const initialState: State = {
    isDiabetesRegistry: false,
    atHospitalInpatient: false,
    atHospitalOutpatient: false,
    atClinicOutsideHospital: false,
    atCareFacility: false,
    atHomeHealth: false,
    atSchoolClinic: false,
    atOtherFacility: false,

    errorMessage: ""
};


export default class YourWorkScreen extends Component<YourWorkProps, State> {

    constructor(props: YourWorkProps) {
        super(props);
        this.state = initialState;
    }

    handleUpdateWork(formData: YourWorkData) {
        const currentPatient = this.props.route.params.currentPatient;
        const patientId = currentPatient.patientId;
        const userService = new UserService();
        var infos = this.createPatientInfos(formData);

        userService.updatePatient(patientId, infos)
            .then(response => {
                const isHealthcareWorker = (
                    (infos.healthcare_professional === "yes_does_interact")
                    || infos.is_carer_for_community
                );
                currentPatient.isHealthWorker = isHealthcareWorker;
                this.props.navigation.navigate('AboutYou', {currentPatient})
            })
            .catch(err => this.setState({errorMessage: i18n.t("something-went-wrong")}));

    }


    private createPatientInfos(formData: YourWorkData) {
        var infos = {
            ...(formData.isHealthcareStaff && {healthcare_professional: formData.isHealthcareStaff}),
            is_carer_for_community: formData.isCarer === 'yes',
        } as PatientInfosRequest;


        if (formData.isHealthcareStaff === 'yes_does_interact' || formData.isCarer === 'yes') {
            infos = {
                ...infos,
                have_worked_in_hospital_inpatient: this.state.atHospitalInpatient,
                have_worked_in_hospital_outpatient: this.state.atHospitalOutpatient,
                have_worked_in_hospital_clinic: this.state.atClinicOutsideHospital,
                have_worked_in_hospital_care_facility: this.state.atCareFacility,
                have_worked_in_hospital_home_health: this.state.atHomeHealth,
                have_worked_in_hospital_school_clinic: this.state.atSchoolClinic,
                have_worked_in_hospital_other: this.state.atOtherFacility,

                ...(formData.hasPatientInteraction && {interacted_patients_with_covid: formData.hasPatientInteraction}),
                ...(formData.hasUsedPPEEquipment && {have_used_PPE: formData.hasUsedPPEEquipment}),
                ...(formData.hasUsedPPEEquipment === 'always' && formData.ppeAvailabilityAlways && {always_used_shortage: formData.ppeAvailabilityAlways}),
                ...(formData.hasUsedPPEEquipment === 'sometimes' && formData.ppeAvailabilitySometimes && {sometimes_used_shortage: formData.ppeAvailabilitySometimes}),
                ...(formData.hasUsedPPEEquipment === 'never' && formData.ppeAvailabilityNever && {never_used_shortage: formData.ppeAvailabilityNever}),
            };

        }

        return infos;
    }

    registerSchema = Yup.object().shape({
        inHospitalInpatient: Yup.boolean(),
        isHealthcareStaff: Yup.string().required(i18n.t("required-is-healthcare-worker")),
        isCarer: Yup.string().required(i18n.t("required-is-carer")),
        hasPatientInteraction: Yup.string().when(['isHealthcareStaff', 'isCarer'], {
            is: (isHealthcareStaff, isCarer) => isHealthcareStaff === 'yes_does_interact' || isCarer === 'yes',
            then: Yup.string().required(i18n.t("required-has-patient-interaction"))
        }),
        hasUsedPPEEquipment: Yup.string().when(['isHealthcareStaff', 'isCarer'], {
            is: (isHealthcareStaff, isCarer) => isHealthcareStaff === 'yes_does_interact' || isCarer === 'yes',
            then: Yup.string().required(i18n.t("required-has-used-ppe-equipment"))
        }),
        ppeAvailabilityAlways: Yup.string().when('hasUsedPPEEquipment', {
            is: 'always',
            then: Yup.string().required(i18n.t("required-ppe-availability"))
        }),
        ppeAvailabilitySometimes: Yup.string().when('hasUsedPPEEquipment', {
            is: 'sometimes',
            then: Yup.string().required(i18n.t("required-ppe-availability"))
        }),
        ppeAvailabilityNever: Yup.string().when('hasUsedPPEEquipment', {
            is: 'never',
            then: Yup.string().required(i18n.t("required-ppe-availability"))
        }),
    });


    render() {
        const currentPatient = this.props.route.params.currentPatient;

        const healthcareStaffOptions = [
            {label: 'No', value: 'no'},
            {label: i18n.t("yes-interacting-patients"), value: 'yes_does_interact'},
            {label: i18n.t("yes-not-interacting-patients"), value: 'yes_does_not_interact'},
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

        const patientInteractionOptions = [
            {label: "Yes, documented COVID-19 cases only", value: 'yes_documented'},
            {label: "Yes, suspected COVID-19 cases only", value: 'yes_suspected'},
            {label: "Yes, both documented and suspected COVID-19 cases", value: 'yes_documented_suspected'},
            {label: "Not that I know of", value: 'no'}
        ];

        if (isAndroid) {
            healthcareStaffOptions.unshift({label: i18n.t("choose-one-of-these-options"), value: ""});
            equipmentUsageOptions.unshift({label: i18n.t("choose-one-of-these-options"), value: ""});
            availabilityAlwaysOptions.unshift({label: i18n.t("choose-one-of-these-options"), value: ""});
            availabilitySometimesOptions.unshift({label: i18n.t("choose-one-of-these-options"), value: ""});
            availabilityNeverOptions.unshift({label: i18n.t("choose-one-of-these-options"), value: ""});
            patientInteractionOptions.unshift({label: i18n.t("choose-one-of-these-options"), value: ""});
        }

        return (
            <Screen profile={currentPatient.profile}>
                <Header>
                    <HeaderText>{i18n.t("title-about-work")}</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={2} maxSteps={6}/>
                </ProgressBlock>

                <Formik
                    initialValues={initialFormValues}
                    validationSchema={this.registerSchema}
                    onSubmit={(values: YourWorkData) => this.handleUpdateWork(values)}
                >
                    {props => {
                        let showWorkerAndCarerQuestions: boolean = (
                            !!props.values.isHealthcareStaff && props.values.isHealthcareStaff === 'yes_does_interact') ||
                            (!!props.values.isCarer && props.values.isCarer === 'yes'
                        );
                        return (
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
                                <Form>


                                    <DropdownField
                                        selectedValue={props.values.isHealthcareStaff}
                                        onValueChange={props.handleChange("isHealthcareStaff")}
                                        label={i18n.t("are-you-healthcare-staff")}
                                        items={healthcareStaffOptions}
                                        error={props.touched.isHealthcareStaff && props.errors.isHealthcareStaff}
                                    />

                                    <DropdownField
                                        selectedValue={props.values.isCarer}
                                        onValueChange={props.handleChange("isCarer")}
                                        label={i18n.t("are-you-carer")}
                                        androidDefaultLabel={i18n.t("choose-one-of-these-options")}
                                        error={props.touched.isCarer && props.errors.isCarer}
                                    />

                                    {/* if is healthcare worker question is yes */}
                                    {showWorkerAndCarerQuestions && (
                                        <View>
                                            <FieldWrapper>
                                                <Item stackedLabel style={styles.textItemStyle}>
                                                    <Label>{i18n.t("label-physically-worked-in-places")}</Label>

                                                    <CheckboxList>
                                                        <CheckboxItem
                                                            value={this.state.atHospitalInpatient}
                                                            onChange={(value: boolean) => this.setState({atHospitalInpatient: value})}
                                                        >Hospital inpatient</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.atHospitalOutpatient}
                                                            onChange={(value: boolean) => this.setState({atHospitalOutpatient: value})}
                                                        >Hospital outpatient</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.atClinicOutsideHospital}
                                                            onChange={(value: boolean) => this.setState({atClinicOutsideHospital: value})}
                                                        >Clinic outside a hospital</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.atCareFacility}
                                                            onChange={(value: boolean) => this.setState({atCareFacility: value})}
                                                        >Nursing home/elderly care or group care facility</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.atHomeHealth}
                                                            onChange={(value: boolean) => this.setState({atHomeHealth: value})}
                                                        >Home health</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.atSchoolClinic}
                                                            onChange={(value: boolean) => this.setState({atSchoolClinic: value})}
                                                        >School clinic</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.atOtherFacility}
                                                            onChange={(value: boolean) => this.setState({atOtherFacility: value})}
                                                        >Other health care facility</CheckboxItem>
                                                    </CheckboxList>

                                                </Item>
                                            </FieldWrapper>


                                            <DropdownField
                                                selectedValue={props.values.hasPatientInteraction}
                                                onValueChange={props.handleChange("hasPatientInteraction")}
                                                label={i18n.t("label-interacted-with-infected-patients")}
                                                items={patientInteractionOptions}
                                                error={props.touched.hasPatientInteraction && props.errors.hasPatientInteraction}
                                            />


                                            <DropdownField
                                                selectedValue={props.values.hasUsedPPEEquipment}
                                                onValueChange={props.handleChange("hasUsedPPEEquipment")}
                                                label={i18n.t("label-used-ppe-equipment")}
                                                items={equipmentUsageOptions}
                                                error={props.touched.hasUsedPPEEquipment && props.errors.hasUsedPPEEquipment}
                                            />

                                            {props.values.hasUsedPPEEquipment === 'always' && (
                                                <DropdownField
                                                    selectedValue={props.values.ppeAvailabilityAlways}
                                                    onValueChange={props.handleChange("ppeAvailabilityAlways")}
                                                    label={i18n.t("label-chose-an-option")}
                                                    items={availabilityAlwaysOptions}
                                                    error={props.touched.ppeAvailabilityAlways && props.errors.ppeAvailabilityAlways}
                                                />
                                            )}

                                            {props.values.hasUsedPPEEquipment === 'sometimes' && (
                                                <DropdownField
                                                    selectedValue={props.values.ppeAvailabilitySometimes}
                                                    onValueChange={props.handleChange("ppeAvailabilitySometimes")}
                                                    label={i18n.t("label-chose-an-option")}
                                                    items={availabilitySometimesOptions}
                                                    error={props.touched.ppeAvailabilitySometimes && props.errors.ppeAvailabilitySometimes}
                                                />
                                            )}

                                            {props.values.hasUsedPPEEquipment === 'never' && (
                                                <DropdownField
                                                    selectedValue={props.values.ppeAvailabilityNever}
                                                    onValueChange={props.handleChange("ppeAvailabilityNever")}
                                                    label={i18n.t("label-chose-an-option")}
                                                    items={availabilityNeverOptions}
                                                    error={props.touched.ppeAvailabilityNever && props.errors.ppeAvailabilityNever}
                                                />
                                            )}

                                        </View>
                                    )}

                                    <ErrorText>{this.state.errorMessage}</ErrorText>
                                    {!!Object.keys(props.errors).length && (
                                        <ValidationErrors errors={props.errors}/>
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


const styles = StyleSheet.create({
    textItemStyle: {
        borderColor: 'transparent',
    },
});
