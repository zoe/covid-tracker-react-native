import UserService, {isUSLocale} from "../core/user/UserService";
import {ConfigType} from "../core/Config"
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenParamList } from "./ScreenParamList";
import { PatientStateType } from "../core/patient/PatientState";

type ScreenName = keyof ScreenParamList;

// Various route parameters
type PatientIdParamType = { patientId: string }
type CurrentPatientParamType = { currentPatient: PatientStateType }
type RouteParamsType = PatientIdParamType | CurrentPatientParamType;


class Navigator {
    navigation: StackNavigationProp<ScreenParamList>;
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    setNavigation(navigation: StackNavigationProp<ScreenParamList>) {
        this.navigation = navigation;
    }

    async getConfig(): Promise<ConfigType> {
        return await this.userService.getConfig();
    }

    async getCurrentPatient(patientId: string): Promise<PatientStateType> {
        return await this.userService.getCurrentPatient(patientId);
    }

    getWelcomeScreenName() {
        return isUSLocale() ? 'WelcomeUS' : 'Welcome'
    }
    getWelcomeRepeatScreenName() {
        return isUSLocale() ? 'WelcomeRepeatUS' : 'WelcomeRepeat';
    }

    gotoStartPatient(currentPatient: PatientStateType) {
        const patientId = currentPatient.patientId;
        const nextPage = currentPatient.shouldAskStudy ? "YourStudy" : "YourWork";

        this.navigation.reset({
            index: 0,
            routes: [
                {name: this.getWelcomeRepeatScreenName(), params: {patientId}},
                {name: nextPage, params: {currentPatient}}
            ],
        })
    }

    gotoNextScreen(screenName: ScreenName, params: RouteParamsType) {
        // TODO: insert magic here.
    }

    gotoScreen(screenName: ScreenName, params: RouteParamsType) {
        this.navigation.navigate(screenName, params);
    }

    replaceScreen(screenName: ScreenName, params: RouteParamsType | undefined = undefined) {
        this.navigation.replace(screenName, params);
    }
}

const navigator = new Navigator();
export default navigator;


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
    return isUSLocale() ? 'ViralThankYou' : 'ThankYou';
}
