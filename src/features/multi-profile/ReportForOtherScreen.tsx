import React, {Component} from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Header} from "../../components/Screen";
import {BrandedButton, ClickableText, HeaderText, RegularBoldText, RegularText, SecondaryText} from "../../components/Text";
import {colors} from "../../../theme"
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {profilesIcon} from "../../../assets";
import {Text} from "native-base";
import {getLocalThankYou} from "../Navigation";
import UserService from "../../core/user/UserService";

type RenderProps = {
    navigation: StackNavigationProp<ScreenParamList, 'ReportForOther'>
    route: RouteProp<ScreenParamList, 'ReportForOther'>;
}

export default class ReportForOtherScreen extends Component<RenderProps, {}> {

    handleSkip = async () => {
        const userService = new UserService()
        await userService.recordAskedToReportForOther();
        this.props.navigation.navigate(getLocalThankYou())
    }

    render() {
        return (
            <View style={styles.view}>
                <SafeAreaView>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.rootContainer}>
                            <Header>
                                <HeaderText style={{marginBottom: 12}}>Reporting on behalf of someone else?</HeaderText>
                                <SecondaryText>You can now create profiles for other people on whose behalf you want to report.</SecondaryText>
                            </Header>

                            <View style={styles.shareContainer}>
                                <Image source={profilesIcon} style={styles.icon}/>

                                <View style={styles.innerContainer}>
                                    <RegularBoldText style={styles.innerContainerBold}>Add profiles</RegularBoldText>
                                    <RegularText style={styles.innerContainer}>You can now report on behalf of someone else.</RegularText>
                                </View>

                                <BrandedButton onPress={() => this.props.navigation.navigate('CreateProfile', {avatarName: 'profile2'})} style={{marginVertical: 16}}>
                                    <Text>Add profiles</Text>
                                </BrandedButton>
                            </View>

                            <RegularText style={styles.shareSubtitle}>
                                Not right now? You can add additional profiles from the menu icon above at any time.
                            </RegularText>

                            <ClickableText onPress={() => this.handleSkip()} style={styles.done}>Skip</ClickableText>

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

    rootContainer: {
        padding: 10,
    },

    shareSubtitle: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        textAlign: "center",
        color: colors.secondary
    },

    shareContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        margin: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    innerContainerBold: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 18,
        marginBottom: 8
    },

    innerContainer: {
        alignSelf: "center",
        textAlign: "center"
    },

    icon: {
        alignSelf: "center",
        height: 100,
        width: 150,
        resizeMode: "contain"
    },

    done: {
        alignSelf: "center",
        color: colors.primary,
        margin: 40,
        fontSize: 20,
    }

});
