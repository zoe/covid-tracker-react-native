import React, {Component} from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Header} from "../../components/Screen";
import {BrandedButton, ClickableText, HeaderText, RegularBoldText, RegularText} from "../../components/Text";
import {colors, fontStyles} from "../../../theme"
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {profilesIcon} from "../../../assets";
import {Text} from "native-base";

type RenderProps = {
    navigation: StackNavigationProp<ScreenParamList, 'ReportForOther'>
    route: RouteProp<ScreenParamList, 'ReportForOther'>;
}

export default class ReportForOtherScreen extends Component<RenderProps, {}> {

    render() {
        return (
            <View style={styles.view}>
                <SafeAreaView>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.rootContainer}>
                            <Header>
                                <HeaderText>Reporting on behalf of someone else?</HeaderText>
                                <RegularText>You can now create profiles for other people on whose behalf you want to report.</RegularText>
                            </Header>

                            <View style={styles.shareContainer}>
                                <Image source={profilesIcon} style={styles.icon}/>

                                <View style={styles.innerContainer}>
                                    <RegularBoldText style={styles.innerContainer}>Add profiles</RegularBoldText>
                                    <RegularText style={styles.innerContainer}>You can now report on behalf of someone else.</RegularText>
                                </View>

                                <BrandedButton onPress={() => this.props.navigation.navigate('CreateProfile')}>
                                    <Text style={[fontStyles.bodyLight, styles.buttonText]}>Add profiles</Text>
                                </BrandedButton>
                            </View>

                            <RegularText style={styles.shareSubtitle}>
                                Not right now? You can add additional profiles from the menu icon above at any time.
                            </RegularText>

                            <ClickableText onPress={() => this.props.navigation.navigate('ThankYou')} style={styles.done}>Skip</ClickableText>

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


    button: {
        borderRadius: 8,
        height: 56,
        backgroundColor: colors.brand,
    },
    buttonText: {
        color: colors.white,
    },


    rootContainer: {
        padding: 10,
    },


    share: {
        fontSize: 20,
        textAlign: "center",
    },

    newsFeed: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        fontSize: 20,
        textAlign: "center",
        color: colors.primary,
    },
    newsFeedClickable: {
        fontSize: 20,
        color: colors.purple,
        textDecorationLine: 'underline',
    },
    shareSubtitle: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        textAlign: "center",
        color: colors.secondary
    },

    shareButton: {
        marginVertical: 20,
        marginHorizontal: 30,
    },

    shareContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
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
        fontSize: 24,
    }

});
