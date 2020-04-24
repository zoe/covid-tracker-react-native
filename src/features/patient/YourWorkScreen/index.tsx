import { Formik } from "formik";
import { Form, Item, Label } from "native-base";
import React, { Component } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import { CheckboxItem, CheckboxList } from "../../../components/Checkbox";
import DropdownField from "../../../components/DropdownField";
import ProgressStatus from "../../../components/ProgressStatus";
import Screen, {
    FieldWrapper,
    Header,
    ProgressBlock,
} from "../../../components/Screen";
import { BrandedButton, ErrorText, HeaderText } from "../../../components/Text";
import { ValidationErrors } from "../../../components/ValidationError";
import UserService from "../../../core/user/UserService";
import {
    PatientInfosRequest,
    HealthCareStaffOptions,
} from "../../../core/user/dto/UserAPIContracts";
import i18n from "../../../locale/i18n";
import {
    healthcareStaffOptions,
    equipmentUsageOptions,
    availabilityAlwaysOptions,
    availabilitySometimesOptions,
    patientInteractionOptions,
    availabilityNeverOptions,
    YourWorkProps,
    State,
    initialState,
    YourWorkData,
    initialFormValues,
} from "./helpers";

export default class YourWorkScreen extends Component<YourWorkProps, State> {
    constructor(props: YourWorkProps) {
        super(props);
        this.state = initialState;
    }

    handleUpdateWork(formData: YourWorkData) {
        const currentPatient = this.props.route.params.currentPatient;
        const patientId = currentPatient.patientId;
        const userService = new UserService();
        const infos = this.createPatientInfos(formData);

        userService
            .updatePatient(patientId, infos)
            .then((response) => {
                const isHealthcareWorker =
                    infos.healthcare_professional ===
                        HealthCareStaffOptions.DOES_INTERACT ||
                    infos.is_carer_for_community;
                currentPatient.isHealthWorker = isHealthcareWorker;
                this.props.navigation.navigate("AboutYou", { currentPatient });
            })
            .catch(() =>
                this.setState({
                    errorMessage: i18n.t("something-went-wrong"),
                })
            );
    }

    private createPatientInfos(formData: YourWorkData) {
        let infos = {
            ...(formData.isHealthcareStaff && {
                healthcare_professional: formData.isHealthcareStaff,
            }),
            is_carer_for_community: formData.isCarer === "yes",
        } as PatientInfosRequest;

        if (
            formData.isHealthcareStaff ===
                HealthCareStaffOptions.DOES_INTERACT ||
            formData.isCarer === "yes"
        ) {
            infos = {
                ...infos,
                have_worked_in_hospital_inpatient: this.state
                    .atHospitalInpatient,
                have_worked_in_hospital_outpatient: this.state
                    .atHospitalOutpatient,
                have_worked_in_hospital_clinic: this.state
                    .atClinicOutsideHospital,
                have_worked_in_hospital_care_facility: this.state
                    .atCareFacility,
                have_worked_in_hospital_home_health: this.state.atHomeHealth,
                have_worked_in_hospital_school_clinic: this.state
                    .atSchoolClinic,
                have_worked_in_hospital_other: this.state.atOtherFacility,

                ...(formData.hasPatientInteraction && {
                    interacted_patients_with_covid:
                        formData.hasPatientInteraction,
                }),
                ...(formData.hasUsedPPEEquipment && {
                    have_used_PPE: formData.hasUsedPPEEquipment,
                }),
                ...(formData.hasUsedPPEEquipment === "always" &&
                    formData.ppeAvailabilityAlways && {
                        always_used_shortage: formData.ppeAvailabilityAlways,
                    }),
                ...(formData.hasUsedPPEEquipment === "sometimes" &&
                    formData.ppeAvailabilitySometimes && {
                        sometimes_used_shortage:
                            formData.ppeAvailabilitySometimes,
                    }),
                ...(formData.hasUsedPPEEquipment === "never" &&
                    formData.ppeAvailabilityNever && {
                        never_used_shortage: formData.ppeAvailabilityNever,
                    }),
            };
        }

        return infos;
    }

    registerSchema = Yup.object().shape({
        inHospitalInpatient: Yup.boolean(),
        isHealthcareStaff: Yup.string().required(
            i18n.t("required-is-healthcare-worker")
        ),
        isCarer: Yup.string().required(i18n.t("required-is-carer")),
        hasPatientInteraction: Yup.string().when(
            ["isHealthcareStaff", "isCarer"],
            {
                is: (isHealthcareStaff, isCarer) =>
                    isHealthcareStaff ===
                        HealthCareStaffOptions.DOES_INTERACT ||
                    isCarer === "yes",
                then: Yup.string().required(
                    i18n.t("required-has-patient-interaction")
                ),
            }
        ),
        hasUsedPPEEquipment: Yup.string().when(
            ["isHealthcareStaff", "isCarer"],
            {
                is: (isHealthcareStaff, isCarer) =>
                    isHealthcareStaff ===
                        HealthCareStaffOptions.DOES_INTERACT ||
                    isCarer === "yes",
                then: Yup.string().required(
                    i18n.t("required-has-used-ppe-equipment")
                ),
            }
        ),
        ppeAvailabilityAlways: Yup.string().when("hasUsedPPEEquipment", {
            is: "always",
            then: Yup.string().required(i18n.t("required-ppe-availability")),
        }),
        ppeAvailabilitySometimes: Yup.string().when("hasUsedPPEEquipment", {
            is: "sometimes",
            then: Yup.string().required(i18n.t("required-ppe-availability")),
        }),
        ppeAvailabilityNever: Yup.string().when("hasUsedPPEEquipment", {
            is: "never",
            then: Yup.string().required(i18n.t("required-ppe-availability")),
        }),
    });

    render() {
        const currentPatient = this.props.route.params.currentPatient;

        return (
            <Screen
                profile={currentPatient.profile}
                navigation={this.props.navigation}
            >
                <Header>
                    <HeaderText>{i18n.t("title-about-work")}</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={2} maxSteps={6} />
                </ProgressBlock>

                <Formik
                    initialValues={initialFormValues as YourWorkData}
                    validationSchema={this.registerSchema}
                    onSubmit={(values: YourWorkData) =>
                        this.handleUpdateWork(values)
                    }
                >
                    {({
                        values: {
                            isHealthcareStaff,
                            isCarer,
                            hasUsedPPEEquipment,
                            hasPatientInteraction,
                            ppeAvailabilitySometimes,
                            ppeAvailabilityAlways,
                            ppeAvailabilityNever,
                        },
                        handleSubmit,
                        handleChange,
                        touched,
                        errors,
                    }) => {
                        const showWorkerAndCarerQuestions: boolean =
                            (!!isHealthcareStaff &&
                                isHealthcareStaff ===
                                    HealthCareStaffOptions.DOES_INTERACT) ||
                            (!!isCarer && isCarer === "yes");
                        return (
                            <KeyboardAvoidingView
                                behavior={
                                    Platform.OS === "ios"
                                        ? "padding"
                                        : undefined
                                }
                            >
                                <Form>
                                    <DropdownField
                                        selectedValue={isHealthcareStaff}
                                        onValueChange={handleChange(
                                            "isHealthcareStaff"
                                        )}
                                        label={i18n.t(
                                            "are-you-healthcare-staff"
                                        )}
                                        items={healthcareStaffOptions}
                                        error={
                                            touched.isHealthcareStaff &&
                                            errors.isHealthcareStaff
                                        }
                                    />

                                    <DropdownField
                                        selectedValue={isCarer}
                                        onValueChange={handleChange("isCarer")}
                                        label={i18n.t("are-you-carer")}
                                        androidDefaultLabel={i18n.t(
                                            "choose-one-of-these-options"
                                        )}
                                        error={
                                            touched.isCarer && errors.isCarer
                                        }
                                    />

                                    {/* if is healthcare worker question is yes */}
                                    {showWorkerAndCarerQuestions && (
                                        <View>
                                            <FieldWrapper>
                                                <Item
                                                    stackedLabel
                                                    style={styles.textItemStyle}
                                                >
                                                    <Label>
                                                        {i18n.t(
                                                            "label-physically-worked-in-places"
                                                        )}
                                                    </Label>

                                                    <CheckboxList>
                                                        <CheckboxItem
                                                            value={
                                                                this.state
                                                                    .atHospitalInpatient
                                                            }
                                                            onChange={(
                                                                value: boolean
                                                            ) =>
                                                                this.setState({
                                                                    atHospitalInpatient: value,
                                                                })
                                                            }
                                                        >
                                                            {i18n.t(
                                                                "your-work.worked-hospital-inpatient"
                                                            )}
                                                        </CheckboxItem>
                                                        <CheckboxItem
                                                            value={
                                                                this.state
                                                                    .atHospitalOutpatient
                                                            }
                                                            onChange={(
                                                                value: boolean
                                                            ) =>
                                                                this.setState({
                                                                    atHospitalOutpatient: value,
                                                                })
                                                            }
                                                        >
                                                            {i18n.t(
                                                                "your-work.worked-hospital-outpatient"
                                                            )}
                                                        </CheckboxItem>
                                                        <CheckboxItem
                                                            value={
                                                                this.state
                                                                    .atClinicOutsideHospital
                                                            }
                                                            onChange={(
                                                                value: boolean
                                                            ) =>
                                                                this.setState({
                                                                    atClinicOutsideHospital: value,
                                                                })
                                                            }
                                                        >
                                                            {i18n.t(
                                                                "your-work.worked-clinic-outside-hospital"
                                                            )}
                                                        </CheckboxItem>
                                                        <CheckboxItem
                                                            value={
                                                                this.state
                                                                    .atCareFacility
                                                            }
                                                            onChange={(
                                                                value: boolean
                                                            ) =>
                                                                this.setState({
                                                                    atCareFacility: value,
                                                                })
                                                            }
                                                        >
                                                            {i18n.t(
                                                                "your-work.worked-nursing-home"
                                                            )}
                                                        </CheckboxItem>
                                                        <CheckboxItem
                                                            value={
                                                                this.state
                                                                    .atHomeHealth
                                                            }
                                                            onChange={(
                                                                value: boolean
                                                            ) =>
                                                                this.setState({
                                                                    atHomeHealth: value,
                                                                })
                                                            }
                                                        >
                                                            {i18n.t(
                                                                "your-work.worked-home-health"
                                                            )}
                                                        </CheckboxItem>
                                                        <CheckboxItem
                                                            value={
                                                                this.state
                                                                    .atSchoolClinic
                                                            }
                                                            onChange={(
                                                                value: boolean
                                                            ) =>
                                                                this.setState({
                                                                    atSchoolClinic: value,
                                                                })
                                                            }
                                                        >
                                                            {i18n.t(
                                                                "your-work.worked-school-clinic"
                                                            )}
                                                        </CheckboxItem>
                                                        <CheckboxItem
                                                            value={
                                                                this.state
                                                                    .atOtherFacility
                                                            }
                                                            onChange={(
                                                                value: boolean
                                                            ) =>
                                                                this.setState({
                                                                    atOtherFacility: value,
                                                                })
                                                            }
                                                        >
                                                            {i18n.t(
                                                                "your-work.worked-other-facility"
                                                            )}
                                                        </CheckboxItem>
                                                    </CheckboxList>
                                                </Item>
                                            </FieldWrapper>

                                            <DropdownField
                                                selectedValue={
                                                    hasPatientInteraction
                                                }
                                                onValueChange={handleChange(
                                                    "hasPatientInteraction"
                                                )}
                                                label={i18n.t(
                                                    "label-interacted-with-infected-patients"
                                                )}
                                                items={
                                                    patientInteractionOptions
                                                }
                                                error={
                                                    touched.hasPatientInteraction &&
                                                    errors.hasPatientInteraction
                                                }
                                            />

                                            <DropdownField
                                                selectedValue={
                                                    hasUsedPPEEquipment
                                                }
                                                onValueChange={handleChange(
                                                    "hasUsedPPEEquipment"
                                                )}
                                                label={i18n.t(
                                                    "label-used-ppe-equipment"
                                                )}
                                                items={equipmentUsageOptions}
                                                error={
                                                    touched.hasUsedPPEEquipment &&
                                                    errors.hasUsedPPEEquipment
                                                }
                                            />

                                            {hasUsedPPEEquipment ===
                                                "always" && (
                                                <DropdownField
                                                    selectedValue={
                                                        ppeAvailabilityAlways
                                                    }
                                                    onValueChange={handleChange(
                                                        "ppeAvailabilityAlways"
                                                    )}
                                                    label={i18n.t(
                                                        "label-chose-an-option"
                                                    )}
                                                    items={
                                                        availabilityAlwaysOptions
                                                    }
                                                    error={
                                                        touched.ppeAvailabilityAlways &&
                                                        errors.ppeAvailabilityAlways
                                                    }
                                                />
                                            )}

                                            {hasUsedPPEEquipment ===
                                                "sometimes" && (
                                                <DropdownField
                                                    selectedValue={
                                                        ppeAvailabilitySometimes
                                                    }
                                                    onValueChange={handleChange(
                                                        "ppeAvailabilitySometimes"
                                                    )}
                                                    label={i18n.t(
                                                        "label-chose-an-option"
                                                    )}
                                                    items={
                                                        availabilitySometimesOptions
                                                    }
                                                    error={
                                                        touched.ppeAvailabilitySometimes &&
                                                        errors.ppeAvailabilitySometimes
                                                    }
                                                />
                                            )}

                                            {hasUsedPPEEquipment ===
                                                "never" && (
                                                <DropdownField
                                                    selectedValue={
                                                        ppeAvailabilityNever
                                                    }
                                                    onValueChange={handleChange(
                                                        "ppeAvailabilityNever"
                                                    )}
                                                    label={i18n.t(
                                                        "label-chose-an-option"
                                                    )}
                                                    items={
                                                        availabilityNeverOptions
                                                    }
                                                    error={
                                                        touched.ppeAvailabilityNever &&
                                                        errors.ppeAvailabilityNever
                                                    }
                                                />
                                            )}
                                        </View>
                                    )}

                                    <ErrorText>
                                        {this.state.errorMessage}
                                    </ErrorText>
                                    {!!Object.keys(errors).length && (
                                        <ValidationErrors errors={errors} />
                                    )}

                                    <BrandedButton onPress={handleSubmit}>
                                        {i18n.t("next-question")}
                                    </BrandedButton>
                                </Form>
                            </KeyboardAvoidingView>
                        );
                    }}
                </Formik>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    textItemStyle: {
        borderColor: "transparent",
    },
});
