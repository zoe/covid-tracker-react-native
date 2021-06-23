import {
  AboutYourVaccineScreen,
  AboutYouScreen,
  AdultOrChildScreen,
  ArchiveReasonScreen,
  BeforeWeStartUS,
  ConfirmSchoolScreen,
  ConsentForOtherScreen,
  ConsentScreen,
  CountrySelectScreen,
  CovidTestConfirmScreen,
  CovidTestDetailScreen,
  CovidTestListScreen,
  CreateProfileScreen,
  DashboardScreen,
  DashboardUSScreen,
  EditLocationScreen,
  EditProfileScreen,
  EstimatedCasesScreen,
  GeneralSymptomsScreen,
  GutStomachSymptomsScreen,
  HeadSymptomsScreen,
  HealthWorkerExposureScreen,
  HowYouFeelScreen,
  JoinHigherEducationScreen,
  JoinSchoolGroupScreen,
  JoinSchoolScreen,
  LoginScreen,
  LongCovidQuestionPageOneScreen,
  LongCovidStartScreen,
  NHSDetailsScreen,
  NHSIntroScreen,
  NHSTestDetailScreen,
  NursesConsentUSScreen,
  OptionalInfoScreen,
  OtherSymptomsScreen,
  PreviousExposureScreen,
  PrivacyPolicySVScreen,
  PrivacyPolicyUKScreen,
  PrivacyPolicyUSScreen,
  ProfileBackDateScreen,
  RegisterScreen,
  ResetPasswordConfirmScreen,
  ResetPasswordScreen,
  SchoolDashboardScreen,
  SchoolGroupListScreen,
  SchoolHowToScreen,
  SchoolIntroScreen,
  SelectProfileScreen,
  SplashScreen,
  TermsOfUseUSScreen,
  ThankYouSEScreen,
  ThankYouUKScreen,
  ThankYouUSScreen,
  ThroatChestSymptomsScreen,
  TreatmentOtherScreen,
  TreatmentSelectionScreen,
  TrendlineScreen,
  VaccineDoseSymptomsScreen,
  VaccineFindInfoScreen,
  VaccineListScreen,
  VaccineLogSymptomsInfoScreen,
  Welcome1Screen,
  Welcome2Screen,
  WelcomeRepeatScreen,
  WhereAreYouScreen,
  YourHealthScreen,
  YourStudyScreen,
  YourWorkScreen,
} from '@covid/features';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import AnniversaryNavigator from './AnniversaryNavigator';
import DietStudyPlaybackNavigator from './DietStudyPlaybackNavigator';
import MentalHealthNavigator from './MentalHealthNavigator';
import MentalHealthPlaybackNavigator from './MentalHealthPlaybackNavigator';

const Stack = createStackNavigator<ScreenParamList>();

const noHeader = {
  headerShown: false,
};

export default function MainNavigator() {
  const simpleHeader = {
    headerBackTitle: i18n.t('back'),
    headerShown: true,
    title: '',
  };

  return (
    <Stack.Navigator>
      <Stack.Screen component={SplashScreen} name="Splash" options={noHeader} />

      <Stack.Screen component={AboutYouScreen} name="AboutYou" options={noHeader} />
      <Stack.Screen component={AboutYourVaccineScreen} name="AboutYourVaccine" options={noHeader} />
      <Stack.Screen component={AdultOrChildScreen} name="AdultOrChild" options={noHeader} />
      <Stack.Screen component={ArchiveReasonScreen} name="ArchiveReason" options={noHeader} />
      <Stack.Screen component={BeforeWeStartUS} name="BeforeWeStartUS" options={noHeader} />
      <Stack.Screen component={ConfirmSchoolScreen} name="ConfirmSchool" options={noHeader} />
      <Stack.Screen component={ConsentScreen} name="Consent" options={simpleHeader} />
      <Stack.Screen component={ConsentForOtherScreen} name="ConsentForOther" options={noHeader} />
      <Stack.Screen component={CountrySelectScreen} name="CountrySelect" options={noHeader} />
      <Stack.Screen component={CovidTestConfirmScreen} name="CovidTestConfirm" options={noHeader} />
      <Stack.Screen component={CovidTestDetailScreen} name="CovidTestDetail" options={noHeader} />
      <Stack.Screen component={CovidTestListScreen} name="CovidTestList" options={noHeader} />
      <Stack.Screen component={CreateProfileScreen} name="CreateProfile" options={noHeader} />
      <Stack.Screen component={DashboardScreen} name="Dashboard" options={noHeader} />
      <Stack.Screen component={DashboardUSScreen} name="DashboardUS" options={noHeader} />
      <Stack.Screen component={EditLocationScreen} name="EditLocation" options={noHeader} />
      <Stack.Screen component={EditProfileScreen} name="EditProfile" options={noHeader} />
      <Stack.Screen component={EstimatedCasesScreen} name="EstimatedCases" options={noHeader} />
      <Stack.Screen component={GeneralSymptomsScreen} name="GeneralSymptoms" options={noHeader} />
      <Stack.Screen component={GutStomachSymptomsScreen} name="GutStomachSymptoms" options={noHeader} />
      <Stack.Screen component={HeadSymptomsScreen} name="HeadSymptoms" options={noHeader} />
      <Stack.Screen component={HealthWorkerExposureScreen} name="HealthWorkerExposure" options={noHeader} />
      <Stack.Screen component={HowYouFeelScreen} name="HowYouFeel" options={noHeader} />
      <Stack.Screen component={JoinHigherEducationScreen} name="JoinHigherEducation" options={noHeader} />
      <Stack.Screen component={JoinSchoolGroupScreen} name="JoinSchoolGroup" options={noHeader} />
      <Stack.Screen component={JoinSchoolScreen} name="JoinSchool" options={noHeader} />
      <Stack.Screen component={LoginScreen} name="Login" options={noHeader} />
      <Stack.Screen component={LongCovidQuestionPageOneScreen} name="LongCovidQuestionPageOne" options={noHeader} />
      <Stack.Screen component={LongCovidStartScreen} name="LongCovidStart" options={noHeader} />
      <Stack.Screen component={NHSDetailsScreen} name="NHSDetails" options={noHeader} />
      <Stack.Screen component={NHSIntroScreen} name="NHSIntro" options={noHeader} />
      <Stack.Screen component={NHSTestDetailScreen} name="NHSTestDetail" options={noHeader} />
      <Stack.Screen component={NursesConsentUSScreen} name="NursesConsentUS" options={simpleHeader} />
      <Stack.Screen component={OptionalInfoScreen} name="OptionalInfo" options={noHeader} />
      <Stack.Screen component={OtherSymptomsScreen} name="OtherSymptoms" options={noHeader} />
      <Stack.Screen component={PreviousExposureScreen} name="PreviousExposure" options={noHeader} />
      <Stack.Screen
        component={PrivacyPolicySVScreen}
        name="PrivacyPolicySV"
        options={{ headerShown: true, title: 'Integritetsmeddelande' }}
      />
      <Stack.Screen component={PrivacyPolicyUKScreen} name="PrivacyPolicyUK" options={simpleHeader} />
      <Stack.Screen component={PrivacyPolicyUSScreen} name="PrivacyPolicyUS" options={simpleHeader} />
      <Stack.Screen component={ProfileBackDateScreen} name="ProfileBackDate" options={noHeader} />
      <Stack.Screen component={RegisterScreen} name="Register" options={noHeader} />
      <Stack.Screen component={ResetPasswordConfirmScreen} name="ResetPasswordConfirm" options={noHeader} />
      <Stack.Screen component={ResetPasswordScreen} name="ResetPassword" options={noHeader} />
      <Stack.Screen component={SchoolDashboardScreen} name="SchoolDashboard" options={noHeader} />
      <Stack.Screen component={SchoolGroupListScreen} name="SchoolGroupList" options={noHeader} />
      <Stack.Screen component={SchoolHowToScreen} name="SchoolHowTo" options={noHeader} />
      <Stack.Screen component={SchoolIntroScreen} name="SchoolIntro" options={noHeader} />
      <Stack.Screen component={SelectProfileScreen} name="SelectProfile" options={noHeader} />
      <Stack.Screen component={TermsOfUseUSScreen} name="TermsOfUseUS" options={simpleHeader} />
      <Stack.Screen component={ThankYouSEScreen} name="ThankYouSE" options={noHeader} />
      <Stack.Screen component={ThankYouUKScreen} name="ThankYouUK" options={noHeader} />
      <Stack.Screen component={ThankYouUSScreen} name="ThankYouUS" options={noHeader} />
      <Stack.Screen component={ThroatChestSymptomsScreen} name="ThroatChestSymptoms" options={noHeader} />
      <Stack.Screen component={TreatmentOtherScreen} name="TreatmentOther" options={noHeader} />
      <Stack.Screen component={TreatmentSelectionScreen} name="TreatmentSelection" options={noHeader} />
      <Stack.Screen component={TrendlineScreen} name="Trendline" options={noHeader} />
      <Stack.Screen component={VaccineDoseSymptomsScreen} name="VaccineDoseSymptoms" options={noHeader} />
      <Stack.Screen component={VaccineFindInfoScreen} name="VaccineFindInfo" options={noHeader} />
      <Stack.Screen component={VaccineListScreen} name="VaccineList" options={noHeader} />
      <Stack.Screen component={VaccineLogSymptomsInfoScreen} name="VaccineLogSymptomsInfo" options={noHeader} />
      <Stack.Screen component={Welcome1Screen} name="Welcome" options={noHeader} />
      <Stack.Screen component={Welcome2Screen} name="Welcome2" options={noHeader} />
      <Stack.Screen component={WelcomeRepeatScreen} name="WelcomeRepeat" options={noHeader} />
      <Stack.Screen component={WhereAreYouScreen} name="WhereAreYou" options={noHeader} />
      <Stack.Screen component={YourHealthScreen} name="YourHealth" options={noHeader} />
      <Stack.Screen component={YourStudyScreen} name="YourStudy" options={noHeader} />
      <Stack.Screen component={YourWorkScreen} name="YourWork" options={noHeader} />

      {/* __HYGEN_INJECTED_SCREEN_BELOW__ */}
      {/* __HYGEN_INJECTED_SCREEN_ABOVE__ */}

      {AnniversaryNavigator({ Stack })}
      {DietStudyPlaybackNavigator({ Stack })}
      {MentalHealthNavigator({ Stack })}
      {MentalHealthPlaybackNavigator({ Stack })}
    </Stack.Navigator>
  );
}
