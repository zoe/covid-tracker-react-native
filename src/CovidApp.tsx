import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Header, Root, View } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, StatusBar, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Notifications } from 'expo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors } from '@theme/colors';
import Analytics, { events } from '@covid/core/Analytics';
import store from '@covid/core/state/store';
import { CountrySelectScreen } from '@covid/features/CountrySelectScreen';
import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { SplashScreen } from '@covid/features/SplashScreen';
import ThankYouScreen from '@covid/features/thank-you/ThankYouScreen';
import ThankYouUKScreen from '@covid/features/thank-you/ThankYouUKScreen';
import ViralThankYouScreen from '@covid/features/thank-you/ViralThankYouScreen';
import CovidTestDetailScreen from '@covid/features/covid-tests/CovidTestDetailScreen';
import HealthWorkerExposureScreen from '@covid/features/assessment/HealthWorkerExposureScreen';
import ProfileBackDateScreen from '@covid/features/assessment/ProfileBackDateScreen';
import TreatmentOtherScreen from '@covid/features/assessment/TreatmentOtherScreen';
import TreatmentSelectionScreen from '@covid/features/assessment/TreatmentSelectionScreen';
import WhereAreYouScreen from '@covid/features/assessment/WhereAreYouScreen';
import CovidTestListScreen from '@covid/features/covid-tests/CovidTestListScreen';
import { LoginScreen } from '@covid/features/login/LoginScreen';
import AdultOrChildScreen from '@covid/features/multi-profile/AdultOrChildScreen';
import ConsentForOther from '@covid/features/multi-profile/ConsentForOtherScreen';
import CreateProfileScreen from '@covid/features/multi-profile/CreateProfileScreen';
import ReportForOtherScreen from '@covid/features/multi-profile/ReportForOtherScreen';
import SelectProfileScreen from '@covid/features/multi-profile/SelectProfileScreen';
import { ResetPasswordConfirmScreen } from '@covid/features/password-reset/ResetPasswordConfirmScreen';
import { ResetPasswordScreen } from '@covid/features/password-reset/ResetPasswordScreen';
import AboutYouScreen from '@covid/features/patient/AboutYouScreen';
import PreviousExposureScreen from '@covid/features/patient/PreviousExposure';
import YourHealthScreen from '@covid/features/patient/YourHealthScreen';
import YourStudyScreen from '@covid/features/patient/YourStudyScreen';
import YourWorkScreen from '@covid/features/patient/YourWorkScreen';
import ConsentScreen from '@covid/features/register/ConsentScreen/ConsentScreen';
import { OptionalInfoScreen } from '@covid/features/register/OptionalInfoScreen';
import { RegisterScreen } from '@covid/features/register/RegisterScreen';
import Welcome1Screen from '@covid/features/register/Welcome1Screen';
import Welcome2Screen from '@covid/features/register/Welcome2Screen';
import { WelcomeRepeatScreen } from '@covid/features/register/WelcomeRepeatScreen';
import { PrivacyPolicyUKScreen } from '@covid/features/register/gb/PrivacyPolicyUKScreen';
import ValidationStudyConsentScreen from '@covid/features/validation-study/ValidationStudyConsentScreen';
import ValidationStudyInfoScreen from '@covid/features/validation-study/ValidationStudyInfoScreen';
import ValidationStudyIntroScreen from '@covid/features/validation-study/ValidationStudyIntroScreen';
import PrivacyPolicySVScreen from '@covid/features/register/sv/PrivacyPolicySVScreen';
import BeforeWeStartUS from '@covid/features/register/us/BeforeWeStartUS';
import { NursesConsentUSScreen } from '@covid/features/register/us/NursesConsentUS';
import { PrivacyPolicyUSScreen } from '@covid/features/register/us/PrivacyPolicyUSScreen';
import TermsOfUseUSScreen from '@covid/features/register/us/TermsOfUseUSScreen';
import i18n from '@covid/locale/i18n';
import { EditProfileScreen } from '@covid/features/multi-profile/edit-profile/EditProfileScreen';
import { ArchiveReasonScreen } from '@covid/features/multi-profile/ArchiveReasonScreen';
import { VaccineRegistrySignUpScreen } from '@covid/features/assessment/gb/VaccineRegistrySignUpScreen';
import { VaccineRegistryInfoScreen } from '@covid/features/assessment/gb/VaccineRegistryInfoScreen';
import DietStudyAboutYouScreen from '@covid/features/diet-study/DietStudyAboutYouScreen';
import DietStudyIntroScreen from '@covid/features/diet-study/DietStudyIntroScreen';
import DietStudyYourLifestyleScreen from '@covid/features/diet-study/DietStudyYourLifestyleScreen';
import DietStudyTypicalDietScreen from '@covid/features/diet-study/DietStudyTypicalDietScreen';
import { DietStudyThankYouScreen } from '@covid/features/diet-study/DietStudyThankYouScreen';
import { DietStudyConsentScreen } from '@covid/features/diet-study/DietStudyConsentScreen';
import { DietStudyThankYouBreakScreen } from '@covid/features/diet-study/DietStudyThankYouBreakScreen';
import NavigatorService from '@covid/NavigatorService';
import { EditLocationScreen } from '@covid/features/multi-profile/edit-profile/EditLocationScreen';
import { dashboard, news } from '@assets';
import { LatestNewsScreen } from '@covid/features/LatestNewsScreen';
import { NHSIntroScreen } from '@covid/features/patient/NHSIntro';
import { NHSDetailsScreen } from '@covid/features/patient/NHSDetailsScreen';
import NHSTestDetailScreen from '@covid/features/covid-tests/NHSTestDetailScreen';
import { HowYouFeelScreen } from '@covid/features/assessment/HowYouFeelScreen';
import { DashboardScreen } from '@covid/features/dashboard/DashboardScreen';
import { EstimatedCasesScreen } from '@covid/features/EstimatedCasesScreen';
import {
  SchoolIntroScreen,
  SchoolHowToScreen,
  JoinSchoolScreen,
  JoinSchoolGroupScreen,
  CreateNetworkGroupScreen,
  SchoolSuccessScreen,
  ConfirmSchoolScreen,
  JoinHigherEducationScreen,
} from '@covid/features/school-network';
import { SchoolGroupListScreen } from '@covid/features/school-network/SchoolGroupListScreen';
import { CovidTestConfirmScreen } from '@covid/features/covid-tests/CovidTestConfirmScreen';
import { SchoolDashboardScreen } from '@covid/features/school-network/SchoolDashboardScreen';
// __HYGEN_INJECTED_IMPORTS_BELOW__
import { TrendlineScreen } from '@covid/features/dashboard/TrendlineScreen';
import { GeneralSymptomsScreen } from '@covid/features/assessment/GeneralSymptomsScreen';
import { HeadSymptomsScreen } from '@covid/features/assessment/HeadSymptomsScreen';
import { ThroatChestSymptomsScreen } from '@covid/features/assessment/ThroatChestSymptomsScreen';
import { GutStomachSymptomsScreen } from '@covid/features/assessment/GutStomachSymptomsScreen';
import { OtherSymptomsScreen } from '@covid/features/assessment/OtherSymptomsScreen';

import { SearchLADScreen } from './features/dashboard/SearchLADScreen';
// __HYGEN_INJECTED_IMPORTS_ABOVE__

const Stack = createStackNavigator<ScreenParamList>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

class State {
  isLoaded: boolean;
  isOnline: boolean;
  isApiOnline: boolean;
}

const initialState = {
  isLoaded: false,
  isOnline: true,
  isApiOnline: true,
};

export default class CovidApp extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isLoaded: true });

    Notifications.addListener((notif) => {
      if (notif.origin === 'selected') {
        Analytics.track(events.OPEN_FROM_NOTIFICATION);
      }
    });
  }

  render() {
    if (!this.state.isLoaded) return <View style={{ flex: 1, backgroundColor: colors.predict }} />;

    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Root>
            <Header style={{ display: 'none' }}>
              <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
            </Header>
            <NavigationContainer
              ref={(navigatorRef) => {
                NavigatorService.setContainer(navigatorRef);
              }}
              onStateChange={NavigatorService.handleStateChange}>
              <Drawer.Navigator
                drawerContent={(props) => <DrawerMenu {...props} />}
                screenOptions={{ swipeEnabled: false }}
                drawerStyle={{
                  width: Dimensions.get('screen').width,
                }}>
                <Drawer.Screen name="Main" component={this.mainNavStack} />
              </Drawer.Navigator>
            </NavigationContainer>
          </Root>
        </Provider>
      </SafeAreaProvider>
    );
  }

  tabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;
            const tintColor = focused ? colors.brand : colors.tertiary;

            switch (route.name) {
              case 'Dashboard':
                icon = dashboard;
                break;
              case 'LatestNews':
                icon = news;
                break;
            }

            return <Image resizeMethod="auto" source={icon} style={{ tintColor, width: 24, height: 24 }} />;
          },
        })}
        tabBarOptions={{
          labelStyle: {
            fontSize: 12,
          },
          activeTintColor: colors.brand,
          inactiveTintColor: colors.tertiary,
        }}>
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: i18n.t('tab-navigator.first-tab') }}
        />
        <Tab.Screen
          name="LatestNews"
          component={LatestNewsScreen}
          options={{ title: i18n.t('tab-navigator.second-tab') }}
        />
      </Tab.Navigator>
    );
  };

  mainNavStack = () => {
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
        <Stack.Screen name="ConsentForOther" component={ConsentForOther} options={noHeader} />
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
        <Stack.Screen name="NHSIntro" component={NHSIntroScreen} options={noHeader} />
        <Stack.Screen name="NHSDetails" component={NHSDetailsScreen} options={noHeader} />
        <Stack.Screen name="JoinSchool" component={JoinSchoolScreen} options={noHeader} />
        <Stack.Screen name="JoinSchoolGroup" component={JoinSchoolGroupScreen} options={noHeader} />
        <Stack.Screen name="CreateNetworkGroup" component={CreateNetworkGroupScreen} options={noHeader} />
        <Stack.Screen name="SchoolSuccess" component={SchoolSuccessScreen} options={noHeader} />
        <Stack.Screen name="SchoolIntro" component={SchoolIntroScreen} options={noHeader} />
        <Stack.Screen name="SchoolHowTo" component={SchoolHowToScreen} options={noHeader} />
        <Stack.Screen name="SchoolGroupList" component={SchoolGroupListScreen} options={noHeader} />
        <Stack.Screen name="SchoolDashboard" component={SchoolDashboardScreen} options={noHeader} />
        <Stack.Screen name="ConfirmSchool" component={ConfirmSchoolScreen} options={noHeader} />
        <Stack.Screen name="JoinHigherEducation" component={JoinHigherEducationScreen} options={noHeader} />

        {/* __HYGEN_INJECTED_SCREEN_BELOW__ */}
        <Stack.Screen name="Trendline" component={TrendlineScreen} options={noHeader} />
        <Stack.Screen name="SearchLAD" component={SearchLADScreen} options={noHeader} />
        {/* __HYGEN_INJECTED_SCREEN_ABOVE__ */}
      </Stack.Navigator>
    );
  };
}
