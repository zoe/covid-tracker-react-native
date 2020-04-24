import React, {Component} from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {colors} from "../../../theme";
import {BrandedButton, RegularText} from "../../components/Text";
import {ScreenParamList} from "../ScreenParamList";
import {usMap, gbMap, svMap, svFlag, usFlag, gbFlag} from "../../../assets";
import UserService, {isGBCountry, isSECountry, isUSCountry} from "../../core/user/UserService";
import {ContributionCounter} from "../../components/ContributionCounter";
import i18n from "../../locale/i18n";

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'Welcome'>
}

type WelcomeScreenState = {
    userCount: string | null
}

export class Welcome1Screen extends Component<PropsType, WelcomeScreenState> {
    state = {
        userCount: null,
    };

    async componentDidMount() {
        const userService = new UserService();
        const userCount = await userService.getUserCount();
        this.setState({userCount});
    }

    flagIcon = () => {
        if (isGBCountry()) {
            return gbFlag
        } else if (isSECountry()) {
            return svFlag
        } else {
            return usFlag
        }
    };

    mapImage = () => {
        if (isGBCountry()) {
            return gbMap
        } else if (isSECountry()) {
            return svMap
        } else {
            return usMap
        }
    };

    render() {
        return (
            <View style={styles.safeView}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Image style={styles.mapImage} source={this.mapImage()}/>

                    <TouchableOpacity style={styles.countryFlag} onPress={() => this.props.navigation.navigate('CountrySelect', {patientId: null})}>
                        <Image style={styles.flagIcon} source={this.flagIcon()}/>
                    </TouchableOpacity>

                    <View style={styles.rootContainer}>

                        <View style={styles.covidContainer}>
                            <RegularText style={styles.subtitle}>
                                {i18n.t("welcome.take-a-minute")}
                            </RegularText>
                        </View>
                    </View>
                    <View style={styles.contributors}>
                        <ContributionCounter variant={1} count={this.state.userCount}/>
                    </View>
                </ScrollView>

                <View style={styles.nextButtonContainer}>
                    <BrandedButton style={styles.nextButton}
                                   onPress={() => this.props.navigation.navigate('Welcome2')}>{i18n.t("welcome.tell-me-more")}</BrandedButton>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    safeView: {
        flexGrow: 1,
        backgroundColor: colors.brand,
    },
    scrollView: {
        backgroundColor: colors.brand,
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    rootContainer: {
        marginTop: 32,
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
    countryFlag: {
        position: 'absolute',
        top: 56,
        end: 32,
    },
    covidContainer: {
        paddingHorizontal: 14,
        paddingBottom: 14,
    },
    mapImage: {
        height: 300,
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
