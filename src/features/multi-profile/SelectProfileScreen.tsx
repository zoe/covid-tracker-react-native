import React, {Component} from "react";
import {Image, SafeAreaView, ScrollView, Share, StyleSheet, View} from "react-native";
import {Header, isAndroid, ProgressBlock} from "../../components/Screen";
import {BrandedButton, ClickableText, HeaderText, RegularBoldText, RegularText} from "../../components/Text";
import ProgressStatus from "../../components/ProgressStatus";
import {colors, fontStyles} from "../../../theme"
import {ScreenParamList} from "./../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {covidIcon, profilesIcon} from "../../../assets";
import i18n from "../../locale/i18n"
import {Linking} from "expo";
import {Form, Text} from "native-base";

type RenderProps = {
    navigation: StackNavigationProp<ScreenParamList, 'SelectProfile'>
    route: RouteProp<ScreenParamList, 'SelectProfile'>;
}

export default class SelectProfileScreen extends Component<RenderProps, {}> {

    render() {
        return (
            <View style={styles.view}>
                <SafeAreaView>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.rootContainer}>
                            <Header>
                                <HeaderText>Select profile you want to report for</HeaderText>
                                <RegularText>Or add more profiles</RegularText>
                            </Header>

                            <View style={styles.shareContainer}>

                                <BrandedButton onPress={() => this.props.navigation.navigate('CovidTest')}>
                                    <Text style={[fontStyles.bodyLight, styles.buttonText]}>Me</Text>
                                </BrandedButton>

                                <BrandedButton onPress={() => this.props.navigation.navigate('SelectProfile')}>
                                    <Text style={[fontStyles.bodyLight, styles.buttonText]}>New profile</Text>
                                </BrandedButton>

                            </View>
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.backgroundSecondary,
    },

    scrollView: {
        flexGrow: 1,
        backgroundColor: colors.backgroundSecondary,
        justifyContent: 'space-between'
    },

    content: {
        justifyContent: "space-between",
        marginVertical: 32,
        marginHorizontal: 18,
    },

    buttonText: {
        color: colors.white,
    },

    rootContainer: {
        padding: 10,
    },

    shareContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

});
