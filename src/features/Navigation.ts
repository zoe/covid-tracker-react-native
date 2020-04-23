import UserService, {isUSLocale} from "../core/user/UserService";
import {ConfigType} from "../core/Config"
import { ScreenParamList } from "./ScreenParamList";
import { PatientStateType } from "../core/patient/PatientState";
import { StackNavigationProp } from "@react-navigation/stack";
import { PartialState, NavigationState } from "@react-navigation/native";

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

    async getConfig(): Promise<ConfigType> {
        return await this.userService.getConfig();
    }

    async getCurrentPatient(patientId: string): Promise<PatientStateType> {
        return await this.userService.getCurrentPatient(patientId);
    }

    getThankYouScreenName() {
        return isUSLocale() ? 'ViralThankYou' : 'ThankYou';
    }

    getWelcomeScreenName() {
        return isUSLocale() ? 'WelcomeUS' : 'Welcome'
    }

    getWelcomeRepeatScreenName() {
        return isUSLocale() ? 'WelcomeRepeatUS' : 'WelcomeRepeat';
    }

    async getStartPatientScreenName(currentPatient: PatientStateType) {
        const config = await this.getConfig();
        const shouldAskStudy = (config.enableCohorts && currentPatient.shouldAskStudy);
        const page =  shouldAskStudy ? "YourStudy" : "YourWork";
        return page;
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

    async gotoStartPatient(currentPatient: PatientStateType) {
        const nextPage = await this.getStartPatientScreenName(currentPatient);
        this.gotoScreen(nextPage, {currentPatient});
    }

    async gotoEndAssessment() {
        const config = await this.getConfig();
        const shouldShowReportForOthers = (
            config.enableMultiplePatients
            && !await this.userService.hasMultipleProfiles()
            && await this.userService.shouldAskToReportForOthers()
        )

        if (shouldShowReportForOthers) {
            this.gotoScreen('ReportForOther')
        } else {
            this.gotoScreen(this.getThankYouScreenName());
        }
    }

    async gotoNextScreen(screenName: ScreenName, params: RouteParamsType) {
        if (ScreenFlow[screenName]) {
            ScreenFlow[screenName](params);
        } else {
            // We don't have nextScreen logic for this page. Explain loudly.
            console.error("[ROUTE] no next route found for:", screenName);
        }
    }

    async gotoScreen(screenName: ScreenName, params: RouteParamsType | undefined = undefined) {
        this.navigation.navigate(screenName, params);
    }

    async replaceScreen(screenName: ScreenName, params: RouteParamsType | undefined = undefined) {
        this.navigation.replace(screenName, params);
    }

    async resetAndGo(navStack: PartialState<NavigationState>) {
        this.navigation.reset(navStack);
    }
}

const navigator = new Navigator();


const ScreenFlow: any = {
    // End of registration flows
    Register: async (routeParams: PatientIdParamType) => {
        const {patientId} = routeParams;
        const config = await navigator.getConfig();

        if (config.enablePersonalInformation) {
            await navigator.gotoScreen("OptionalInfo", {patientId});
        } else if (patientId) {
            const currentPatient = await navigator.getCurrentPatient(patientId);
            await navigator.gotoStartPatient(currentPatient);
        } else {
            // TODO: Warn: missing parameter -- critical error. DO NOT FAIL SILENTLY
            console.error("[ROUTE] Missing patientId parameter for gotoNextPage(Register)");
        }
    },

    // Start of reporting flow
    WelcomeRepeat: async (routeParams: PatientIdParamType) => {
        await navigator.gotoStartReport(routeParams.patientId);
    },
    WelcomeRepeatUS: async (routeParams: PatientIdParamType) => {
        await navigator.gotoStartReport(routeParams.patientId);
    },

    // Start of Patient flow
    OptionalInfo: async (routeParams: CurrentPatientParamType) => {
        const currentPatient = routeParams.currentPatient;
        const patientId = currentPatient.patientId;
        const startPage = navigator.getWelcomeRepeatScreenName();
        const nextPage = await navigator.getStartPatientScreenName(currentPatient);

        // OptionalInfo nav-stack cleanup.
        navigator.resetAndGo({
            index: 0,
            routes: [
                {name: startPage, params: {patientId}},
                {name: nextPage, params: {currentPatient}}
            ],
        })
    },

    // End of Assessment flows
    HowYouFeel: async() => {
        await navigator.gotoEndAssessment()
    },
    TreatmentOther: async() => {
        await navigator.gotoEndAssessment()
    },
    TreatmentSelection: async() => {
        await navigator.gotoEndAssessment()
    },
    WhereAreYou: async() => {
        await navigator.gotoEndAssessment()
    },

}

export default navigator;
