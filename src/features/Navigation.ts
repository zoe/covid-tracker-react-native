import UserService, {isUSCountry} from "../core/user/UserService";

export async function navigateAfterFinishingAssessment(navigation: any) {
    const userService = new UserService();

    if (await userService.hasMultipleProfiles()) {
        navigation.replace(getLocalThankYou());
    } else {
        if (await userService.shouldAskToReportForOthers()) {
            navigation.replace('ReportForOther')
        } else {
            navigation.replace(getLocalThankYou());
        }
    }
}

export function getLocalThankYou() {
    return isUSCountry() ? 'ViralThankYou' : 'ThankYou';
}
