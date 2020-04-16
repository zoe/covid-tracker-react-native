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
    shouldAskLevelOfIsolation: boolean,
}

const initPatientState = {
    profile: {
        name: "Bob",
        avatarName: "profile1",
    },
    isHealthWorker: false,
    hasCompletePatientDetails: true,
    hasBloodPressureAnswer: true,
    isFemale: false,
    isReportedByAnother: false,
    isSameHousehold: false,
} as Partial<PatientStateType>;

export const getInitialPatientState = (patientId: string) : PatientStateType => {
    return {
        ...initPatientState,
        patientId
    } as PatientStateType;
}