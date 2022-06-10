/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SettingsState } from './types';

export const initialState: SettingsState = {
  hasEmailSubscription: false,
};

export const settingsSlice = createSlice({
  name: 'Settings',
  initialState,
  reducers: {
    reset: () => initialState,
    setHasEmailSubscription: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasEmailSubscription: action.payload,
      };
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
