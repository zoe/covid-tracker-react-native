import UserService, {isUSLocale} from "../core/user/UserService";

export async function navigateAfterFinishingAssessment(navigation: any) {
    const userService = new UserService();

    if (await userService.hasMultipleProfiles()) {
        navigation.replace(getLocalThankYou());
    } else {
        if (await userService.showReportForOthersScreen()) {
            navigation.replace('ReportForOther')
        } else {
            navigation.replace(getLocalThankYou());
        }
        navigation.replace('ReportForOther')
    }
}

export function getLocalThankYou() {
    return isUSLocale() ? 'ViralThankYou' : 'ThankYou';
}
