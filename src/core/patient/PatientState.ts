import {AvatarName} from "../../utils/avatar";

export type PatientProfile = {
    name: string,
    avatarName: AvatarName,
}

export type PatientStateType = {
    patientId: string,
    profile: PatientProfile,
    isHealthWorker: boolean,
    hasCompletePatientDetails: boolean,
    hasBloodPressureAnswer: boolean,
    isFemale: boolean,
    isReportedByAnother: boolean,
    isSameHousehold: boolean,
}

const initPatientState = {
    profile: {
        name: "Bob",
        avatarName: "profile1",
        isReportedByAnother: false,
        isSameHousehold: false,
    },
    isHealthWorker: false,
    hasCompletePatientDetails: true,
    hasBloodPressureAnswer: true,
    isFemale: false,
} as Partial<PatientStateType>;

export const getInitialPatientState = (patientId: string) : PatientStateType => {
    return {
        ...initPatientState,
        patientId
    } as PatientStateType;
}