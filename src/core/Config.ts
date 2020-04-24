import DefaultConfig from './config/default.json';
import GBConfig from './config/GB.json';
import USConfig from './config/US.json';
import SEConfig from './config/SE.json';

export type ConfigType = {
    country: string,
    enableMultiplePatients: boolean,        // Enables select/create profile feature
    enablePersonalInformation: boolean,     // Enables Personal Information screen
    enableCohorts: boolean,                 // Enables cohort/YourStudy screen

    showEthnicityQuestion: boolean,         // Shows ethnicity question
    showRaceQuestion: boolean,              // Shows race question
}

const configs = new Map<string, ConfigType>([
    ["GB", {...DefaultConfig, ...GBConfig} as ConfigType],
    ['SE', {...DefaultConfig, ...SEConfig} as ConfigType],
    ['US', {...DefaultConfig, ...USConfig} as ConfigType]
]);


let countryCode = 'GB';
let config = configs.get(countryCode);

export const getCountryConfig = (countryCode: string): ConfigType => {
    return configs.get(countryCode) || (DefaultConfig as ConfigType);
}

export const setConfigCountry = (country: string) => {
    if (country && configs.has(country)) {
        config = configs.get(country);
        countryCode = country;
    }
}

export const getConfig = () => {
    return config;
}

// export default config;
// export default getConfig();