import React, {Component} from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {colors} from "../../../theme";
import {BrandedButton, ClickableText, RegularText} from "../../components/Text";
import {ScreenParamList} from "../ScreenParamList";
import {covidIcon, menuIcon, gbPartnersReturn, svPartnersReturn, usPartnersReturn} from "../../../assets";
import {RouteProp} from "@react-navigation/native";
import UserService, {isGBLocale, isSVLocale, isUSLocale} from "../../core/user/UserService";
import {AsyncStorageService} from "../../core/AsyncStorageService";
import {PushNotificationService} from "../../core/PushNotificationService";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {Linking} from "expo";
import {ContributionCounter} from "../../components/ContributionCounter";
import i18n from "../../locale/i18n";

type PropsType = {
    navigation: DrawerNavigationProp<ScreenParamList, 'WelcomeRepeat'>
    route: RouteProp<ScreenParamList, 'WelcomeRepeat'>;
}

type WelcomeRepeatScreenState = {
    userCount: string | null
}

export class WelcomeRepeatScreen extends Component<PropsType, WelcomeRepeatScreenState> {
    state = {userCount: null};

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

    navigateToPrivacyPolicy = () => {
        if (isUSLocale()) {
            this.props.navigation.navigate('PrivacyPolicyUS', {viewOnly: true})
        } else {
            this.props.navigation.navigate('PrivacyPolicyUK', {viewOnly: true})
        }
    };

    openWebsite = () => {
        if (isUSLocale()) {
            Linking.openURL('https://covid.joinzoe.com/us')
        } else {
            Linking.openURL('https://covid.joinzoe.com/')
        }
    };

    partnersLogos = () => {
        if (isGBLocale()) {
            return gbPartnersReturn
        } else if (isSVLocale()) {
            return svPartnersReturn
        } else {
            return usPartnersReturn
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.safeView}>
                <View style={styles.rootContainer}>

                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.toggleDrawer()
                        }}>
                            <Image source={menuIcon} style={styles.menuIcon}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.covidIconBackground}>
                        <Image source={covidIcon} style={styles.covidIcon} resizeMode="contain"/>
                    </View>

                    <Text style={styles.appName}>{i18n.t("welcome.title")}</Text>

                    <RegularText style={styles.subtitle}>{i18n.t("welcome.take-a-minute")}</RegularText>

                    <ContributionCounter variant={2} count={this.state.userCount}/>

                    <Image style={styles.partnersLogo} source={this.partnersLogos()}/>

                    <View style={{flex: 1}}/>


                    <TouchableOpacity style={styles.discoveriesContainer} onPress={this.openWebsite}>
                        <View style={styles.discoveriesTitleBackground}>
                            <RegularText style={styles.discoveriesTitle}>{i18n.t("welcome.research")}</RegularText>
                        </View>
                        <RegularText style={styles.discoveriesText}>{i18n.t("welcome.see-how-your-area-is-affected")}</RegularText>
                        <RegularText style={styles.discoveriesVisitText}>{i18n.t("welcome.visit-the-website")}</RegularText>
                    </TouchableOpacity>

                    <BrandedButton style={styles.reportButton} onPress={this.handleButtonPress}>{i18n.t("welcome.report-button")}</BrandedButton>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: colors.brand,
    },
    rootContainer: {
        paddingHorizontal: 24,
        paddingTop: 24,
        flex: 1,
        alignItems: 'center',
    },
    headerRow: {
        alignSelf: 'stretch',
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    covidIconBackground: {
        backgroundColor: colors.predict,
        padding: 8,
        borderRadius: 8,
        marginVertical: 24,
    },
    covidIcon: {
        height: 48,
        width: 48
    },
    appName: {
        color: colors.white,
        fontSize: 14,
    },
    subtitle: {
        color: colors.white,
        fontSize: 24,
        lineHeight: 38,
        textAlign: "center",
        marginTop: 16,
    },
    discoveriesButton: {
        backgroundColor: colors.backgroundTertiary,
        alignSelf: "center",
        width: 180,
        margin: 10,
        elevation: 0
    },
    discoveriesVisitText: {
        color: colors.lightBrand,
        fontSize: 16,
        lineHeight: 24,
    },
    discoveriesTitleBackground: {
        backgroundColor: colors.slashBlue,
        paddingHorizontal: 4,
        borderRadius: 4,
    },
    discoveriesTitle: {
        fontSize: 12,
        color: colors.white,
        letterSpacing: 0.2,

    },
    discoveriesText: {
        textAlign: "center",
        marginHorizontal: 100,
        marginVertical: 8,
        color: colors.white,
        fontSize: 16,
        lineHeight: 24,
    },
    discoveriesContainer: {
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    partnersLogo: {
        width: '95%',
        height: 100,
        resizeMode: 'contain',
    },
    menuIcon: {
        height: 20,
        width: 20,
        tintColor: colors.white
    },
    reportButton: {
        marginTop: 48,
        textAlign: 'center',
        backgroundColor: colors.purple,
        alignSelf: "center",
        width: '100%',
        elevation: 0
    }
});
