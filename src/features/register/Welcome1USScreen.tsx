import React, {Component} from "react";
import {Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
                <SafeAreaView style={styles.safeView}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.rootContainer}>

                            <View style={styles.covidContainer}>
                                <View style={styles.headerRow}>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CountrySelect', {patientId: null})}>
                                        <Image style={styles.flagIcon} source={flagIcon()}/>
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.usMapContainer}>
                                    <Image style={styles.usMap} source={usMap} resizeMode="contain"/>
                                </View>

                                <View>

                                    <RegularText style={styles.subtitle}>
                                        Take 1 minute each day and help fight the outbreak in your community.
                                    </RegularText>
                                    <View style={styles.contributors}>
                                        <ContributionCounter variant={1} count={this.state.userCount}/>
                                    </View>
                                </View>


                            </View>

                        </View>
                    </ScrollView>

                    <View style={styles.nextButtonContainer}>
                        <BrandedButton style={styles.nextButton} onPress={() => this.props.navigation.navigate('Welcome2US')}>Tell me more</BrandedButton>
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
        backgroundColor: "#024364",
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    rootContainer: {
        flex: 1,
        backgroundColor: "#024364",
    },

    nextButtonContainer: {
        padding: 20,
        paddingBottom: 30,
    },

    nextButton: {
        backgroundColor: colors.purpleAccent,
    },

    headerRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
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
        color: "#FFFFFF",
        fontSize: 32,
        lineHeight: 48,
        paddingVertical: 24,
        textAlign: "center",
        marginTop: 15,
        fontWeight: "300",
    },


    purpleSlash: {
        color: colors.purpleAccent,
    },

    flagIcon: {
        height: 32,
        width: 32
    },

    contributors: {
        marginTop: 40,
        marginHorizontal: 10
    }
});
