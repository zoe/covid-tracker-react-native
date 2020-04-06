import React, {Component} from "react";
import {Image, ScrollView, Share, StyleSheet, View, Text} from "react-native";
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
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

type RenderProps = {
    navigation: StackNavigationProp<ScreenParamList, 'ViralThankYou'>
    route: RouteProp<ScreenParamList, 'ViralThankYou'>;
}

export default class ViralThankYouScreen extends Component<RenderProps, {}> {

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


    render() {
        const countyName = 'Suffolk County';
        const count = 3532;
        const percentage = 8.2;
        const population = 42000;

        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.rootContainer}>

                    <AntDesign name="checkcircle" style={styles.checkIcon} size={32} />
                    <Text style={styles.thankYou}>
                        Thank you, please report again tomorrow, even if you’re well.
                    </Text>

                    <View style={styles.estimatedCaseContainer}>
                        <View style={styles.estimatedCaseFirstRow}>
                            <MaterialIcons name="info-outline" size={16} style={styles.infoIcon}/>
                            <Text style={styles.estimatedCases}>Estimated cases of COVID</Text>
                            <Text style={styles.estimatedCasesCounty}>in {countyName}</Text>
                        </View>
                        <View style={styles.estimatedCaseSecondRow}>
                            <View>
                                <Text style={styles.estimatedCasesCount}>{count}</Text>
                                <Text style={styles.estimatedCasesPercentage}>{percentage}%</Text>
                                <Text style={styles.estimatedCasesPopulation}>of {population} residents</Text>
                            </View>
                            <View style={styles.chartContainer}>
                                <Text>Placeholder</Text>
                            </View>
                        </View>
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
        )
    }
}


const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: "#E5E5E5",
        justifyContent: 'space-between'
    },

    rootContainer: {
        padding: 16,
    },

    checkIcon: {
        color: "#A0B406",
        alignSelf:"center"
    },

    thankYou: {
        marginTop:16,
        padding:16,
        fontSize:20,
        lineHeight:32,
        fontWeight: "300",
        color: colors.primary,
        textAlign:"center"
    },

    estimatedCaseContainer: {
        backgroundColor: "white",
        borderRadius:10,
        padding:16,
        marginTop:16,
    },

    estimatedCaseFirstRow: {
    },

    estimatedCaseSecondRow: {
        flexDirection: "row",
        marginVertical:8,
    },

    infoIcon: {
        position: "absolute",
        right:5,
        color: colors.tertiary,
    },

    estimatedCases: {
        fontSize:20,
        lineHeight:32,
        color: colors.primary,
    },

    estimatedCasesCounty: {
        fontSize:14,
        lineHeight:20,
        color: colors.secondary,
    },

    estimatedCasesCount: {
        fontSize:32,
        lineHeight:48,
        color: colors.primary,
        fontWeight: "500",
    },

    estimatedCasesPercentage: {
        marginTop:12,
        fontSize:12,
        lineHeight:16,
        color: "white",
        backgroundColor: "#D28C90",
        textAlign: "center",
        textAlignVertical:"center",
        width:48,
        height:24,
        borderRadius:5,
    },

    estimatedCasesPopulation: {
        marginTop:8,
        fontSize:12,
        lineHeight:16,
        fontWeight: "300",
        color: colors.secondary,
    },

    chartContainer: {
        flex:1,
    },


    content: {
        justifyContent: "space-between",
        marginVertical: 32,
        marginHorizontal: 18,
    },

    button: {
        borderRadius: 8,
        height: 56,
        backgroundColor: colors.brand,
    },
    buttonText: {
        color: colors.white,
    },


    shareContainer: {
        backgroundColor: "#ffffff",
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
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.primary,
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
        backgroundColor: "#082A5D",
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
        color: colors.brand
    }

});
