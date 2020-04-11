import React, {Component} from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {colors} from "../../../../theme";
import i18n from "../../../locale/i18n"
import {BrandedButton, ClickableText, RegularBoldText, RegularText} from "../../../components/Text";
import {ScreenParamList} from "../../ScreenParamList";
import {ukFlagSmall, usFlagSmall, usLogos2} from "../../../../assets";
import UserService, {isUSLocale} from "../../../core/user/UserService";

const Slash = () => <RegularBoldText style={styles.slash}>/</RegularBoldText>;

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'Welcome'>
}

type WelcomeUSScreenState = {
    userCount: string | null
}

export class Welcome2USScreen extends Component<PropsType, WelcomeUSScreenState> {
    state = {
        userCount: null,
    };

    async componentDidMount() {
        const userService = new UserService();
        const userCount = await userService.getUserCount();
        this.setState({userCount});
    }

    render() {
        const flagIcon = () => {
            if (isUSLocale()) {
                return usFlagSmall
            } else {
                return ukFlagSmall
            }
        };

        return (
            <SafeAreaView style={styles.safeView}>
                <View style={styles.rootContainer}>
                    <ScrollView contentContainerStyle={styles.scrollView}>

                        <View style={styles.covidContainer}>
                            <View style={styles.headerRow}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CountrySelect', {patientId: null})}>
                                    <Image style={styles.flagIcon} source={flagIcon()}/>
                                </TouchableOpacity>

                                <ClickableText style={styles.login} onPress={() => this.props.navigation.navigate('Login')}>Sign in</ClickableText>
                            </View>
                            <View>
                                <RegularText style={styles.subtitle}>
                                    How you can help
                                </RegularText>
                                <RegularText style={styles.subheader}>Take 1 minute a day to report how you feel, even if well. Then see how your area is affected.</RegularText>

                                <RegularText style={styles.subheader2}>No information you share will be used for commercial purposes. You do not need to give us your name. This app does not give health advice.</RegularText>

                                <Image style={styles.partnersLogo} source={usLogos2}/>

                            </View>


                            <View style={styles.partnerContainer}>
                                <RegularText style={styles.partnerHeader}>
                                    From Physicians and Researchers at
                                </RegularText>

                                <View style={styles.divider}></View>

                                <RegularText style={styles.partnerList}>
                                    Harvard T.H. Chan School of Public Health <Slash/> Massachusetts General Hospital <Slash/> King's College London <Slash/> Stanford University School of Medicine <Slash/> ZOE
                                </RegularText>

                            </View>
                        </View>
                    </ScrollView>
                </View>


                <View style={styles.buttonContainer}>
                    <BrandedButton
                        onPress={() => this.props.navigation.navigate('BeforeWeStartUS')}>{i18n.t("create-account-btn")}</BrandedButton>
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
        marginLeft: 5,
    },


    subheader: {
        color: colors.primary,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "300",
        lineHeight: 24,
        marginTop: 16,
    },

    subheader2: {
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
        paddingVertical: 0,
        textAlign: "center",
        marginTop: 25,
    },

    slash: {
        color: colors.slashBlue,
    },

    partnersLogo: {
        marginTop: 28,
        height: 120,
        width: '100%',
        resizeMode: 'contain',
        alignSelf: "center",
    },
    partnerContainer: {
        marginVertical: 40,
        paddingVertical: 20,
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

});
