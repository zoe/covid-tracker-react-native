import GBConfig from './config/GB.json';
import SEConfig from './config/SE.json';
import USConfig from './config/US.json';
import DefaultConfig from './config/default.json';

export type ConfigType = {
  country: string;
  showPartnerLogos: boolean;
  enableMultiplePatients: boolean;
  enablePersonalInformation: boolean;
  enableCohorts: boolean;

  showEthnicityQuestion: boolean;
  showRaceQuestion: boolean;
  showPregnancyQuestion: boolean;

  defaultHeightUnit: string;
  defaultWeightUnit: string;
  defaultTemperatureUnit: string;
  thousandSeparator: string;
};

const configs = new Map<string, ConfigType>([
  ['GB', { ...DefaultConfig, ...GBConfig } as ConfigType],
  ['SE', { ...DefaultConfig, ...SEConfig } as ConfigType],
  ['US', { ...DefaultConfig, ...USConfig } as ConfigType],
]);

let countryCode = 'GB';
let config = configs.get(countryCode);

export const getCountryConfig = (countryCode: string): ConfigType => {
  return configs.get(countryCode) ?? (DefaultConfig as ConfigType);
};

export const setConfigCountry = (country: string) => {
  if (country && configs.has(country)) {
    config = configs.get(country);
    countryCode = country;
  }
};

export const getConfig = () => {
  return config;
};

// export default config;
// export default getConfig();
