import React, {Component} from "react";
import {Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../../theme";
import {BrandedButton, ClickableText, RegularText} from "../../../components/Text";
import {ScreenParamList} from "../../ScreenParamList";
import {covidIcon, menuIcon, usLogos} from "../../../../assets";
import {RouteProp} from "@react-navigation/native";
import UserService from "../../../core/user/UserService";
import {AsyncStorageService} from "../../../core/AsyncStorageService";
import {PushNotificationService} from "../../../core/PushNotificationService";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import { ContributionCounter } from "../../../components/ContributionCounter";
import { getInitialPatientState } from "../../../core/patient/PatientState";

type PropsType = {
    navigation: DrawerNavigationProp<ScreenParamList, 'WelcomeRepeat'>
    route: RouteProp<ScreenParamList, 'WelcomeRepeat'>;
}

type WelcomeRepeatUSScreenState = {
    userCount: string | null
}

export class WelcomeRepeatUSScreen extends Component<PropsType, WelcomeRepeatUSScreenState> {
    state = {
        userCount: null,
    };

    async componentDidMount() {
        const userService = new UserService();
        const userCount = await userService.getUserCount();
        this.setState({userCount});

        // Refresh push token if we don't have one
        const hasPushToken = await AsyncStorageService.getPushToken();
        if (!hasPushToken) {
            const pushToken = await PushNotificationService.getPushToken(false);
            if (pushToken) {
                try {
                    await userService.savePushToken(pushToken);
                    AsyncStorageService.setPushToken(pushToken);
                } catch (error) {
                    // Ignore failure.
                }
            }
        }
    }

    handleButtonPress = async () => {
        const {patientId} = this.props.route.params;
        const currentPatient = getInitialPatientState(patientId);

        const userService = new UserService();

        const hasPatientDetails = await userService.hasCompletedPatientDetails(patientId);
        currentPatient.isHealthWorker = await userService.isHealthWorker(); // TODO: remove when currentPatient persisted

        if (hasPatientDetails) {
            // TODO: this should be in a "Start assessment 'screen' which determines the next page"
            // So we have a this.prop.navigation.navigate('StartAssessment', {currentPatient})
            if (currentPatient.isHealthWorker) {
                this.props.navigation.navigate('HealthWorkerExposure', {currentPatient})
            } else {
                this.props.navigation.navigate('CovidTest', {currentPatient, assessmentId: null})
            }
        } else {
            // TODO: this should be in a "Start patient 'screen' which determines the next page"
            // So we have a this.prop.navigation.navigate('StartPatient', {currentPatient})
            this.props.navigation.navigate('YourWork', {currentPatient});
        }
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.rootContainer}>

                    <View style={styles.covidContainer}>
                        <View style={styles.headerRow}>
                            <Image source={covidIcon} style={styles.covidIcon} resizeMode="contain"/>
                            <Text style={styles.appName}>COVID Symptom Tracker</Text>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.toggleDrawer()
                            }}>
                                <Image source={menuIcon} style={styles.menuIcon}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <RegularText style={styles.subtitle}>
                                Take 1 minute each day and {"\n"}help fight the outbreak.{"\n"}
                            </RegularText>
                            <ContributionCounter variant={2} count={this.state.userCount}/>
                        </View>
                    </View>

                    <View style={styles.partners}>


                        <View style={styles.partnersLogoContainer}>
                            <Image style={styles.partnersLogo} source={usLogos}/>
                        </View>

                        <View style={styles.discoveriesContainer}>
                            <RegularText style={styles.discoveriesText}>Follow the discoveries {"\n"} you made possible</RegularText>
                            <BrandedButton style={styles.discoveriesButton} textProps={{style: styles.discoveriesButtonText}} onPress={() => Linking.openURL('https://covid.joinzoe.com/us')}>Visit the website</BrandedButton>
                        </View>

                        <BrandedButton onPress={this.handleButtonPress}>Report today, even if you're well</BrandedButton>

                        <RegularText style={styles.privacyPolicyText}>
                            <ClickableText
                                style={styles.privacyPolicyClickText}
                                onPress={() => this.props.navigation.navigate('PrivacyPolicyUS')}
                            >Privacy policy</ClickableText> (incl. how to delete your data)
                        </RegularText>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    rootContainer: {
        flex: 1,
        backgroundColor: "#024364",
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    loginContainer: {
        alignSelf: "center",
        fontWeight: "300",
    },

    covidIcon: {
        height: 60,
        width: 60
    },
    appName: {
        flex: 1,
        color: "#FFFFFF",
        paddingHorizontal: 5,
        fontSize: 14,
    },

    covidContainer: {
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    discoveriesButton: {
        backgroundColor: colors.backgroundTertiary,
        alignSelf: "center",
        width: 180,
        margin: 10,
        elevation: 0
    },
    discoveriesButtonText: {
        color: colors.brand,
        fontSize: 16,
        lineHeight: 24,
    },
    discoveriesText: {
        textAlign: "center",
        color: colors.primary,
        fontSize: 16,
        lineHeight: 24,
        marginTop: 10,
        marginBottom: 5,
    },
    discoveriesContainer: {
        padding: 20,
        marginTop: 0,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.backgroundSecondary,
    },
    partnersLogoContainer: {
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.backgroundSecondary,
    },
    partners: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 32,
        justifyContent: "space-between",
        alignContent: "center",
    },
    subtitle: {
        color: "#FFFFFF",
        fontSize: 24,
        lineHeight: 38,
        paddingVertical: 24,
        textAlign: "center",
        marginTop: 15,
    },

    noAdvice: {
        color: colors.secondary,
        textAlign: "center"
    },
    partnersLogo: {
        height: 60,
        width: '95%',
        resizeMode: 'contain',
        alignSelf: "center",
    },
    flagIcon: {
        height: 32,
        width: 32
    },
    privacyPolicyText: {
        fontSize: 14,
        color: colors.secondary,
        alignSelf: 'center',
    },
    privacyPolicyClickText: {
        fontSize: 14,
        lineHeight: 20,
        textDecorationLine: "underline",
    },
    menuIcon: {
        height: 20,
        width: 20,
        tintColor: colors.white
    }
});
