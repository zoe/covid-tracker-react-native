import { PatientStateType } from '../core/patient/PatientState';
import { CovidTest } from '../core/user/dto/CovidTestContracts';
import { UserResponse } from '../core/user/dto/UserAPIContracts';

export enum ConsentType {
  Adult = 'adult',
  Child = 'child',
}

export type ScreenParamList = {
  Splash: undefined;

  // Welcome screens
  Welcome: undefined;
  Welcome2: undefined;
  WelcomeRepeat: { patientId: string };

  // Terms & consent screens
  Consent: { viewOnly: boolean };
  PrivacyPolicyUK: { viewOnly: boolean };
  BeforeWeStartUS: undefined;
  NursesConsentUS: { viewOnly: boolean };
  TermsOfUseUS: { viewOnly: boolean };
  PrivacyPolicyUS: { viewOnly: boolean };
  PrivacyPolicySV: { viewOnly: boolean };

  // User profile screens
  ResetPassword: undefined;
  ResetPasswordConfirm: undefined;
  Register: undefined;
  Login: { terms: string };
  CountrySelect: { patientId: string | null };
  ProfileBackDate: { currentPatient: PatientStateType };

  // PII screens
  OptionalInfo: { patientId: string };

  // Profile screens
  ReportForOther: undefined;
  SelectProfile: undefined;
  CreateProfile: { avatarName: string };
  AdultOrChild: { profileName: string; avatarName?: string };
  ConsentForOther: { profileName: string; avatarName?: string; consentType: ConsentType };

  // Patient screens
  StartPatient: { currentPatient: PatientStateType };
  YourStudy: { currentPatient: PatientStateType };
  YourWork: { currentPatient: PatientStateType };
  AboutYou: { currentPatient: PatientStateType };
  YourHealth: { currentPatient: PatientStateType };
  PreviousExposure: { currentPatient: PatientStateType };

  // Assessment screens
  HealthWorkerExposure: { currentPatient: PatientStateType; assessmentId: string | null };
  CovidTest: { currentPatient: PatientStateType; assessmentId: string | null; tests?: CovidTest[] };
  CovidTestDetail: { currentPatient: PatientStateType; test?: CovidTest };
  HowYouFeel: { currentPatient: PatientStateType; assessmentId: string };
  DescribeSymptoms: { currentPatient: PatientStateType; assessmentId: string };
  WhereAreYou: { currentPatient: PatientStateType; assessmentId: string };
  LevelOfIsolation: { currentPatient: PatientStateType; assessmentId: string | null };
  TreatmentSelection: { currentPatient: PatientStateType; assessmentId: string; location?: string };
  TreatmentOther: { currentPatient: PatientStateType; assessmentId: string; location?: string };

  // Completion screens
  ThankYou: undefined;
  ViralThankYou: undefined;
};
