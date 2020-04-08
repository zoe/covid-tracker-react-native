

export type PatientStateType = {
    patientId: string,
    isHealthWorker: boolean,
    hasCompletePatientDetails: boolean,
    hasBloodPressureAnswer: boolean,
    isFemale: boolean,
}

const initPatientState = {
    isHealthWorker: false,
    hasCompletePatientDetails: false,
    hasBloodPressureAnswer: false,
    isFemale: false,
} as Partial<PatientStateType>;

export const getInitialPatientState = (patientId: string) : PatientStateType => {
    return {
        ...initPatientState,
        patientId
    } as PatientStateType;
}