import React, {Component} from "react";
import {Image, ScrollView, Share, StyleSheet, View} from "react-native";
import {Header, isAndroid, ProgressBlock} from "../components/Screen";
import {BrandedButton, ClickableText, HeaderText, RegularBoldText, RegularText} from "../components/Text";
import ProgressStatus from "../components/ProgressStatus";
import {colors} from "../../theme"
import {ScreenParamList} from "./ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {covidIcon} from "../../assets";
import i18n from "../locale/i18n"
import {Linking} from "expo";
import { CovidRating } from "../components/CovidRating";
import UserService from "../core/user/UserService";

type RenderProps = {
    navigation: StackNavigationProp<ScreenParamList, 'ThankYou'>
    route: RouteProp<ScreenParamList, 'ThankYou'>;
}

export default class ThankYouScreen extends Component<RenderProps, {askForRating: boolean}> {
    state = {
        askForRating: false
    };

    shareMessage = i18n.t("share-with-friends-message");
    shareUrl = i18n.t("share-with-friends-url");

    shareApp = async () => {
        const message = this.shareMessage + (isAndroid ? " " + this.shareUrl : ""); // On Android add link to end of message
        try {
            const result = await Share.share({
                message: message,
                url: this.shareUrl, // IOS has separate field for URL
            })
        } catch (error) {
        }
    };

    async componentDidMount() {
        // Ask for rating if not asked before and server indicates eligible.
        const userService = new UserService();
        const profile = await userService.getProfile();
        const eligibleToAskForRating = profile.ask_for_rating;
        const askedToRateStatus = await userService.getAskedToRateStatus();
        if (!askedToRateStatus && eligibleToAskForRating) {this.setState({askForRating: true})}
    }


    render() {
        return (
            <>
                {this.state.askForRating && <CovidRating /> }
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.rootContainer}>
                        <Header>
                            <HeaderText>{i18n.t("thank-you-title")}</HeaderText>
                        </Header>

                        <ProgressBlock>
                            <ProgressStatus step={5} maxSteps={5}/>
                        </ProgressBlock>

                        <View style={styles.content}>
                            <RegularText>{i18n.t("thank-you-body")}</RegularText>
                        </View>

                        <View style={styles.shareContainer}>
                            <View style={styles.covidIconContainer}>
                                <Image source={covidIcon} style={styles.covidIcon}/>
                            </View>
                            <RegularBoldText style={styles.share}>Please share this app</RegularBoldText>
                            <RegularText style={styles.shareSubtitle}>
                                The more people report their symptoms, the more we can help those at risk.
                            </RegularText>
                            <BrandedButton onPress={this.shareApp} style={styles.shareButton}>Share this app</BrandedButton>
                        </View>

                        <ClickableText onPress={() => Linking.openURL(i18n.t('blog-link'))} style={styles.newsFeed}>
                            {"Please check our "}
                            <RegularText style={styles.newsFeedClickable}>news feed</RegularText>
                            {" for updates."}
                        </ClickableText>
                        <RegularText style={styles.shareSubtitle}>{i18n.t("check-in-tomorrow")}</RegularText>

                        <ClickableText onPress={this.props.navigation.popToTop} style={styles.done}>Done</ClickableText>

                    </View>
                </ScrollView>
            </>
        )
    }
}


const styles = StyleSheet.create({

    content: {
        justifyContent: "space-between",
        marginVertical: 32,
        marginHorizontal: 18,
    },

    scrollView: {
        flexGrow: 1,
        backgroundColor: colors.backgroundSecondary,
        justifyContent: 'space-between'
    },

    rootContainer: {
        padding: 10,
    },
    shareContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginHorizontal: 20,
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
    covidIconContainer: {
        height: 60,
        width: 60,
        borderRadius: 10,
        margin: 30,
        backgroundColor: colors.predict,
        alignSelf: "center"
    },
    covidIcon: {
        height: 50,
        width: 50,
        marginLeft: 5,
        marginTop: 5,
        resizeMode: "contain"
    },
    done: {
        alignSelf: "center",
        margin: 40,
        fontSize: 24,
    }

});
