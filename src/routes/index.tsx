import { TScreenParamList } from '@covid/features/ScreenParamList';
import * as screens from '@covid/features/screens';
import AnniversaryNavigator from '@covid/routes/AnniversaryNavigator';
import DietStudyPlaybackNavigator from '@covid/routes/DietStudyPlaybackNavigator';
import MentalHealthNavigator from '@covid/routes/MentalHealthNavigator';
import MentalHealthPlaybackNavigator from '@covid/routes/MentalHealthPlaybackNavigator';
import ReconsentNavigator from '@covid/routes/ReconsentNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

const Stack = createStackNavigator<TScreenParamList>();

const options = {
  headerShown: false,
};

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={screens.SplashScreen} name="Splash" options={options} />
      <Stack.Screen component={screens.AboutYouScreen} name="AboutYou" options={options} />
      <Stack.Screen component={screens.AboutYourVaccineScreen} name="AboutYourVaccine" options={options} />
      <Stack.Screen component={screens.AdultOrChildScreen} name="AdultOrChild" options={options} />
      <Stack.Screen component={screens.ArchiveReasonScreen} name="ArchiveReason" options={options} />
      <Stack.Screen component={screens.BeforeWeStartUSScreen} name="BeforeWeStartUS" options={options} />
      <Stack.Screen component={screens.BiometricAuthScreen} name="BiometricAuth" options={options} />
      <Stack.Screen component={screens.ConfirmSchoolScreen} name="ConfirmSchool" options={options} />
      <Stack.Screen component={screens.ConsentForOtherScreen} name="ConsentForOther" options={options} />
      <Stack.Screen component={screens.ConsentScreen} name="Consent" options={options} />
      <Stack.Screen component={screens.CountrySelectScreen} name="CountrySelect" options={options} />
      <Stack.Screen component={screens.CovidTestConfirmScreen} name="CovidTestConfirm" options={options} />
      <Stack.Screen component={screens.CovidTestDetailScreen} name="CovidTestDetail" options={options} />
      <Stack.Screen component={screens.CovidTestListScreen} name="CovidTestList" options={options} />
      <Stack.Screen component={screens.CreateProfileScreen} name="CreateProfile" options={options} />
      <Stack.Screen component={screens.DashboardScreen} name="Dashboard" options={options} />
      <Stack.Screen component={screens.DashboardUSScreen} name="DashboardUS" options={options} />
      <Stack.Screen component={screens.DataConsentScreen} name="DataConsent" options={options} />
      <Stack.Screen component={screens.DiseasePreferencesScreen} name="DiseasePreferences" options={options} />
      <Stack.Screen component={screens.EditLocationScreen} name="EditLocation" options={options} />
      <Stack.Screen component={screens.EditProfileScreen} name="EditProfile" options={options} />
      <Stack.Screen component={screens.EstimatedCasesScreen} name="EstimatedCases" options={options} />
      <Stack.Screen component={screens.GeneralSymptomsScreen} name="GeneralSymptoms" options={options} />
      <Stack.Screen component={screens.GutStomachSymptomsScreen} name="GutStomachSymptoms" options={options} />
      <Stack.Screen component={screens.HeadSymptomsScreen} name="HeadSymptoms" options={options} />
      <Stack.Screen component={screens.HealthWorkerExposureScreen} name="HealthWorkerExposure" options={options} />
      <Stack.Screen component={screens.HowYouFeelScreen} name="HowYouFeel" options={options} />
      <Stack.Screen component={screens.JoinHigherEducationScreen} name="JoinHigherEducation" options={options} />
      <Stack.Screen component={screens.JoinSchoolGroupScreen} name="JoinSchoolGroup" options={options} />
      <Stack.Screen component={screens.JoinSchoolScreen} name="JoinSchool" options={options} />
      <Stack.Screen component={screens.LoginScreen} name="Login" options={options} />
      <Stack.Screen component={screens.LongCovidQuestionScreen} name="LongCovidQuestion" options={options} />
      <Stack.Screen component={screens.LongCovidStartScreen} name="LongCovidStart" options={options} />
      <Stack.Screen component={screens.MediaCentreScreen} name="MediaCentre" options={options} />
      <Stack.Screen component={screens.NursesConsentUSScreen} name="NursesConsentUS" options={options} />
      <Stack.Screen component={screens.OptionalInfoScreen} name="OptionalInfo" options={options} />
      <Stack.Screen component={screens.OtherSymptomsScreen} name="OtherSymptoms" options={options} />
      <Stack.Screen component={screens.PingdemicScreen} name="Pingdemic" options={options} />
      <Stack.Screen component={screens.PreviousExposureScreen} name="PreviousExposure" options={options} />
      <Stack.Screen
        component={screens.PrivacyPolicySVScreen}
        name="PrivacyPolicySV"
        options={{ headerShown: true, title: 'Integritetsmeddelande' }}
      />
      <Stack.Screen component={screens.PrivacyPolicyUKScreen} name="PrivacyPolicyUK" options={options} />
      <Stack.Screen component={screens.PrivacyPolicyUSScreen} name="PrivacyPolicyUS" options={options} />
      <Stack.Screen component={screens.ProfileBackDateScreen} name="ProfileBackDate" options={options} />
      <Stack.Screen component={screens.RegisterScreen} name="Register" options={options} />
      <Stack.Screen component={screens.ResetPasswordConfirmScreen} name="ResetPasswordConfirm" options={options} />
      <Stack.Screen component={screens.ResetPasswordScreen} name="ResetPassword" options={options} />
      <Stack.Screen component={screens.SchoolDashboardScreen} name="SchoolDashboard" options={options} />
      <Stack.Screen component={screens.SchoolGroupListScreen} name="SchoolGroupList" options={options} />
      <Stack.Screen component={screens.SchoolHowToScreen} name="SchoolHowTo" options={options} />
      <Stack.Screen component={screens.SchoolIntroScreen} name="SchoolIntro" options={options} />
      <Stack.Screen component={screens.SelectProfileScreen} name="SelectProfile" options={options} />
      <Stack.Screen component={screens.TermsOfUseUSScreen} name="TermsOfUseUS" options={options} />
      <Stack.Screen component={screens.TestingModeScreen} name="TestingMode" options={options} />
      <Stack.Screen component={screens.ThankYouSEScreen} name="ThankYouSE" options={options} />
      <Stack.Screen component={screens.ThankYouUKScreen} name="ThankYouUK" options={options} />
      <Stack.Screen component={screens.ThankYouUSScreen} name="ThankYouUS" options={options} />
      <Stack.Screen component={screens.ThroatChestSymptomsScreen} name="ThroatChestSymptoms" options={options} />
      <Stack.Screen component={screens.TreatmentOtherScreen} name="TreatmentOther" options={options} />
      <Stack.Screen component={screens.TreatmentSelectionScreen} name="TreatmentSelection" options={options} />
      <Stack.Screen component={screens.TrendlineScreen} name="Trendline" options={options} />
      <Stack.Screen component={screens.VaccineDoseSymptomsScreen} name="VaccineDoseSymptoms" options={options} />
      <Stack.Screen component={screens.VaccineFindInfoScreen} name="VaccineFindInfo" options={options} />
      <Stack.Screen component={screens.VaccineListScreen} name="VaccineList" options={options} />
      <Stack.Screen component={screens.VaccineLogSymptomsInfoScreen} name="VaccineLogSymptomsInfo" options={options} />
      <Stack.Screen component={screens.Welcome1Screen} name="Welcome" options={options} />
      <Stack.Screen component={screens.Welcome2Screen} name="Welcome2" options={options} />
      <Stack.Screen component={screens.WelcomeRepeatScreen} name="WelcomeRepeat" options={options} />
      <Stack.Screen component={screens.WhereAreYouScreen} name="WhereAreYou" options={options} />
      <Stack.Screen component={screens.WiderHealthStudiesScreen} name="WiderHealthStudies" options={options} />
      <Stack.Screen component={screens.YourHealthScreen} name="YourHealth" options={options} />
      <Stack.Screen component={screens.YourStudyScreen} name="YourStudy" options={options} />
      <Stack.Screen component={screens.YourWorkScreen} name="YourWork" options={options} />

      {AnniversaryNavigator({ Stack })}
      {DietStudyPlaybackNavigator({ Stack })}
      {MentalHealthNavigator({ Stack })}
      {MentalHealthPlaybackNavigator({ Stack })}
      {ReconsentNavigator({ Stack })}

      {/* Uncomment this line to replace the Dashboard with DebugScreens to allow quick debugging */}
      {/* <Stack.Screen component={DebugScreens} name="Dashboard" options={options} /> */}
    </Stack.Navigator>
  );
}
