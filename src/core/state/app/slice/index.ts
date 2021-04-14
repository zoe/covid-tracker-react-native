import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../root';
import { IApp } from '../types';

// NOTE
// THIS REDUCER IS BLACK LISTED AND RESET ON EVERY SESSION
// SET SESSION VALUES HERE

export const appInitialState: IApp = {
  dashboardHasBeenViewed: false,
  mentalHealthStudyActive: true,
  loggedVaccine: false,
};

const appSlice = createSlice({
  name: 'App',
  initialState: appInitialState,
  reducers: {
    setDashboardHasBeenViewed: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        dashboardHasBeenViewed: action.payload,
      };
    },
    setMentalHealthStudyActive: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        mentalHealthStudyActive: action.payload,
      };
    },
    setLoggedVaccine: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loggedVaccine: action.payload,
      };
    },
    reset: (state) => {
      return {
        ...appInitialState,
      };
    },
  },
});

export const { setDashboardHasBeenViewed, setMentalHealthStudyActive, reset, setLoggedVaccine } = appSlice.actions;
export const selectApp = (state: RootState) => state.app;
export default appSlice.reducer;
