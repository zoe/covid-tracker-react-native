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


    // PII
    OptionalInfo: { user: UserResponse };

    // Patient
    // TODO: add YourStudy here when it's merged into master.
    YourWork: { patientId: string, currentPatient: PatientStateType };
    AboutYou: { patientId: string, currentPatient: PatientStateType };
    YourHealth: { patientId: string, isMale: boolean, currentPatient: PatientStateType};

    // Assessment
    HealthWorkerExposure: { patientId: string }; // How do people normally get here?
    CovidTest: { patientId: string, assessmentId: string | null};
    HowYouFeel: { assessmentId: string };
    DescribeSymptoms: { assessmentId: string };
    WhereAreYou: { assessmentId: string };
    LevelOfIsolation: { assessmentId: string };
    TreatmentSelection:  { assessmentId: string, location?: string };
    TreatmentOther: { assessmentId: string, location?: string };

    ThankYou: undefined;
    Login: { terms: string };
    CountrySelect: { patientId: string | null };
    NearYou: undefined;
};
