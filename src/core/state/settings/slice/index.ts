import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../root';
import { ISettings } from '../types';

const initialState: ISettings = {
  hasEmailSubscription: false,
};

const settingsSlice = createSlice({
  name: 'Settings',
  initialState,
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
export const selectSettingsState = (state: RootState) => state.settings;
export default settingsSlice.reducer;
