import { ScreenParamList } from '@covid/features/ScreenParamList';
import * as screens from '@covid/features/screens';
import i18n from '@covid/locale/i18n';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import AnniversaryNavigator from './AnniversaryNavigator';
import DietStudyPlaybackNavigator from './DietStudyPlaybackNavigator';
import MentalHealthNavigator from './MentalHealthNavigator';
import MentalHealthPlaybackNavigator from './MentalHealthPlaybackNavigator';
import ReconsentNavigator from './ReconsentNavigator';

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
      <Stack.Screen component={screens.SplashScreen} name="Splash" options={noHeader} />

      <Stack.Screen component={screens.AboutYouScreen} name="AboutYou" options={noHeader} />
      <Stack.Screen component={screens.AboutYourVaccineScreen} name="AboutYourVaccine" options={noHeader} />
      <Stack.Screen component={screens.AdultOrChildScreen} name="AdultOrChild" options={noHeader} />
      <Stack.Screen component={screens.ArchiveReasonScreen} name="ArchiveReason" options={noHeader} />
      <Stack.Screen component={screens.BeforeWeStartUSScreen} name="BeforeWeStartUS" options={noHeader} />
      <Stack.Screen component={screens.ConfirmSchoolScreen} name="ConfirmSchool" options={noHeader} />
      <Stack.Screen component={screens.ConsentScreen} name="Consent" options={simpleHeader} />
      <Stack.Screen component={screens.ConsentForOtherScreen} name="ConsentForOther" options={noHeader} />
      <Stack.Screen component={screens.CountrySelectScreen} name="CountrySelect" options={noHeader} />
      <Stack.Screen component={screens.CovidTestConfirmScreen} name="CovidTestConfirm" options={noHeader} />
      <Stack.Screen component={screens.CovidTestDetailScreen} name="CovidTestDetail" options={noHeader} />
      <Stack.Screen component={screens.CovidTestListScreen} name="CovidTestList" options={noHeader} />
      <Stack.Screen component={screens.CreateProfileScreen} name="CreateProfile" options={noHeader} />
      <Stack.Screen component={screens.DashboardScreen} name="Dashboard" options={noHeader} />
      <Stack.Screen component={screens.DashboardUSScreen} name="DashboardUS" options={noHeader} />
      <Stack.Screen component={screens.EditLocationScreen} name="EditLocation" options={noHeader} />
      <Stack.Screen component={screens.EditProfileScreen} name="EditProfile" options={noHeader} />
      <Stack.Screen component={screens.EstimatedCasesScreen} name="EstimatedCases" options={noHeader} />
      <Stack.Screen component={screens.GeneralSymptomsScreen} name="GeneralSymptoms" options={noHeader} />
      <Stack.Screen component={screens.GutStomachSymptomsScreen} name="GutStomachSymptoms" options={noHeader} />
      <Stack.Screen component={screens.HeadSymptomsScreen} name="HeadSymptoms" options={noHeader} />
      <Stack.Screen component={screens.HealthWorkerExposureScreen} name="HealthWorkerExposure" options={noHeader} />
      <Stack.Screen component={screens.HowYouFeelScreen} name="HowYouFeel" options={noHeader} />
      <Stack.Screen component={screens.JoinHigherEducationScreen} name="JoinHigherEducation" options={noHeader} />
      <Stack.Screen component={screens.JoinSchoolGroupScreen} name="JoinSchoolGroup" options={noHeader} />
      <Stack.Screen component={screens.JoinSchoolScreen} name="JoinSchool" options={noHeader} />
      <Stack.Screen component={screens.LoginScreen} name="Login" options={noHeader} />
      <Stack.Screen component={screens.LongCovidQuestionScreen} name="LongCovidQuestion" options={noHeader} />
      <Stack.Screen component={screens.LongCovidStartScreen} name="LongCovidStart" options={noHeader} />
      <Stack.Screen component={screens.NursesConsentUSScreen} name="NursesConsentUS" options={simpleHeader} />
      <Stack.Screen component={screens.OptionalInfoScreen} name="OptionalInfo" options={noHeader} />
      <Stack.Screen component={screens.OtherSymptomsScreen} name="OtherSymptoms" options={noHeader} />
      <Stack.Screen component={screens.PreviousExposureScreen} name="PreviousExposure" options={noHeader} />
      <Stack.Screen
        component={screens.PrivacyPolicySVScreen}
        name="PrivacyPolicySV"
        options={{ headerShown: true, title: 'Integritetsmeddelande' }}
      />
      <Stack.Screen component={screens.PrivacyPolicyUKScreen} name="PrivacyPolicyUK" options={simpleHeader} />
      <Stack.Screen component={screens.PrivacyPolicyUSScreen} name="PrivacyPolicyUS" options={simpleHeader} />
      <Stack.Screen component={screens.ProfileBackDateScreen} name="ProfileBackDate" options={noHeader} />
      <Stack.Screen component={screens.RegisterScreen} name="Register" options={noHeader} />
      <Stack.Screen component={screens.ResetPasswordConfirmScreen} name="ResetPasswordConfirm" options={noHeader} />
      <Stack.Screen component={screens.ResetPasswordScreen} name="ResetPassword" options={noHeader} />
      <Stack.Screen component={screens.SchoolDashboardScreen} name="SchoolDashboard" options={noHeader} />
      <Stack.Screen component={screens.SchoolGroupListScreen} name="SchoolGroupList" options={noHeader} />
      <Stack.Screen component={screens.SchoolHowToScreen} name="SchoolHowTo" options={noHeader} />
      <Stack.Screen component={screens.SchoolIntroScreen} name="SchoolIntro" options={noHeader} />
      <Stack.Screen component={screens.SelectProfileScreen} name="SelectProfile" options={noHeader} />
      <Stack.Screen component={screens.TermsOfUseUSScreen} name="TermsOfUseUS" options={simpleHeader} />
      <Stack.Screen component={screens.ThankYouSEScreen} name="ThankYouSE" options={noHeader} />
      <Stack.Screen component={screens.ThankYouUKScreen} name="ThankYouUK" options={noHeader} />
      <Stack.Screen component={screens.ThankYouUSScreen} name="ThankYouUS" options={noHeader} />
      <Stack.Screen component={screens.ThroatChestSymptomsScreen} name="ThroatChestSymptoms" options={noHeader} />
      <Stack.Screen component={screens.TreatmentOtherScreen} name="TreatmentOther" options={noHeader} />
      <Stack.Screen component={screens.TreatmentSelectionScreen} name="TreatmentSelection" options={noHeader} />
      <Stack.Screen component={screens.TrendlineScreen} name="Trendline" options={noHeader} />
      <Stack.Screen component={screens.VaccineDoseSymptomsScreen} name="VaccineDoseSymptoms" options={noHeader} />
      <Stack.Screen component={screens.VaccineFindInfoScreen} name="VaccineFindInfo" options={noHeader} />
      <Stack.Screen component={screens.VaccineListScreen} name="VaccineList" options={noHeader} />
      <Stack.Screen component={screens.VaccineLogSymptomsInfoScreen} name="VaccineLogSymptomsInfo" options={noHeader} />
      <Stack.Screen component={screens.Welcome1Screen} name="Welcome" options={noHeader} />
      <Stack.Screen component={screens.Welcome2Screen} name="Welcome2" options={noHeader} />
      <Stack.Screen component={screens.WelcomeRepeatScreen} name="WelcomeRepeat" options={noHeader} />
      <Stack.Screen component={screens.WhereAreYouScreen} name="WhereAreYou" options={noHeader} />
      <Stack.Screen component={screens.YourHealthScreen} name="YourHealth" options={noHeader} />
      <Stack.Screen component={screens.YourStudyScreen} name="YourStudy" options={noHeader} />
      <Stack.Screen component={screens.YourWorkScreen} name="YourWork" options={noHeader} />

      {AnniversaryNavigator({ Stack })}
      {DietStudyPlaybackNavigator({ Stack })}
      {MentalHealthNavigator({ Stack })}
      {MentalHealthPlaybackNavigator({ Stack })}
      {ReconsentNavigator({ Stack })}
    </Stack.Navigator>
  );
}
