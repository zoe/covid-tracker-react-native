import { RootState } from '../store';

// Amend the value you would like to extract from the settings state as needed
// eg. useSettingsCheck = (state: RootState) => state.settings.check;
export const useSettingsState = (state: RootState) => state.settings;
