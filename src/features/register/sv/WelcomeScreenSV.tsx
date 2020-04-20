import React, {Component} from "react";
import {StyleSheet, View, Linking, Image, Text, ScrollView, TouchableOpacity} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {colors} from "../../../../theme";
import i18n from "../../../locale/i18n"
import {BrandedButton, ClickableText, RegularText} from "../../../components/Text";
import {ScreenParamList} from "../../ScreenParamList";
import {covidIcon, partnersLogo, svFlagSmall, ukFlagSmall, usFlagSmall} from "../../../../assets";
import UserService, {isUSLocale} from "../../../core/user/UserService";
import CountryIpModal from ".././CountryIpModal";
import { ContributionCounter } from "../../../components/ContributionCounter";

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'Welcome'>
}

type WelcomeScreenState = {
    userCount: string | null
    ipModalVisible: boolean
}

export class WelcomeScreenSV extends Component<PropsType, WelcomeScreenState> {
    userService = new UserService();
    state = {
        userCount: null,
        ipModalVisible: false
    };

    async componentDidMount() {

        const userCount = await this.userService.getUserCount();
        this.setState({userCount});
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.rootContainer}>

                    <View style={styles.covidContainer}>
                        <View style={styles.headerRow}>
                            <Image source={covidIcon} style={styles.covidIcon} resizeMode="contain"/>
                            <Text style={styles.appName}>COVID Symptom Tracker</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CountrySelect', {patientId: null})}>
                                <Image style={styles.flagIcon} source={svFlagSmall}/>
                            </TouchableOpacity>

                            <View style={styles.loginContainer}>
                                <ClickableText style={styles.login} onPress={() => this.props.navigation.navigate('Login')}>Sign in</ClickableText>
                            </View>
                        </View>
                        <View>
                            <RegularText style={styles.subtitle}>
                                Sweden
                            </RegularText>
                            <ContributionCounter variant={1} count={this.state.userCount}/>
                            <RegularText style={styles.subheader}>{"\n"}This app allows you to help others, but does {"\n"} not give health advice. If you need health {"\n"} advice please{" "}
                                <ClickableText style={[styles.subheader, styles.nhsWebsite]} onPress={() => Linking.openURL("https://www.nhs.uk/conditions/coronavirus-covid-19/")}>visit the NHS website</ClickableText>.
                                {"\n"}{"\n"}
                            </RegularText>
                        </View>
                    </View>

                    <CountryIpModal navigation={this.props.navigation}
                                    isModalVisible={this.state.ipModalVisible}
                                    closeModal={() => this.setState({ipModalVisible: false})}/>

                    <View style={styles.partners}>

                        <Image source={partnersLogo} style={styles.partnersLogo} resizeMode="contain"/>

                        <BrandedButton onPress={async () => {
                            if (await this.userService.shouldAskCountryConfirmation()) {
                                this.setState({ipModalVisible: true})
                            } else {
                                this.props.navigation.navigate('Consent', {viewOnly: false})
                            }
                        }}>
                            {i18n.t("create-account-btn")}
                        </BrandedButton>
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
        backgroundColor: colors.brand,
        paddingTop: 16,
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
    login: {
        color: colors.white,
        fontWeight: "700",
    },

    subheader: {
        color: colors.white,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "300",
        lineHeight: 20,
    },

    subtitle: {
        color: colors.white,
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
    },
    moreInfoHighlight: {
        color: colors.purple,
        lineHeight: 20,
        fontSize: 14,
    }
});
