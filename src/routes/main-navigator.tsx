import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import {
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
  CreateNetworkGroupScreen,
  CreateProfileScreen,
  DashboardScreen,
  DietStudyAboutYouScreen,
  DietStudyConsentScreen,
  DietStudyIntroScreen,
  DietStudyThankYouBreakScreen,
  DietStudyThankYouScreen,
  DietStudyTypicalDietScreen,
  DietStudyYourLifestyleScreen,
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
  ReportForOtherScreen,
  ResetPasswordScreen,
  ResetPasswordConfirmScreen,
  SchoolDashboardScreen,
  SchoolGroupListScreen,
  SchoolHowToScreen,
  SchoolIntroScreen,
  SchoolNetworkInfoScreen,
  SchoolSuccessScreen,
  SearchLADScreen,
  SelectProfileScreen,
  SplashScreen,
  TermsOfUseUSScreen,
  ThankYouScreen,
  ThankYouUKScreen,
  ThroatChestSymptomsScreen,
  TreatmentOtherScreen,
  TreatmentSelectionScreen,
  TrendlineScreen,
  VaccineRegistryInfoScreen,
  VaccineRegistrySignUpScreen,
  ValidationStudyConsentScreen,
  ValidationStudyInfoScreen,
  ValidationStudyIntroScreen,
  ViralThankYouScreen,
  Welcome1Screen,
  Welcome2Screen,
  WelcomeRepeatScreen,
  WhereAreYouScreen,
  YourHealthScreen,
  YourStudyScreen,
  YourWorkScreen,
} from '@covid/features';
import { DashboardUSScreen } from '@covid/features/dashboard/DashboardUSScreen';
import DietStudyPlaybackIntroScreen from '@covid/features/diet-study-playback/DietStudyPlaybackIntroScreen';
import { DietStudyPlaybackGlobalScreen } from '@covid/features/diet-study-playback/DietStudyPlaybackGlobalScreen';
import { DietStudyPlaybackDietQualityScreen } from '@covid/features/diet-study-playback/DietStudyPlaybackDietQualityScreen';
import { DietStudyPlaybackYourDietScreen } from '@covid/features/diet-study-playback/DietStudyPlaybackYourDietScreen';
import { DietStudyPlaybackGutHealthScreen } from '@covid/features/diet-study-playback/DietStudyPlaybackGutHealthScreen';

function MainNavigator() {
  const Stack = createStackNavigator<ScreenParamList>();
  const noHeader = {
    headerShown: false,
  };

  const simpleHeader = {
    headerShown: true,
    headerBackTitle: i18n.t('back'),
    title: '',
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={noHeader} />
      <Stack.Screen name="CountrySelect" component={CountrySelectScreen} options={noHeader} />
      <Stack.Screen name="Welcome" component={Welcome1Screen} options={noHeader} />
      <Stack.Screen name="Welcome2" component={Welcome2Screen} options={noHeader} />
      <Stack.Screen name="WelcomeRepeat" component={WelcomeRepeatScreen} options={noHeader} />
      <Stack.Screen name="Consent" component={ConsentScreen} options={simpleHeader} />
      <Stack.Screen name="TermsOfUseUS" component={TermsOfUseUSScreen} options={simpleHeader} />
      <Stack.Screen name="PrivacyPolicyUK" component={PrivacyPolicyUKScreen} options={simpleHeader} />
      <Stack.Screen name="PrivacyPolicyUS" component={PrivacyPolicyUSScreen} options={simpleHeader} />
      <Stack.Screen
        name="PrivacyPolicySV"
        component={PrivacyPolicySVScreen}
        options={{ headerShown: true, title: 'Integritetsmeddelande' }}
      />
      <Stack.Screen name="NursesConsentUS" component={NursesConsentUSScreen} options={simpleHeader} />
      <Stack.Screen name="BeforeWeStartUS" component={BeforeWeStartUS} options={noHeader} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={noHeader} />
      <Stack.Screen name="ResetPasswordConfirm" component={ResetPasswordConfirmScreen} options={noHeader} />
      <Stack.Screen name="Register" component={RegisterScreen} options={noHeader} />
      <Stack.Screen name="OptionalInfo" component={OptionalInfoScreen} options={noHeader} />
      <Stack.Screen name="YourStudy" component={YourStudyScreen} options={noHeader} />
      <Stack.Screen name="YourWork" component={YourWorkScreen} options={noHeader} />
      <Stack.Screen name="YourHealth" component={YourHealthScreen} options={noHeader} />
      <Stack.Screen name="AboutYou" component={AboutYouScreen} options={noHeader} />
      <Stack.Screen name="PreviousExposure" component={PreviousExposureScreen} options={noHeader} />
      <Stack.Screen name="HealthWorkerExposure" component={HealthWorkerExposureScreen} options={noHeader} />
      <Stack.Screen name="CovidTestList" component={CovidTestListScreen} options={noHeader} />
      <Stack.Screen name="CovidTestDetail" component={CovidTestDetailScreen} options={noHeader} />
      <Stack.Screen name="NHSTestDetail" component={NHSTestDetailScreen} options={noHeader} />
      <Stack.Screen name="CovidTestConfirm" component={CovidTestConfirmScreen} options={noHeader} />
      <Stack.Screen name="HowYouFeel" component={HowYouFeelScreen} options={noHeader} />
      <Stack.Screen name="GeneralSymptoms" component={GeneralSymptomsScreen} options={noHeader} />
      <Stack.Screen name="HeadSymptoms" component={HeadSymptomsScreen} options={noHeader} />
      <Stack.Screen name="ThroatChestSymptoms" component={ThroatChestSymptomsScreen} options={noHeader} />
      <Stack.Screen name="GutStomachSymptoms" component={GutStomachSymptomsScreen} options={noHeader} />
      <Stack.Screen name="OtherSymptoms" component={OtherSymptomsScreen} options={noHeader} />
      <Stack.Screen name="WhereAreYou" component={WhereAreYouScreen} options={noHeader} />
      <Stack.Screen name="TreatmentSelection" component={TreatmentSelectionScreen} options={noHeader} />
      <Stack.Screen name="TreatmentOther" component={TreatmentOtherScreen} options={noHeader} />
      <Stack.Screen name="ThankYou" component={ThankYouScreen} options={noHeader} />
      <Stack.Screen name="ViralThankYou" component={ViralThankYouScreen} options={noHeader} />
      <Stack.Screen name="ThankYouUK" component={ThankYouUKScreen} options={noHeader} />
      <Stack.Screen name="Login" component={LoginScreen} options={noHeader} />
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen} options={noHeader} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={noHeader} />
      <Stack.Screen name="EditLocation" component={EditLocationScreen} options={noHeader} />
      <Stack.Screen name="ArchiveReason" component={ArchiveReasonScreen} options={noHeader} />
      <Stack.Screen name="ConsentForOther" component={ConsentForOtherScreen} options={noHeader} />
      <Stack.Screen name="ReportForOther" component={ReportForOtherScreen} options={noHeader} />
      <Stack.Screen name="SelectProfile" component={SelectProfileScreen} options={noHeader} />
      <Stack.Screen name="AdultOrChild" component={AdultOrChildScreen} options={noHeader} />
      <Stack.Screen name="ProfileBackDate" component={ProfileBackDateScreen} options={noHeader} />
      <Stack.Screen name="ValidationStudyIntro" component={ValidationStudyIntroScreen} options={noHeader} />
      <Stack.Screen name="ValidationStudyConsent" component={ValidationStudyConsentScreen} options={noHeader} />
      <Stack.Screen name="ValidationStudyInfo" component={ValidationStudyInfoScreen} options={noHeader} />
      <Stack.Screen name="VaccineRegistrySignup" component={VaccineRegistrySignUpScreen} options={noHeader} />
      <Stack.Screen name="VaccineRegistryInfo" component={VaccineRegistryInfoScreen} options={noHeader} />
      <Stack.Screen name="DietStudyAboutYou" component={DietStudyAboutYouScreen} options={noHeader} />
      <Stack.Screen name="DietStudyIntro" component={DietStudyIntroScreen} options={noHeader} />
      <Stack.Screen name="DietStudyThankYou" component={DietStudyThankYouScreen} options={noHeader} />
      <Stack.Screen name="DietStudyThankYouBreak" component={DietStudyThankYouBreakScreen} options={noHeader} />
      <Stack.Screen name="DietStudyTypicalDiet" component={DietStudyTypicalDietScreen} options={noHeader} />
      <Stack.Screen name="DietStudyYourLifestyle" component={DietStudyYourLifestyleScreen} options={noHeader} />
      <Stack.Screen name="DietStudyConsent" component={DietStudyConsentScreen} options={noHeader} />
      <Stack.Screen name="EstimatedCases" component={EstimatedCasesScreen} options={noHeader} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={noHeader} />
      <Stack.Screen name="DashboardUS" component={DashboardUSScreen} options={noHeader} />
      <Stack.Screen name="NHSIntro" component={NHSIntroScreen} options={noHeader} />
      <Stack.Screen name="NHSDetails" component={NHSDetailsScreen} options={noHeader} />
      <Stack.Screen name="JoinSchool" component={JoinSchoolScreen} options={noHeader} />
      <Stack.Screen name="JoinSchoolGroup" component={JoinSchoolGroupScreen} options={noHeader} />
      <Stack.Screen name="CreateNetworkGroup" component={CreateNetworkGroupScreen} options={noHeader} />
      <Stack.Screen name="SchoolSuccess" component={SchoolSuccessScreen} options={noHeader} />
      <Stack.Screen name="SchoolNetworkInfo" component={SchoolNetworkInfoScreen} options={noHeader} />
      <Stack.Screen name="SchoolIntro" component={SchoolIntroScreen} options={noHeader} />
      <Stack.Screen name="SchoolHowTo" component={SchoolHowToScreen} options={noHeader} />
      <Stack.Screen name="SchoolGroupList" component={SchoolGroupListScreen} options={noHeader} />
      <Stack.Screen name="SchoolDashboard" component={SchoolDashboardScreen} options={noHeader} />
      <Stack.Screen name="ConfirmSchool" component={ConfirmSchoolScreen} options={noHeader} />
      <Stack.Screen name="JoinHigherEducation" component={JoinHigherEducationScreen} options={noHeader} />
      <Stack.Screen name="DietStudyPlaybackIntro" component={DietStudyPlaybackIntroScreen} options={noHeader} />
      <Stack.Screen name="DietStudyPlaybackGlobal" component={DietStudyPlaybackGlobalScreen} options={noHeader} />
      <Stack.Screen
        name="DietStudyPlaybackDietQuality"
        component={DietStudyPlaybackDietQualityScreen}
        options={noHeader}
      />
      <Stack.Screen name="DietStudyPlaybackYourDiet" component={DietStudyPlaybackYourDietScreen} options={noHeader} />
      <Stack.Screen name="DietStudyPlaybackGutHealth" component={DietStudyPlaybackGutHealthScreen} options={noHeader} />


      {/* __HYGEN_INJECTED_SCREEN_BELOW__ */}
      <Stack.Screen name="Trendline" component={TrendlineScreen} options={noHeader} />
      <Stack.Screen name="SearchLAD" component={SearchLADScreen} options={noHeader} />
      {/* __HYGEN_INJECTED_SCREEN_ABOVE__ */}
    </Stack.Navigator>
  );
}

export default MainNavigator;
