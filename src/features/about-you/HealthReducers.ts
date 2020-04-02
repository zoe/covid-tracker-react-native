// TODO: Make reducer names consistent
import {createReducer} from "typesafe-actions";
import produce from "immer"

import {Health, Symptoms} from "./types";
import {HealthState} from "./HealthState";
import {healthFetched, symptomsFetched} from "./HealthEvents";

import {enableMapSet, enableES5} from 'immer';
enableMapSet();
enableES5();


const initialState: HealthState = {
    healthById: new Map<string, Health>(),
    symptomsById: new Map<string, Symptoms>(),
};


const reducer = createReducer(initialState);
const healthReducer = reducer
    .handleAction(healthFetched, (state, action) => {
        return produce(state, (draftState: HealthState) => {
            const health = action.payload;
            draftState.healthById.set(health.userId, health);
        });
    })
    .handleAction(symptomsFetched, (state, action) => {
        return produce(state, (draftState: HealthState) => {
            const symptoms = action.payload;
            draftState.symptomsById.set(symptoms.userId, symptoms);
        });
    });

export default healthReducer;
// export type FoodDatabaseState = ReturnType<typeof foodReducer>;
