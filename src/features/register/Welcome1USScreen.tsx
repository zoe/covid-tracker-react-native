import React, {Component} from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {colors} from "../../../theme";
import {BrandedButton, RegularText} from "../../components/Text";
import {ScreenParamList} from "../ScreenParamList";
import {svFlagSmall, ukFlagSmall, usFlagSmall, usMap, usMap2} from "../../../assets";
import UserService, {isGBLocale, isSVLocale, isUSLocale} from "../../core/user/UserService";
import {ContributionCounter} from "../../components/ContributionCounter";
import i18n from "../../locale/i18n";

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
            if (isGBLocale()) {
                return ukFlagSmall
            } else if (isSVLocale()) {
                return svFlagSmall
            } else {
                return usFlagSmall
            }
        };

        const mapImage = () => {
            if (isGBLocale()) {
                return usMap
            } else if (isSVLocale()) {
                return usMap
            } else {
                return usMap
            }
        };

        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <SafeAreaView style={styles.safeView}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.rootContainer}>

                            <View style={styles.covidContainer}>
                                <View style={styles.headerRow}>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CountrySelect', {patientId: null})}>
                                        <Image style={styles.flagIcon} source={flagIcon()}/>
                                    </TouchableOpacity>
                                </View>

                                <Image style={styles.usMap} source={mapImage()} resizeMode="contain"/>
                                
                                <RegularText style={styles.subtitle}>
                                     {i18n.t("welcome.take-a-minute")}
                                </RegularText>

                            </View>

                        </View>
                    </ScrollView>

                    <View style={styles.contributors}>
                        <ContributionCounter variant={1} count={this.state.userCount}/>
                    </View>

                    <View style={styles.nextButtonContainer}>
                        <BrandedButton style={styles.nextButton} onPress={() => this.props.navigation.navigate('Welcome2US')}>{i18n.t("welcome.tell-me-more")}</BrandedButton>
                    </View>

                </SafeAreaView>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    safeView: {
        flexGrow: 1,
    },
    scrollView: {
        backgroundColor: colors.brand,
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    rootContainer: {
        flex: 1,
        backgroundColor: colors.brand,
    },
    nextButtonContainer: {
        padding: 20,
        paddingBottom: 30,
    },
    nextButton: {
        backgroundColor: colors.purple,
        fontSize: 16,
    },
    headerRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    covidContainer: {
        paddingHorizontal: 14,
        paddingBottom: 14,
        paddingTop: 14
    },
    usMap: {
        height: 200,
        width: '100%',
        resizeMode: 'contain',
        alignSelf: "center",
    },
    subtitle: {
        color: colors.white,
        fontSize: 32,
        lineHeight: 48,
        paddingVertical: 24,
        paddingHorizontal: 40,
        textAlign: "center",
        marginTop: 24,
        fontWeight: "300",
    },
    flagIcon: {
        height: 32,
        width: 32
    },
    contributors: {
        paddingHorizontal: 32,
        marginBottom: 32,
    }
});
