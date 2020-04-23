import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { isAndroid } from "../../../components/Screen";
import {
    HealthCareStaffOptions,
    EquipmentUsageOptions,
    AvailabilityAlwaysOptions,
    AvailabilitySometimesOptions,
    AvailabilityNeverOptions,
    PatientInteractions,
} from "../../../core/user/dto/UserAPIContracts";
import i18n from "../../../locale/i18n";
import { ScreenParamList } from "../../ScreenParamList";

const androidOption = isAndroid && {
    label: i18n.t("choose-one-of-these-options"),
    value: "",
};

interface IOption {
    label: string;
    value: string | number;
}

export const healthcareStaffOptions = [
    androidOption,
    { label: i18n.t("picker-no"), value: HealthCareStaffOptions.NO },
    {
        label: i18n.t("yes-interacting-patients"),
        value: HealthCareStaffOptions.DOES_INTERACT,
    },
    {
        label: i18n.t("yes-not-interacting-patients"),
        value: HealthCareStaffOptions.DOES_NOT_INTERACT,
    },
].filter(Boolean) as IOption[];

export const equipmentUsageOptions = [
    androidOption,
    {
        label: i18n.t("health-worker-exposure-picker-ppe-always"),
        value: EquipmentUsageOptions.ALWAYS,
    },
    {
        label: i18n.t("health-worker-exposure-picker-ppe-sometimes"),
        value: EquipmentUsageOptions.SOMETIMES,
    },
    {
        label: i18n.t("health-worker-exposure-picker-ppe-never"),
        value: EquipmentUsageOptions.NEVER,
    },
].filter(Boolean) as IOption[];

export const availabilityAlwaysOptions = [
    androidOption,
    {
        label: i18n.t("health-worker-exposure-picker-ppe-always-all-needed"),
        value: AvailabilityAlwaysOptions.ALL_NEEDED,
    },
    {
        label: i18n.t("health-worker-exposure-picker-ppe-always-reused"),
        value: AvailabilityAlwaysOptions.REUSED,
    },
].filter(Boolean) as IOption[];

export const availabilitySometimesOptions = [
    androidOption,
    {
        label: i18n.t("health-worker-exposure-picker-ppe-sometimes-all-needed"),
        value: AvailabilitySometimesOptions.ALL_NEEDED,
    },
    {
        label: i18n.t("health-worker-exposure-picker-ppe-sometimes-not-enough"),
        value: AvailabilitySometimesOptions.NOT_ENOUGH,
    },
    {
        label: i18n.t("health-worker-exposure-picker-ppe-sometimes-reused"),
        value: AvailabilitySometimesOptions.REUSED,
    },
].filter(Boolean) as IOption[];

export const availabilityNeverOptions = [
    androidOption,
    {
        label: i18n.t("health-worker-exposure-picker-ppe-never-not-needed"),
        value: AvailabilityNeverOptions.NOT_NEEDED,
    },
    {
        label: i18n.t("health-worker-exposure-picker-ppe-never-not-available"),
        value: AvailabilityNeverOptions.NOT_AVAILABLE,
    },
].filter(Boolean) as IOption[];

export const patientInteractionOptions = [
    androidOption,
    {
        label: i18n.t("exposed-yes-documented"),
        value: PatientInteractions.YES_DOCUMENTED,
    },
    {
        label: i18n.t("exposed-yes-undocumented"),
        value: PatientInteractions.YES_SUSPECTED,
    },
    {
        label: i18n.t("exposed-both"),
        value: PatientInteractions.YES_DOCUMENTED_SUSPECTED,
    },
    { label: i18n.t("exposed-no"), value: PatientInteractions.NO },
].filter(Boolean) as IOption[];

export const initialFormValues: Partial<YourWorkData> = {
    // inHospitalInpatient: false,
};

export interface YourWorkData {
    inHospitalInpatient: boolean;
    isHealthcareStaff: HealthCareStaffOptions;
    isCarer: "yes" | "no";
    hasPatientInteraction: PatientInteractions;
    hasUsedPPEEquipment: EquipmentUsageOptions;
    ppeAvailabilityAlways: AvailabilityAlwaysOptions;
    ppeAvailabilitySometimes: AvailabilitySometimesOptions;
    ppeAvailabilityNever: AvailabilityNeverOptions;
}

export type YourWorkProps = {
    navigation: StackNavigationProp<ScreenParamList, "AboutYou">;
    route: RouteProp<ScreenParamList, "AboutYou">;
};

export type State = {
    isDiabetesRegistry: boolean;
    atHospitalInpatient: boolean;
    atHospitalOutpatient: boolean;
    atClinicOutsideHospital: boolean;
    atCareFacility: boolean;
    atHomeHealth: boolean;
    atSchoolClinic: boolean;
    atOtherFacility: boolean;

    errorMessage: string;
};

export const initialState: State = {
    isDiabetesRegistry: false,
    atHospitalInpatient: false,
    atHospitalOutpatient: false,
    atClinicOutsideHospital: false,
    atCareFacility: false,
    atHomeHealth: false,
    atSchoolClinic: false,
    atOtherFacility: false,

    errorMessage: "",
};
