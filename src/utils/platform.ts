import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';

export const getPlatformStoreLink = isAndroid
  ? 'https://play.google.com/store/apps/details?id=com.joinzoe.covid_zoe'
  : 'https://apps.apple.com/gb/app/covid-symptom-tracker/id1503529611';

// Note these cannot be opened like HTTP, without LSApplicationQueriesSchemes
export const getPlatformStoreLinkDeep = isAndroid
  ? 'market://details?id=com.joinzoe.covid_zoe'
  : 'itms-apps://apps.apple.com/id/app/covid-symptom-study/id1503529611';
