import UserService, {isUSLocale} from "../core/user/UserService";
import {ConfigType} from "../core/Config"
import { ScreenParamList } from "./ScreenParamList";
import { PatientStateType } from "../core/patient/PatientState";
import { StackNavigationProp } from "@react-navigation/stack";

type ScreenName = keyof ScreenParamList;

// Various route parameters
type PatientIdParamType = { patientId: string }
type CurrentPatientParamType = { currentPatient: PatientStateType }
type RouteParamsType = PatientIdParamType | CurrentPatientParamType;

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

class Navigator {
    navigation: NavigationType;
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    setNavigation(navigation: NavigationType) {
        this.navigation = navigation;
    }

    // Workaround for Expo save/refresh nixing the navigation.
    resetNavigation(navigation: NavigationType) {
        if (!this.navigation) {
            console.log("[ROUTE] Resetting navgation");
        }
        this.navigation = this.navigation || navigation;
    }

    getNavigation(): NavigationType {
        return this.navigation;
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

    async gotoStartReport(patientId: string) {
        const config = await this.getConfig();
        if (config.enablePersonalInformation) {
            navigator.gotoScreen("SelectProfile", {patientId});
        } else {
            const currentPatient = await this.getCurrentPatient(patientId);
            this.gotoStartPatient(currentPatient);
        }
    }

    gotoNextScreen(screenName: ScreenName, params: RouteParamsType) {
        if (ScreenFlow[screenName]) {
            ScreenFlow[screenName](params);
        } else {
            console.log("[ROUTE] no next route found for:", screenName);
        }
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


const ScreenFlow: any = {
    Register: async (routeParams: PatientIdParamType) => {
        const {patientId} = routeParams;
        const config = await navigator.getConfig();

        if (config.enablePersonalInformation) {
            navigator.gotoScreen("OptionalInfo", {patientId});
        } else if (patientId) {
            const currentPatient = await navigator.getCurrentPatient(patientId);
            navigator.gotoStartPatient(currentPatient);
        } else {
            // TODO: Warn: missing parameter -- critical error. DO NOT FAIL SILENTLY
            console.error("[ROUTE] Missing patientId parameter for gotoNextPage(Register)");
        }
    },
    WelcomeRepeat: async (routeParams: PatientIdParamType) => {
        navigator.gotoStartReport(routeParams.patientId);
    },
    WelcomeRepeatUS: async (routeParams: PatientIdParamType) => {
        navigator.gotoStartReport(routeParams.patientId);
    }
}

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
