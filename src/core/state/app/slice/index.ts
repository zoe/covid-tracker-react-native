import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../root';
import { IApp } from '../types';

// NOTE
// THIS REDUCER IS BLACK LISTED AND RESET ON EVERY SESSION
// SET SESSION VALUES HERE

export const appInitialState: IApp = {
  dashboardHasBeenViewed: false,
  loggedVaccine: false,
  mentalHealthStudyActive: true,
};

const appSlice = createSlice({
  initialState: appInitialState,
  name: 'App',
  reducers: {
    reset: (state) => {
      return {
        ...appInitialState,
      };
    },
    setDashboardHasBeenViewed: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        dashboardHasBeenViewed: action.payload,
      };
    },
    setLoggedVaccine: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loggedVaccine: action.payload,
      };
    },
    setMentalHealthStudyActive: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        mentalHealthStudyActive: action.payload,
      };
    },
  },
});

export const { setDashboardHasBeenViewed, setMentalHealthStudyActive, reset, setLoggedVaccine } = appSlice.actions;
export const selectApp = (state: RootState) => state.app;
export default appSlice.reducer;
