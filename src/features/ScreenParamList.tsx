import {UserResponse} from "../core/user/dto/UserAPIContracts";
import { PatientStateType } from "../core/patient/PatientState";

export enum ConsentType {
    Adult = "adult",
    Child = "child"
}

export type ScreenParamList = {
    Splash: undefined;

    // Welcome screens
    Welcome: undefined;
    WelcomeUS: undefined;
    Welcome2US: undefined;
    WelcomeRepeat: { patientId: string};
    WelcomeRepeatUS: { patientId: string};

    // Terms & consent screens
    Terms: undefined;
    NursesConsentUS: undefined;
    BeforeWeStartUS: undefined;
    TermsOfUse: undefined;
    PrivacyPolicyUK: undefined;
    PrivacyPolicyUS: undefined;

    // User profile screens
    ResetPassword: undefined;
    ResetPasswordConfirm: undefined;
    Register: undefined;
    Login: { terms: string };
    CountrySelect: { patientId: string | null };

    // PII screens
    OptionalInfo: { user: UserResponse };

    // Patient screens
    YourStudy: { currentPatient: PatientStateType };
    YourWork: { currentPatient: PatientStateType };
    AboutYou: { currentPatient: PatientStateType };
    YourHealth: { currentPatient: PatientStateType };

    // Assessment screens
    HealthWorkerExposure: { currentPatient: PatientStateType }; // How do people normally get here?
    CovidTest: { currentPatient: PatientStateType, assessmentId: string | null};
    HowYouFeel: { currentPatient: PatientStateType, assessmentId: string };
    DescribeSymptoms: { currentPatient: PatientStateType, assessmentId: string };
    WhereAreYou: { currentPatient: PatientStateType, assessmentId: string };
    LevelOfIsolation: { currentPatient: PatientStateType, assessmentId: string };
    TreatmentSelection:  { currentPatient: PatientStateType, assessmentId: string, location?: string };
    TreatmentOther: { currentPatient: PatientStateType, assessmentId: string, location?: string };

    // Multi patient screens
    ConsentForOther: { profileName: string, avatarName?: string, consentType: ConsentType},
    AdultOrChild: { profileName: string, avatarName?: string };
    CreateProfile: {avatarName?: string };
    ReportForOther: undefined;
    SelectProfile: undefined;

    // Completion screens
    ThankYou: undefined;
    ViralThankYou: undefined;
    NearYou: undefined;
};
