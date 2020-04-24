import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Header, Root } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Dimensions, StatusBar } from 'react-native';

import { colors } from '../theme/colors';
import { CountrySelectScreen } from './features/CountrySelectScreen';
import { DrawerMenu } from './features/DrawerMenu';
import { ScreenParamList } from './features/ScreenParamList';
import { SplashScreen } from './features/SplashScreen';
import ThankYouScreen from './features/ThankYouScreen';
import ViralThankYouScreen from './features/ViralThankYouScreen';
import CovidTestScreen from './features/assessment/CovidTestScreen';
import DescribeSymptomsScreen from './features/assessment/DescribeSymptomsScreen';
import HealthWorkerExposureScreen from './features/assessment/HealthWorkerExposureScreen';
import HowYouFeelScreen from './features/assessment/HowYouFeelScreen';
import LevelOfIsolationScreen from './features/assessment/LevelOfIsolationScreen';
import StartAssessmentScreen from './features/assessment/StartAssessment';
import TreatmentOtherScreen from './features/assessment/TreatmentOtherScreen';
import TreatmentSelectionScreen from './features/assessment/TreatmentSelectionScreen';
import WhereAreYouScreen from './features/assessment/WhereAreYouScreen';
import { LoginScreen } from './features/login/LoginScreen';
import AdultOrChildScreen from './features/multi-profile/AdultOrChildScreen';
import ConsentForOther from './features/multi-profile/ConsentForOtherScreen';
import CreateProfileScreen from './features/multi-profile/CreateProfileScreen';
import ReportForOtherScreen from './features/multi-profile/ReportForOtherScreen';
import SelectProfileScreen from './features/multi-profile/SelectProfileScreen';
import { ResetPasswordConfirmScreen } from './features/password-reset/ResetPassordConfirm';
import { ResetPasswordScreen } from './features/password-reset/ResetPassword';
import AboutYouScreen from './features/patient/AboutYouScreen';
import PreviousExposureScreen from './features/patient/PreviousExposure';
import StartPatientScreen from './features/patient/StartPatient';
import YourHealthScreen from './features/patient/YourHealthScreen';
import YourStudyScreen from './features/patient/YourStudyScreen';
import YourWorkScreen from './features/patient/YourWorkScreen';
import { ConsentScreen } from './features/register/ConsentScreen';
import { OptionalInfoScreen } from './features/register/OptionalInfoScreen';
import { RegisterScreen } from './features/register/RegisterScreen';
import { Welcome1Screen } from './features/register/Welcome1Screen';
import { Welcome2Screen } from './features/register/Welcome2Screen';
import { WelcomeRepeatScreen } from './features/register/WelcomeRepeatScreen';
import { PrivacyPolicyUKScreen } from './features/register/gb/PrivacyPolicyUKScreen';
import BeforeWeStartUS from './features/register/us/BeforeWeStartUS';
import { NursesConsentUSScreen } from './features/register/us/NursesConsentUS';
import { PrivacyPolicyUSScreen } from './features/register/us/PrivacyPolicyUSScreen';
import TermsOfUseUSScreen from './features/register/us/TermsOfUseUSScreen';

const Stack = createStackNavigator<ScreenParamList>();
const Drawer = createDrawerNavigator();

const ZoeApp: React.FC = () => {
  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }, []);

  const mainNavStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CountrySelect" component={CountrySelectScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={Welcome1Screen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome2" component={Welcome2Screen} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeRepeat" component={WelcomeRepeatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Consent" component={ConsentScreen} options={{ headerShown: true, title: 'Consent' }} />
        <Stack.Screen
          name="TermsOfUseUS"
          component={TermsOfUseUSScreen}
          options={{ headerShown: true, title: 'Terms of Use' }}
        />
        <Stack.Screen
          name="PrivacyPolicyUK"
          component={PrivacyPolicyUKScreen}
          options={{ headerShown: true, title: 'Privacy notice' }}
        />
        <Stack.Screen
          name="PrivacyPolicyUS"
          component={PrivacyPolicyUSScreen}
          options={{ headerShown: true, title: 'Privacy policy' }}
        />
        <Stack.Screen
          name="NursesConsentUS"
          component={NursesConsentUSScreen}
          options={{ headerShown: true, title: 'Research Consent' }}
        />
        <Stack.Screen name="BeforeWeStartUS" component={BeforeWeStartUS} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="ResetPasswordConfirm"
          component={ResetPasswordConfirmScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OptionalInfo" component={OptionalInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StartPatient" component={StartPatientScreen} options={{ headerShown: false }} />
        <Stack.Screen name="YourStudy" component={YourStudyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="YourWork" component={YourWorkScreen} options={{ headerShown: false }} />
        <Stack.Screen name="YourHealth" component={YourHealthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutYou" component={AboutYouScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PreviousExposure" component={PreviousExposureScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StartAssessment" component={StartAssessmentScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="HealthWorkerExposure"
          component={HealthWorkerExposureScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CovidTest" component={CovidTestScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HowYouFeel" component={HowYouFeelScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DescribeSymptoms" component={DescribeSymptomsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WhereAreYou" component={WhereAreYouScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LevelOfIsolation" component={LevelOfIsolationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TreatmentSelection" component={TreatmentSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TreatmentOther" component={TreatmentOtherScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ThankYou" component={ThankYouScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ViralThankYou" component={ViralThankYouScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConsentForOther" component={ConsentForOther} options={{ headerShown: false }} />
        <Stack.Screen name="ReportForOther" component={ReportForOtherScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectProfile" component={SelectProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdultOrChild" component={AdultOrChildScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

  return (
    <Root>
      <Header style={{ display: 'none' }}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      </Header>

      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerMenu {...props} />}
          screenOptions={{ swipeEnabled: false }}
          drawerStyle={{
            width: Dimensions.get('screen').width,
          }}>
          <Drawer.Screen name="Main" component={mainNavStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Root>
  );
};

export default ZoeApp;
