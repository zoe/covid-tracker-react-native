import {createAction} from 'typesafe-actions';
import {Health, Symptoms} from "./types";

export const healthFetched = createAction('Health_HealthFetched')<Health>();
export const symptomsFetched = createAction('Health_SymptomsFetched')<Symptoms>();
