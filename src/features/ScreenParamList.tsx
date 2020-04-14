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
    WelcomeRepeat: { patientId: string };
    WelcomeRepeatUS: { patientId: string };

    // Terms & consent screens
    Consent: { viewOnly: boolean };
    NursesConsentUS: { viewOnly: boolean };
    BeforeWeStartUS: undefined;
    TermsOfUse: { viewOnly: boolean };
    PrivacyPolicyUK: { viewOnly: boolean };
    PrivacyPolicyUS: { viewOnly: boolean };

    // User profile screens
    ResetPassword: undefined;
    ResetPasswordConfirm: undefined;
    Register: undefined;
    Login: { terms: string };
    CountrySelect: { patientId: string | null };

    // PII screens
    OptionalInfo: { user: UserResponse };

    // Profile screens
    ReportForOther: undefined;
    SelectProfile: undefined;
    CreateProfile: undefined;
    AdultOrChild: { profileName: string, avatarName?: string };
    ConsentForOther: { profileName: string, avatarName?: string, consentType: ConsentType};

    // Patient screens
    YourStudy: { currentPatient: PatientStateType };
    YourWork: { currentPatient: PatientStateType };
    AboutYou: { currentPatient: PatientStateType };
    YourHealth: { currentPatient: PatientStateType };

    // Assessment screens
    StartAssessment: { currentPatient: PatientStateType, assessmentId?: string };
    HealthWorkerExposure: { currentPatient: PatientStateType, assessmentId: string | null };
    CovidTest: { currentPatient: PatientStateType, assessmentId: string | null };
    HowYouFeel: { currentPatient: PatientStateType, assessmentId: string };
    DescribeSymptoms: { currentPatient: PatientStateType, assessmentId: string };
    WhereAreYou: { currentPatient: PatientStateType, assessmentId: string };
    LevelOfIsolation: { currentPatient: PatientStateType, assessmentId: string };
    TreatmentSelection:  { currentPatient: PatientStateType, assessmentId: string, location?: string };
    TreatmentOther: { currentPatient: PatientStateType, assessmentId: string, location?: string };

    // Completion screens
    ThankYou: undefined;
    ViralThankYou: undefined;
    NearYou: undefined;
};
