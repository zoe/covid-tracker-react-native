import Analytics from '@covid/core/Analytics';
import store from '@covid/core/state/store';
import { CountrySelectScreen } from '@covid/features/CountrySelectScreen';
import { DrawerMenu } from '@covid/features/DrawerMenu';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { SplashScreen } from '@covid/features/SplashScreen';
import ThankYouScreen from '@covid/features/ThankYouScreen';
import ThankYouUKScreen from '@covid/features/ThankYouUKScreen';
import ViralThankYouScreen from '@covid/features/ViralThankYouScreen';
import CovidTestDetailScreen from '@covid/features/assessment/CovidTestDetailScreen';
import DescribeSymptomsScreen from '@covid/features/assessment/DescribeSymptomsScreen';
import HealthWorkerExposureScreen from '@covid/features/assessment/HealthWorkerExposureScreen';
import HowYouFeelScreen from '@covid/features/assessment/HowYouFeelScreen';
import LevelOfIsolationScreen from '@covid/features/assessment/LevelOfIsolationScreen';
import ProfileBackDateScreen from '@covid/features/assessment/ProfileBackDateScreen';
import TreatmentOtherScreen from '@covid/features/assessment/TreatmentOtherScreen';
import TreatmentSelectionScreen from '@covid/features/assessment/TreatmentSelectionScreen';
import WhereAreYouScreen from '@covid/features/assessment/WhereAreYouScreen';
import YourCovidTestsScreen from '@covid/features/assessment/YourCovidTestsScreen';
import { LoginScreen } from '@covid/features/login/LoginScreen';
import AdultOrChildScreen from '@covid/features/multi-profile/AdultOrChildScreen';
import ConsentForOther from '@covid/features/multi-profile/ConsentForOtherScreen';
import CreateProfileScreen from '@covid/features/multi-profile/CreateProfileScreen';
import ReportForOtherScreen from '@covid/features/multi-profile/ReportForOtherScreen';
import SelectProfileScreen from '@covid/features/multi-profile/SelectProfileScreen';
import { ResetPasswordConfirmScreen } from '@covid/features/password-reset/ResetPassordConfirm';
import { ResetPasswordScreen } from '@covid/features/password-reset/ResetPassword';
import AboutYouScreen from '@covid/features/patient/AboutYouScreen';
import PreviousExposureScreen from '@covid/features/patient/PreviousExposure';
import StartPatientScreen from '@covid/features/patient/StartPatient';
import YourHealthScreen from '@covid/features/patient/YourHealthScreen';
import YourStudyScreen from '@covid/features/patient/YourStudyScreen';
import YourWorkScreen from '@covid/features/patient/YourWorkScreen';
import { ConsentScreen } from '@covid/features/register/ConsentScreen';
import { OptionalInfoScreen } from '@covid/features/register/OptionalInfoScreen';
import { RegisterScreen } from '@covid/features/register/RegisterScreen';
import { Welcome1Screen } from '@covid/features/register/Welcome1Screen';
import { Welcome2Screen } from '@covid/features/register/Welcome2Screen';
import { WelcomeRepeatScreen } from '@covid/features/register/WelcomeRepeatScreen';
import { PrivacyPolicyUKScreen } from '@covid/features/register/gb/PrivacyPolicyUKScreen';
import ValidationStudyConsentScreen from '@covid/features/register/gb/ValidationStudyConsentScreen';
import ValidationStudyInfoScreen from '@covid/features/register/gb/ValidationStudyInfoScreen';
import ValidationStudyIntroScreen from '@covid/features/register/gb/ValidationStudyIntroScreen';
import PrivacyPolicySVScreen from '@covid/features/register/sv/PrivacyPolicySVScreen';
import BeforeWeStartUS from '@covid/features/register/us/BeforeWeStartUS';
import { NursesConsentUSScreen } from '@covid/features/register/us/NursesConsentUS';
import { PrivacyPolicyUSScreen } from '@covid/features/register/us/PrivacyPolicyUSScreen';
import TermsOfUseUSScreen from '@covid/features/register/us/TermsOfUseUSScreen';
import i18n from '@covid/locale/i18n';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@theme/colors';
import * as Font from 'expo-font';
import { Header, Root, View } from 'native-base';
import React, { Component, RefObject } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

const Stack = createStackNavigator<ScreenParamList>();
const Drawer = createDrawerNavigator();

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

const getCurrentRouteName = (navigationState: NavigationState): string | null => {
  if (!navigationState) return null;

  const route = navigationState.routes[navigationState.index];
  if (route.state) {
    // Nested navigators
    // @ts-ignore
    return getCurrentRouteName(route.state);
  }
  return route.name;
};

export default class CovidApp extends Component<object, State> {
  navigationRef: RefObject<NavigationState>;
  currentRouteName: string | null;

  constructor(props: object) {
    super(props);
    this.state = initialState;
    this.navigationRef = React.createRef();
    this.currentRouteName = '';
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isLoaded: true });

    // Store the RouteName
    // @ts-ignore
    const state = this.navigationRef.current?.getRootState();
    this.currentRouteName = getCurrentRouteName(state);
  }

  handleStateChange(state: NavigationState | undefined) {
    if (!state) return;

    const previousRouteName = this.currentRouteName;
    const newRouteName = getCurrentRouteName(state);

    if (newRouteName) {
      if (previousRouteName !== newRouteName) {
        Analytics.trackScreenView(newRouteName);
      }
      this.currentRouteName = newRouteName;
    }
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

            <NavigationContainer ref={this.navigationRef as any} onStateChange={this.handleStateChange}>
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

  mainNavStack() {
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
        <Stack.Screen name="StartPatient" component={StartPatientScreen} options={noHeader} />
        <Stack.Screen name="YourStudy" component={YourStudyScreen} options={noHeader} />
        <Stack.Screen name="YourWork" component={YourWorkScreen} options={noHeader} />
        <Stack.Screen name="YourHealth" component={YourHealthScreen} options={noHeader} />
        <Stack.Screen name="AboutYou" component={AboutYouScreen} options={noHeader} />
        <Stack.Screen name="PreviousExposure" component={PreviousExposureScreen} options={noHeader} />
        <Stack.Screen name="HealthWorkerExposure" component={HealthWorkerExposureScreen} options={noHeader} />
        <Stack.Screen name="CovidTest" component={YourCovidTestsScreen} options={noHeader} />
        <Stack.Screen name="CovidTestDetail" component={CovidTestDetailScreen} options={noHeader} />
        <Stack.Screen name="HowYouFeel" component={HowYouFeelScreen} options={noHeader} />
        <Stack.Screen name="DescribeSymptoms" component={DescribeSymptomsScreen} options={noHeader} />
        <Stack.Screen name="WhereAreYou" component={WhereAreYouScreen} options={noHeader} />
        <Stack.Screen name="LevelOfIsolation" component={LevelOfIsolationScreen} options={noHeader} />
        <Stack.Screen name="TreatmentSelection" component={TreatmentSelectionScreen} options={noHeader} />
        <Stack.Screen name="TreatmentOther" component={TreatmentOtherScreen} options={noHeader} />
        <Stack.Screen name="ThankYou" component={ThankYouScreen} options={noHeader} />
        <Stack.Screen name="ViralThankYou" component={ViralThankYouScreen} options={noHeader} />
        <Stack.Screen name="ThankYouUK" component={ThankYouUKScreen} options={noHeader} />
        <Stack.Screen name="Login" component={LoginScreen} options={noHeader} />
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen} options={noHeader} />
        <Stack.Screen name="ConsentForOther" component={ConsentForOther} options={noHeader} />
        <Stack.Screen name="ReportForOther" component={ReportForOtherScreen} options={noHeader} />
        <Stack.Screen name="SelectProfile" component={SelectProfileScreen} options={noHeader} />
        <Stack.Screen name="AdultOrChild" component={AdultOrChildScreen} options={noHeader} />
        <Stack.Screen name="ProfileBackDate" component={ProfileBackDateScreen} options={noHeader} />
        <Stack.Screen name="ValidationStudyIntro" component={ValidationStudyIntroScreen} options={noHeader} />
        <Stack.Screen name="ValidationStudyConsent" component={ValidationStudyConsentScreen} options={noHeader} />
        <Stack.Screen name="ValidationStudyInfo" component={ValidationStudyInfoScreen} options={noHeader} />
      </Stack.Navigator>
    );
  }
}
