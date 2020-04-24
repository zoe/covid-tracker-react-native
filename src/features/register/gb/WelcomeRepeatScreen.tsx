import React, {Component} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../../theme";

import { BrandedButton, ClickableText, RegularText } from "../../../components/Text";
import {ScreenParamList} from "../../ScreenParamList";
import {covidIcon, menuIcon, partnersLogo} from "../../../../assets";

import {RouteProp} from "@react-navigation/native";
import UserService from "../../../core/user/UserService";
import {AsyncStorageService} from "../../../core/AsyncStorageService";
import {PushNotificationService} from "../../../core/PushNotificationService";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {Linking} from "expo";
import { ContributionCounter } from "../../../components/ContributionCounter";
import i18n from "../../../locale/i18n";

type PropsType = {
    navigation: DrawerNavigationProp<ScreenParamList, 'WelcomeRepeat'>
    route: RouteProp<ScreenParamList, 'WelcomeRepeat'>;
}

type WelcomeRepeatScreenState = {
    userCount: string | null
}

export class WelcomeRepeatScreen extends Component<PropsType, WelcomeRepeatScreenState> {
    state = { userCount: null };

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
        this.props.navigation.navigate('SelectProfile');
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.rootContainer}>

                    <View style={styles.covidContainer}>
                        <View style={styles.headerRow}>
                            <Image source={covidIcon} style={styles.covidIcon} resizeMode="contain"/>
                            <Text style={styles.appName}>{i18n.t("welcome.title")}</Text>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.toggleDrawer()
                            }}>
                                <Image source={menuIcon} style={styles.menuIcon}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <RegularText style={styles.subtitle}>
                                 {i18n.t("welcome.take-a-minute")}
                            </RegularText>
                            <ContributionCounter variant={2} count={this.state.userCount}/>

                        </View>
                    </View>

                    <View style={styles.partners}>

                        <Image source={partnersLogo} style={styles.partnersLogo} resizeMode="contain"/>

                        <View style={styles.discoveriesContainer}>
                            <RegularText style={styles.discoveriesText}>{i18n.t("welcome.see-how-your-area-is-affected")}</RegularText>
                            <BrandedButton style={styles.discoveriesButton} textProps={{style: styles.discoveriesButtonText}} onPress={() => Linking.openURL('https://covid.joinzoe.com/')}>{i18n.t("welcome.visit-the-website")}</BrandedButton>
                        </View>

                        <BrandedButton onPress={this.handleButtonPress}>{i18n.t("welcome.report-button")}</BrandedButton>

                        <RegularText style={styles.privacyPolicyText}>
                            <ClickableText
                                style={styles.privacyPolicyClickText}
                                onPress={() => this.props.navigation.navigate('PrivacyPolicyUK', {viewOnly: true})}
                            >{i18n.t("welcome.privacy-policy")}</ClickableText>{" "}{i18n.t("welcome.privacy-policy-subtext")}
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
        backgroundColor: colors.brand,
        paddingTop: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    covidIcon: {
        height: 60,
        width: 60
    },
    appName: {
        flex: 1,
        color: colors.white,
        paddingHorizontal: 5,
        fontSize: 14,
    },

    covidContainer: {
        paddingHorizontal: 24,
        paddingVertical: 24,
    },

    partners: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 32,
        justifyContent: "space-between",
        alignContent: "center",
    },
    subtitle: {
        color: colors.white,
        fontSize: 24,
        lineHeight: 38,
        paddingVertical: 24,
        textAlign: "center",
        marginTop: 15,
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
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.backgroundSecondary,
    },
    partnersLogo: {
        resizeMode: 'center',
        alignSelf: "center",
        height: 120,
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
