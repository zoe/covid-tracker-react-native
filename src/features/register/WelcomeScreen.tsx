import React, {Component} from "react";
import {StyleSheet, View, Linking, Image, Text, ScrollView, TouchableOpacity} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {colors} from "../../../theme";
import i18n from "../../locale/i18n"
import {BrandedButton, ClickableText, RegularText} from "../../components/Text";
import {ScreenParamList} from "../ScreenParamList";
import {covidIcon, partnersLogo, ukFlagSmall, usFlagSmall} from "../../../assets";
import {isUSLocale} from "../../core/user/UserService";

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'Welcome'>
}

export class WelcomeScreen extends Component<PropsType, {}> {


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
                                Take 1 minute each day and help fight the outbreak.{"\n"}
                            </RegularText>
                            <RegularText style={styles.subheader}>This app allows you to help others, but does {"\n"} not give health advice. If you need health {"\n"} advice please{" "}
                                <ClickableText style={[styles.subheader, styles.nhsWebsite]} onPress={() => Linking.openURL("https://www.nhs.uk/conditions/coronavirus-covid-19/")}>visit the NHS website</ClickableText>.
                                {"\n"}{"\n"}
                            </RegularText>
                        </View>
                    </View>

                    <View style={styles.partners}>

                        <Image source={partnersLogo} style={styles.partnersLogo} resizeMode="contain"/>

                        <BrandedButton onPress={() => this.props.navigation.navigate('Terms')}>{i18n.t("create-account-btn")}</BrandedButton>
                        <ClickableText onPress={() => Linking.openURL('https://covid.joinzoe.com/')} style={styles.moreInfo}>
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
    nhsWebsite: {
        textDecorationLine: "underline"
    },
    partnersLogo: {
        height: 120,
        resizeMode: 'center',
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 20,
    },
    flagIcon: {
        height: 32,
        width: 32
    },
    moreInfo: {
        marginTop: 10,
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
