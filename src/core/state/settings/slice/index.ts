import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from '@covid/core/api/ApiClient';

import { RootState } from '../../root';
import { ISettings, TFeature } from '../types';

const initialState: ISettings = {
  currentFeature: 'UK_DIET_STUDY',
  featureRunDate: undefined,
  hasEmailSubscription: false,
};

const apiClient = new ApiClient();

type TSubscriptionResponse = {
  nutrition_newsletter: boolean;
};

export const setEmailSubscription = createAsyncThunk('/users/email_preference/', async (preference: boolean) => {
  const response = await apiClient.patch('/users/email_preference/', { nutrition_newsletter: preference });
  return response;
});

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
    setFeatureRunDate: (state, action: PayloadAction<string>) => {
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
  extraReducers: {
    [setEmailSubscription.fulfilled]: (state, action: PayloadAction<TSubscriptionResponse>) => {
      console.log('action payload: ', action.payload);
      state.hasEmailSubscription = action.payload.nutrition_newsletter;
    },
  },
});

export const { setCurrentFeature, setFeatureRunDate, setHasEmailSubscription } = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;
export default settingsSlice.reducer;
