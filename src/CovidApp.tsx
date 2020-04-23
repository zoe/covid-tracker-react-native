import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./features/login/LoginScreen";
import { Header, Root, View } from "native-base";
import * as Font from 'expo-font';
import {Dimensions, StatusBar} from "react-native";
import { colors } from "../theme/colors";
import { RegisterScreen } from "./features/register/RegisterScreen";
import AboutYouScreen from "./features/patient/AboutYouScreen";
import { WelcomeScreen } from "./features/register/gb/WelcomeScreen";
import { SplashScreen } from "./features/SplashScreen";
import YourHealthScreen from "./features/patient/YourHealthScreen";
import HowYouFeelScreen from "./features/assessment/HowYouFeelScreen";
import { PrivacyPolicyUKScreen } from "./features/register/gb/PrivacyPolicyUKScreen";
import { ConsentScreen } from "./features/register/ConsentScreen";
import { OptionalInfoScreen } from "./features/register/OptionalInfoScreen";
import CovidTestScreen from './features/assessment/CovidTestScreen';
import DescribeSymptomsScreen from './features/assessment/DescribeSymptomsScreen';
import WhereAreYouScreen from './features/assessment/WhereAreYouScreen';
import TreatmentSelectionScreen from './features/assessment/TreatmentSelectionScreen';
import TreatmentOtherScreen from './features/assessment/TreatmentOtherScreen';
import { ScreenParamList } from './features/ScreenParamList';
import ThankYouScreen from './features/ThankYouScreen';
import { WelcomeRepeatScreen } from "./features/register/gb/WelcomeRepeatScreen";
import { Welcome1USScreen } from "./features/register/us/Welcome1USScreen";
import { Welcome2USScreen } from "./features/register/us/Welcome2USScreen";
import { WelcomeRepeatUSScreen } from "./features/register/us/WelcomeRepeatUSScreen";
import TermsOfUseUSScreen from "./features/register/us/TermsOfUseUSScreen";
import { PrivacyPolicyUSScreen } from "./features/register/us/PrivacyPolicyUSScreen";
import {CountrySelectScreen} from "./features/CountrySelectScreen";
import YourWorkScreen from './features/patient/YourWorkScreen';
import {NursesConsentUSScreen} from "./features/register/us/NursesConsentUS";
import BeforeWeStartUS from "./features/register/us/BeforeWeStartUS";
import {ResetPasswordScreen} from "./features/password-reset/ResetPassword";
import {ResetPasswordConfirmScreen} from "./features/password-reset/ResetPassordConfirm";
import HealthWorkerExposureScreen from "./features/assessment/HealthWorkerExposureScreen";
import LevelOfIsolationScreen from "./features/assessment/LevelOfIsolationScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {DrawerMenu} from "./features/DrawerMenu";
import YourStudyScreen from "./features/patient/YourStudyScreen";
import ViralThankYouScreen from "./features/ViralThankYouScreen";
import ReportForOtherScreen from "./features/multi-profile/ReportForOtherScreen";
import SelectProfileScreen from "./features/multi-profile/SelectProfileScreen";
import CreateProfileScreen from "./features/multi-profile/CreateProfileScreen";
import ConsentForOther from "./features/multi-profile/ConsentForOtherScreen";
import AdultOrChildScreen from "./features/multi-profile/AdultOrChildScreen";
import StartAssessmentScreen from './features/assessment/StartAssessment';
import PreviousExposureScreen from "./features/patient/PreviousExposure";
import StartPatientScreen from './features/patient/StartPatient';
import ContributionsScreen from './features/ContributionsScreen';

const Stack = createStackNavigator<ScreenParamList>();
const Drawer = createDrawerNavigator();

class State {
    fontLoaded: boolean;
}

export default class ZoeApp extends Component<{}, State> {
    state = new State();

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require("native-base/Fonts/Roboto.ttf"),
            'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf")
        });

        this.setState({fontLoaded: true});
    }

    render() {
        if (!this.state.fontLoaded)
            return (<View></View>);

        return (
            <Root>
                <Header style={{display: 'none'}}>
                    <StatusBar
                        backgroundColor={colors.white}
                        barStyle="dark-content"/>
                </Header>

                <NavigationContainer>
                    <Drawer.Navigator drawerContent={props => <DrawerMenu {...props} />} screenOptions={{swipeEnabled: false}} drawerStyle={{
                        width: Dimensions.get("screen").width,
                    }}>
                        <Drawer.Screen name="Main" component={this.mainNavStack}/>
                    </Drawer.Navigator>
                </NavigationContainer>
            </Root>
        );
    }

     mainNavStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen name="CountrySelect" component={CountrySelectScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="WelcomeUS" component={Welcome1USScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Welcome2US" component={Welcome2USScreen} options={{headerShown: false}}/>
                <Stack.Screen name="WelcomeRepeat" component={WelcomeRepeatScreen} options={{headerShown: false}}/>
                <Stack.Screen name="WelcomeRepeatUS" component={WelcomeRepeatUSScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Consent" component={ConsentScreen} options={{headerShown: true, title: 'Consent'}}/>
                <Stack.Screen name="TermsOfUseUS" component={TermsOfUseUSScreen} options={{headerShown: true, title: 'Terms of Use'}}/>
                <Stack.Screen name="PrivacyPolicyUK" component={PrivacyPolicyUKScreen} options={{headerShown: true, title: 'Privacy notice'}}/>
                <Stack.Screen name="PrivacyPolicyUS" component={PrivacyPolicyUSScreen} options={{headerShown: true, title: 'Privacy policy'}}/>
                <Stack.Screen name="NursesConsentUS" component={NursesConsentUSScreen} options={{headerShown: true, title: 'Research Consent'}}/>
                <Stack.Screen name="BeforeWeStartUS" component={BeforeWeStartUS} options={{headerShown: false}}/>
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ResetPasswordConfirm" component={ResetPasswordConfirmScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                <Stack.Screen name="OptionalInfo" component={OptionalInfoScreen} options={{headerShown: false}}/>
                <Stack.Screen name="StartPatient" component={StartPatientScreen} options={{headerShown: false}}/>
                <Stack.Screen name="YourStudy" component={YourStudyScreen} options={{headerShown: false}}/>
                <Stack.Screen name="YourWork" component={YourWorkScreen} options={{headerShown: false}}/>
                <Stack.Screen name="YourHealth" component={YourHealthScreen} options={{headerShown: false}}/>
                <Stack.Screen name="AboutYou" component={AboutYouScreen} options={{headerShown: false}}/>
                <Stack.Screen name="PreviousExposure" component={PreviousExposureScreen} options={{headerShown: false}}/>
                <Stack.Screen name="StartAssessment" component={StartAssessmentScreen} options={{headerShown: false}}/>
                <Stack.Screen name="HealthWorkerExposure" component={HealthWorkerExposureScreen} options={{headerShown: false}}/>
                <Stack.Screen name="CovidTest" component={CovidTestScreen} options={{headerShown: false}}/>
                <Stack.Screen name="HowYouFeel" component={HowYouFeelScreen} options={{headerShown: false}}/>
                <Stack.Screen name="DescribeSymptoms" component={DescribeSymptomsScreen} options={{headerShown: false}}/>
                <Stack.Screen name="WhereAreYou" component={WhereAreYouScreen} options={{headerShown: false}}/>
                <Stack.Screen name="LevelOfIsolation" component={LevelOfIsolationScreen} options={{headerShown: false}}/>
                <Stack.Screen name="TreatmentSelection" component={TreatmentSelectionScreen} options={{headerShown: false}}/>
                <Stack.Screen name="TreatmentOther" component={TreatmentOtherScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ThankYou" component={ThankYouScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ViralThankYou" component={ViralThankYouScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="CreateProfile" component={CreateProfileScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ConsentForOther" component={ConsentForOther} options={{headerShown: false}}/>
                <Stack.Screen name="ReportForOther" component={ReportForOtherScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SelectProfile" component={SelectProfileScreen} options={{headerShown: false}}/>
                <Stack.Screen name="AdultOrChild" component={AdultOrChildScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Contributions" component={ContributionsScreen} options={{headerShown: true, title: 'Contributions'}}/>
            </Stack.Navigator>
        )
    }
}
