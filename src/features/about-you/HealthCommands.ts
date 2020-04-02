import { Dispatch } from "redux";
import { healthFetched, symptomsFetched } from "./HealthEvents";

// import foodApiClient, {IFoodApiClient, FoodApiClient} from "./FoodApiClient";
import { RootAction } from "typesafe-actions";


export function fetchHealth(apiClient: IApiClient, userId: string) {
    return async (dispatch: Dispatch<RootAction>) => {
        const health = await apiClient.getHealthByUserId(userId);
        dispatch(healthFetched(health));
    };
}
export const fetchHealthCommand = (userId: string) => fetchHealth(apiClient, userId);


export function fetchSymptoms(apiClient: IApiClient, userId: string) {
    return async (dispatch: Dispatch<RootAction>) => {
        const symptoms = await apiClient.getSymptomsByUserId(userId);
        dispatch(symptomsFetched(symptoms));
    };
}
export const fetchSymptomsCommand = (userId: string) => fetchSymptoms(apiClient, userId);
