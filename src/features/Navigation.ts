import {isUSLocale} from "../core/user/UserService";

export function getThankYouScreen() {
    return isUSLocale() ? 'ViralThankYou' : 'ThankYou';
}
