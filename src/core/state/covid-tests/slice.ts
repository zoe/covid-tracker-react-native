import {
  TStateCovidTests,
  TUpdateCurrentPatientLoggedTodayAction,
  TUpdateDateLFTPromptAction,
} from '@covid/core/state/covid-tests/types';
import { TRootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateCovidTests: TStateCovidTests = { lftPrompt: {} };

const covidTestsSlice = createSlice({
  initialState: initialStateCovidTests,
  name: 'CovidTests',
  reducers: {
    incrementTimesSeenLFTPrompt: (state, action: PayloadAction<string>) => {
      state.lftPrompt[action.payload].timesSeenLFTPrompt += 1;
    },
    populatePatientLFTState: (state, action: PayloadAction<string>) => {
      state.lftPrompt[action.payload] = {
        currentPatientLoggedToday: false,
        timesSeenLFTPrompt: 0,
      };
    },
    resetCovidTestsState: (state) => {
      state.lftPrompt = {};
    },
    updateCurrentPatientLoggedToday: (state, action: PayloadAction<TUpdateCurrentPatientLoggedTodayAction>) => {
      state.lftPrompt[action.payload.patientId].currentPatientLoggedToday = action.payload.currentPatientLoggedToday;
    },
    updateDateLastSeenLFTPrompt: (state, action: PayloadAction<TUpdateDateLFTPromptAction>) => {
      state.lftPrompt[action.payload.patientId].dateLastSeenLFTPrompt = action.payload.dateLastSeenLFTPrompt;
    },
  },
});

export const {
  incrementTimesSeenLFTPrompt,
  populatePatientLFTState,
  resetCovidTestsState,
  updateCurrentPatientLoggedToday,
  updateDateLastSeenLFTPrompt,
} = covidTestsSlice.actions;
export const selectCovidTestsState = (state: TRootState) => state.covidTests;
export default covidTestsSlice;
