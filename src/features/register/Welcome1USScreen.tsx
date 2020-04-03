import React, {Component} from "react";
import {Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {colors} from "../../../theme";
import i18n from "../../locale/i18n"
import {BrandedButton, ClickableText, RegularBoldText, RegularText} from "../../components/Text";
import {ScreenParamList} from "../ScreenParamList";
import {covidIcon, ukFlagSmall, usFlagSmall, usLogos, usMap} from "../../../assets";
import UserService, {isUSLocale} from "../../core/user/UserService";
import {ContributionCounter} from "../../components/ContributionCounter";

const PurpleSlash = () => <RegularBoldText style={styles.purpleSlash}>/</RegularBoldText>;

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'Welcome'>
}

type WelcomeUSScreenState = {
    userCount: string | null
}

export class Welcome1USScreen extends Component<PropsType, WelcomeUSScreenState> {
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
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.rootContainer}>

                    <View style={styles.covidContainer}>
                        <View style={styles.headerRow}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CountrySelect', {patientId: null})}>
                                <Image style={styles.flagIcon} source={flagIcon()}/>
                            </TouchableOpacity>

                            <View style={styles.loginContainer}>
                                <ClickableText style={styles.login} onPress={() => this.props.navigation.navigate('Login')}>Sign in</ClickableText>
                            </View>
                        </View>
                        <View style={styles.usMapContainer}>
                            <Image style={styles.usMap} source={usMap} resizeMode="contain"/>
                        </View>

                        <View>

                            <RegularText style={styles.subtitle}>
                                Take 1 minute each day and help fight the outbreak in your community.
                            </RegularText>
                            <ContributionCounter variant={1} count={this.state.userCount}/>
                        </View>


                        <View style={styles.nextButtonContainer}>
                            <BrandedButton style={styles.nextButton} onPress={() => this.props.navigation.navigate('Welcome2US')}>Tell me more</BrandedButton>
                        </View>

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

    nextButtonContainer: {
        paddingTop: 40,
    },

    nextButton: {
        backgroundColor: colors.purpleAccent,
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
        paddingBottom: 24,
        paddingTop: 48
    },
    usMapContainer: {},
    usMap: {
        height: 250,
        width: '100%',
        resizeMode: 'contain',
        alignSelf: "center",
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
        fontSize: 36,
        lineHeight: 48,
        paddingVertical: 24,
        textAlign: "center",
        marginTop: 15,
        fontWeight: "300",
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
