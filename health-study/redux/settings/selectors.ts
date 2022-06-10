import { RootState } from '../store';

export const useSettingsState = (state: RootState) => state.settings;
export const useEmailSubscriptionSetting = (state: RootState) => state.settings.hasEmailSubscription;
