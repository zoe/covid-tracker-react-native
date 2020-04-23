import React, {Component} from "react";
import {Dimensions, Image, Linking, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {colors} from "../../../theme";
import i18n from "../../locale/i18n"
import {BrandedButton, ClickableText, RegularBoldText, RegularText} from "../../components/Text";
import {ScreenParamList} from "../ScreenParamList";
import {svFlagSmall, ukFlagSmall, usFlagSmall, usPartners, gbPartners, svPartners} from "../../../assets";
import UserService, {isGBLocale, isSVLocale, isUSLocale} from "../../core/user/UserService";
import CountryIpModal from "./CountryIpModal";

const Slash = () => <RegularBoldText style={styles.slash}> / </RegularBoldText>;

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'Welcome'>
}

type WelcomeScreenState = {
    userCount: string | null
    ipModalVisible: boolean
}

export class Welcome2Screen extends Component<PropsType, WelcomeScreenState> {
    userService = new UserService();
    state = {
        userCount: null,
        ipModalVisible: false,
    };


    partnersLogos = () => {
        if (isGBLocale()) {
            return gbPartners
        } else if (isSVLocale()) {
            return svPartners
        } else {
            return usPartners
        }
    };

    flagIcon = () => {
        if (isGBLocale()) {
            return ukFlagSmall
        } else if (isSVLocale()) {
            return svFlagSmall
        } else {
            return usFlagSmall
        }
    };

    helpUrl = () => {
        if (isGBLocale()) {
            Linking.openURL("https://www.nhs.uk/conditions/coronavirus-covid-19/")
        } else if (isSVLocale()) {
            Linking.openURL("https://www.1177.se")
        }
    };

    async componentDidMount() {
        const userService = new UserService();
        const userCount = await userService.getUserCount();
        this.setState({userCount});
    }

    render() {
        return (
            <SafeAreaView style={styles.safeView}>
                <View style={styles.rootContainer}>
                    <ScrollView contentContainerStyle={styles.scrollView}>

                        <View style={styles.covidContainer}>
                            <View style={styles.headerRow}>
                                <ClickableText style={styles.login} onPress={() => this.props.navigation.navigate('Login')}>
                                    {i18n.t("welcome.sign-in")}
                                </ClickableText>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CountrySelect', {patientId: null})}>
                                    <Image style={styles.flagIcon} source={this.flagIcon()}/>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <RegularText style={styles.subtitle}>
                                    {i18n.t("welcome.how-you-can-help.title")}
                                </RegularText>
                                <RegularText style={styles.subheader}>
                                    {i18n.t("welcome.how-you-can-help.text1")}
                                </RegularText>

                                {isUSLocale() && (
                                    <RegularText style={styles.subheader2}>
                                        {i18n.t("welcome.how-you-can-help.text2")}
                                    </RegularText>
                                )}

                                {(isSVLocale() || isGBLocale()) && (
                                    <RegularText style={styles.subheader2}>{"\n"}{i18n.t("welcome.disclaimer")}{" "}
                                        <ClickableText style={[styles.subheader2, styles.nhsWebsite]}
                                                       onPress={this.helpUrl}>
                                            {i18n.t("welcome.disclaimer-link")}
                                        </ClickableText>.
                                    </RegularText>
                                )}

                                <Image style={styles.partnersLogo} source={this.partnersLogos()}/>
                            </View>

                            {isUSLocale() && (
                                <View style={styles.partnerContainer}>
                                    <RegularText style={styles.partnerHeader}>
                                        {i18n.t("welcome.from-researchers")}
                                    </RegularText>

                                    <View style={styles.divider}/>

                                    <RegularText style={styles.partnerList}>
                                        {i18n.t("names.harvard-th-chan-school-of-public-health")}<Slash/>
                                        {i18n.t("names.mass-general-hospital")}<Slash/>
                                        {i18n.t("names.kings-college-london")}<Slash/>
                                        {i18n.t("names.stanford-university-school-of-medicine")}<Slash/>
                                        {i18n.t("names.zoe")}
                                    </RegularText>
                                </View>
                            )}

                        </View>
                    </ScrollView>
                </View>

                <CountryIpModal navigation={this.props.navigation}
                                isModalVisible={this.state.ipModalVisible}
                                closeModal={() => this.setState({ipModalVisible: false})}/>

                <View style={styles.buttonContainer}>
                    <BrandedButton
                        onPress={async () => {
                            if (await this.userService.shouldAskCountryConfirmation()) {
                                this.setState({ipModalVisible: true})
                            } else {
                                if (isUSLocale()) {
                                    this.props.navigation.navigate('BeforeWeStartUS')
                                } else {
                                    this.props.navigation.navigate('Consent', {viewOnly: false})
                                }
                            }
                        }}>{i18n.t("welcome.create-account")}</BrandedButton>
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeView: {
        flexGrow: 1,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    rootContainer: {
        flex: 1,
        backgroundColor: colors.backgroundSecondary,
    },
    headerRow: {
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    covidContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 24
    },
    partnerHeader: {
        textAlign: "center",
        fontSize: 14,
        lineHeight: 20
    },
    divider: {
        height: 1,
        backgroundColor: colors.backgroundFour,
        marginVertical: 5,
    },
    partnerList: {
        marginTop: 0,
        textAlign: "center",
        fontSize: 16,
        lineHeight: 24,
    },
    login: {
        color: colors.primary,
        marginHorizontal: 16,
    },
    subheader: {
        paddingVertical: 8,
        color: colors.primary,
        textAlign: "center",
        fontSize: 16,
        lineHeight: 24,
        marginTop: 16,
    },
    subheader2: {
        paddingVertical: 8,
        color: colors.secondary,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "300",
        lineHeight: 24,
        marginTop: 8,
    },
    subtitle: {
        color: colors.primary,
        fontSize: 24,
        lineHeight: 32,
        paddingVertical: 8,
        textAlign: "center",
        marginTop: 25,
    },
    slash: {
        color: colors.slashBlue,
    },
    partnersLogo: {
        marginVertical: 16,
        height: 160,
        width: '100%',
        resizeMode: 'contain',
        alignSelf: "center",
    },
    partnerContainer: {
        marginVertical: 16,
        paddingHorizontal: 30,
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    buttonContainer: {
        padding: 20,
    },
    flagIcon: {
        height: 32,
        width: 32
    },
    nhsWebsite: {
        textDecorationLine: "underline"
    },
});
