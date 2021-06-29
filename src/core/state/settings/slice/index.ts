import ApiClient from '@covid/core/api/ApiClient';
import { RootState } from '@covid/core/state/root';
import { ISettings } from '@covid/core/state/settings/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateSettings: ISettings = {
  hasEmailSubscription: false,
};

const apiClient = new ApiClient();

type TSubscriptionResponse = {
  nutrition_newsletter: boolean;
};

export const setEmailSubscription = createAsyncThunk('/users/email_preference/', async (preference: boolean) => {
  return apiClient.patch('/users/email_preference/', { nutrition_newsletter: preference });
});

const settingsSlice = createSlice({
  extraReducers: {
    [setEmailSubscription.fulfilled]: (state, action: PayloadAction<TSubscriptionResponse>) => {
      state.hasEmailSubscription = action.payload.nutrition_newsletter;
    },
  },
  initialState: initialStateSettings,
  name: 'Settings',
  reducers: {
    setHasEmailSubscription: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasEmailSubscription: action.payload,
      };
    },
  },
});

export const { setHasEmailSubscription } = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;
export default settingsSlice.reducer;
