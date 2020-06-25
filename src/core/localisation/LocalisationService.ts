import { injectable } from "inversify";
import * as Localization from 'expo-localization';
import i18n from '@covid/locale/i18n';
import { AsyncStorageService } from '../AsyncStorageService';
import { ConfigType, getCountryConfig } from "../Config";

export interface ILocalisationService {
    initCountryConfig(countryCode: string): void;
    setUserCountry(countryCode: string): void;
    getUserCountry(): Promise<string | null>;
    updateUserCountry(isLoggedIn: boolean): Promise<void>;
    setLocaleFromCountry(countryCode: string): void;
    defaultCountryFromLocale(): void;
    shouldAskCountryConfirmation(): Promise<boolean>;
}

@injectable()
export class LocalisationService implements Partial<ILocalisationService> {

    public static userCountry = 'US';
    public static countryConfig: ConfigType;
    public static ipCountry = '';

    initCountryConfig(countryCode: string) {
        LocalisationService.countryConfig = getCountryConfig(countryCode);
    }

    async setUserCountry(countryCode: string) {
        LocalisationService.userCountry = countryCode;
        this.setLocaleFromCountry(countryCode);
        this.initCountryConfig(countryCode);
        await AsyncStorageService.setUserCountry(countryCode);
    }

    async getUserCountry() {
        const country = await AsyncStorageService.getUserCountry();
        if (country) {
            LocalisationService.userCountry = country;
            this.setLocaleFromCountry(country);
        }
        return country;
    }

    setLocaleFromCountry(countryCode: string) {
        let USLocale = 'en';
        if (Localization.locale === 'es-US') {
            USLocale = 'es';
        }

        const localeMap: { [key: string]: string } = {
            US: USLocale,
            GB: 'en',
            SE: 'sv',
        };

        i18n.locale = localeMap[countryCode] + '-' + LocalisationService.userCountry;
    }

    async updateUserCountry(isLoggedIn: boolean) {
        const country: string | null = await this.getUserCountry();
        this.initCountryConfig(country ?? 'GB');
        if (isLoggedIn) {
            // If logged in with no country default to GB as this will handle all
            // GB users before selector was included.
            if (country === null) {
                await this.setUserCountry('GB');
            }
        } else {
            await this.defaultCountryFromLocale();
        }
    }

    async defaultCountryFromLocale() {
        const country = () => {
            if (Localization.locale === 'en-GB') {
                return 'GB';
            } else if (Localization.locale === 'sv-SE') {
                return 'SE';
            } else {
                return 'US';
            }
        };

        await this.setUserCountry(country());
    }

    async shouldAskCountryConfirmation() {
        if (await AsyncStorageService.getAskedCountryConfirmation()) {
            return false;
        } else {
            return LocalisationService.userCountry !== LocalisationService.ipCountry;
        }
    }

    static getLocale() {
        return i18n.locale.split('-')[0];
    }
}