import {UserResponse} from "../core/user/dto/UserAPIContracts";
import { PatientStateType } from "../core/patient/PatientState";

export type ScreenParamList = {
    Splash: undefined;
    Welcome: undefined;
    WelcomeUS: undefined;
    Welcome2US: undefined;
    WelcomeRepeat: { patientId: string};
    WelcomeRepeatUS: { patientId: string};
    Terms: undefined;
    NursesConsentUS: undefined;
    BeforeWeStartUS: undefined;
    TermsOfUse: undefined;
    PrivacyPolicyUK: undefined;
    PrivacyPolicyUS: undefined;
    ResetPassword: undefined;
    ResetPasswordConfirm: undefined;
    Register: undefined;

    // PII screens
    OptionalInfo: { user: UserResponse };

    // Patient screens
    YourStudy: { currentPatient: PatientStateType };
    YourWork: { currentPatient: PatientStateType };
    AboutYou: { currentPatient: PatientStateType };
    YourHealth: { currentPatient: PatientStateType, isMale: boolean };

    // Assessment screens
    HealthWorkerExposure: { patientId: string }; // How do people normally get here?
    CovidTest: { patientId: string, assessmentId: string | null};
    HowYouFeel: { assessmentId: string };
    DescribeSymptoms: { assessmentId: string };
    WhereAreYou: { assessmentId: string };
    LevelOfIsolation: { assessmentId: string };
    TreatmentSelection:  { assessmentId: string, location?: string };
    TreatmentOther: { assessmentId: string, location?: string };

    ThankYou: undefined;
    ViralThankYou: undefined;
    Login: { terms: string };
    CountrySelect: { patientId: string | null };
    NearYou: undefined;
};
