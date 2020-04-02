export type Health = {
    userId: string;
    createDate: string; // Serialise date as ISO8601

    // Health Yes/No options
    hasHeartDisease: boolean;
    hasDiabetes: boolean;
    hasLungDisease: boolean;
    isSmoker: boolean;
    needOutsideHelp: boolean;
    needInsideHelp: boolean;

    // Measurements
};


export type Symptoms = {
    userId: string;
    createDate: string; // Serialise date as ISO8601

}
