import React, {Component} from "react";
import {Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {colors} from "../../../theme";
import i18n from "../../locale/i18n"
import {BrandedButton, ClickableText, RegularBoldText, RegularText} from "../../components/Text";
import {ScreenParamList} from "../ScreenParamList";
import {covidIcon, ukFlagSmall, usFlagSmall, usLogos} from "../../../assets";
import {isUSLocale} from "../../core/user/UserService";

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'Welcome'>
}

const PurpleSlash = () => <RegularBoldText style={styles.purpleSlash}>/</RegularBoldText>;

export class WelcomeUSScreen extends Component<PropsType, {}> {

    render() {
        const flagIcon = () => {
            if (isUSLocale()) {
                return usFlagSmall
            } else {
                return ukFlagSmall
            }
        };

        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.rootContainer}>

                    <View style={styles.covidContainer}>
                        <View style={styles.headerRow}>
                            <Image source={covidIcon} style={styles.covidIcon} resizeMode="contain"/>
                            <Text style={styles.appName}>COVID Symptom Tracker</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CountrySelect', {patientId: null})}>
                                <Image style={styles.flagIcon} source={flagIcon()}/>
                            </TouchableOpacity>

                            <View style={styles.loginContainer}>
                                <ClickableText style={styles.login} onPress={() => this.props.navigation.navigate('Login')}>Sign in</ClickableText>
                            </View>
                        </View>
                        <View>
                            <RegularText style={styles.subtitle}>
                                Take 1 minute each day and help fight the outbreak in your community.{"\n"}
                            </RegularText>
                            <RegularText style={styles.subheader}>No information you share will be used for commercial purposes. You do not need to give us your name. This app does not give health advice.</RegularText>
                        </View>
                    </View>

                    <View style={styles.partners}>
                        <RegularBoldText style={styles.partnerHeader}>
                            From Physicians and Researchers at
                        </RegularBoldText>

                        <RegularText style={styles.partnerList}>
                            Massachusetts General Hospital <PurpleSlash/> Harvard T.H. Chan School of Public Health <PurpleSlash/> King's College London <PurpleSlash/> Stanford University School of Medicine <PurpleSlash/> ZOE
                        </RegularText>

                        <View style={styles.partnersLogoContainer}>
                            <Image style={styles.partnersLogo} source={usLogos}/>
                        </View>

                        <BrandedButton
                            onPress={() => this.props.navigation.navigate('BeforeWeStartUS')}>{i18n.t("create-account-btn")}</BrandedButton>
                        <ClickableText onPress={() => Linking.openURL('https://covid.joinzoe.com/us')} style={styles.moreInfo}>
                            {"For more info "}
                            <RegularText style={styles.moreInfoHighlight}>visit our website</RegularText>
                        </ClickableText>
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
        justifyContent: "space-between",
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
        color: "#FFFFFF",
        paddingHorizontal: 5,
        fontSize: 14,
    },

    covidContainer: {
        paddingHorizontal: 24,
        paddingVertical: 24,
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

    partnerHeader: {
        textAlign: "center",
    },

    partnerList: {
        marginTop: 0,
        textAlign: "center",
    },

    login: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    title: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 32,
        paddingVertical: 10,
    },

    subheader: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 14,
        fontWeight: "300",
        lineHeight: 20,
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
        color: colors.primary,
        textAlign: "center",
        marginVertical: 20,
    },
    nhsWebsite: {
        color: colors.secondary,
        textDecorationLine: "underline"
    },
    purpleSlash: {
        color: colors.purpleAccent,
    },
    partnersLogoContainer: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.backgroundSecondary,
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
    moreInfo: {
        textAlign: "center",
        lineHeight: 20,
        fontSize: 14,
        color: colors.primary
    },
    moreInfoHighlight: {
        color: colors.purpleAccent,
        lineHeight: 20,
        fontSize: 14,
    }
});
