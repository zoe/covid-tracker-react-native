import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { action } from '@storybook/addon-actions';

import { RootState } from '../../root';
import { IApp } from '../types';

// NOTE
// THIS REDUCER IS BLACK LISTED AND RESET ON EVERY SESSION
// SET SESSION VALUES HERE

const initialState: IApp = {
  dashboardHasBeenViewed: false,
  mentalHealthStudyActive: true,
};

const appSlice = createSlice({
  name: 'App',
  initialState,
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
    reset: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setDashboardHasBeenViewed, setMentalHealthStudyActive, reset } = appSlice.actions;
export const selectApp = (state: RootState) => state.app;
export default appSlice.reducer;
