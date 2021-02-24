import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../root';
import { ISettings, TFeature } from '../types';

const initialState: ISettings = {
  currentFeature: 'UK_DIET_STUDY',
  featureRunDate: undefined,
  hasEmailSubscription: false,
};

const settingsSlice = createSlice({
  name: 'Settings',
  initialState,
  reducers: {
    setCurrentFeature: (state, action: PayloadAction<TFeature>) => {
      return {
        ...state,
        currentFeature: action.payload,
      };
    },
    setFeatureRunDate: (state, action: PayloadAction<Date>) => {
      return {
        ...state,
        featureRunDate: action.payload,
      };
    },
    setHasEmailSubscription: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasEmailSubscription: action.payload,
      };
    },
  },
});

export const { setCurrentFeature, setFeatureRunDate, setHasEmailSubscription } = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;
export default settingsSlice.reducer;
