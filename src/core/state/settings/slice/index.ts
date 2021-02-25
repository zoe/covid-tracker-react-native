import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import ApiClient from '@covid/core/api/ApiClient';

import { RootState } from '../../root';
import { ISettings, TFeature } from '../types';

const initialState: ISettings = {
  currentFeature: 'UK_DIET_STUDY',
  featureRunDate: undefined,
  hasEmailSubscription: false,
};

const apiClient = new ApiClient();

export const setEmailSubscription = createAsyncThunk('/users/email_preference/', async (preference) => {
  console.log('set email subscription');
  const response = await apiClient.patch('/users/email_preference/', { nutrition_newsletter: preference });
  console.log('res: ', response);
  return response.data;
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
  extraReducers: {
    [setEmailSubscription.fulfilled]: (state, action) => {
      state.hasEmailSubscription = action.payload;
    },
  },
});

export const { setCurrentFeature, setFeatureRunDate, setHasEmailSubscription } = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;
export default settingsSlice.reducer;
