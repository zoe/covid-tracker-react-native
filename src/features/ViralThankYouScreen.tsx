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

        const unlocked = true;
        const countyName = 'Suffolk County';
        const count = 3532;
        const percentage = 8.2;
        const population = 42000;
        const delta = 25;
        const sign = delta > 0 ? '+' : '-'; // can't find a one liner to format numbers in TS. Am I stupid?
        const countyRank = 2256;
        const totalCounty = 3007;


        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.rootContainer}>

                    <AntDesign name="checkcircle" style={styles.checkIcon} size={32} />
                    <Text style={styles.thankYou}>
                        Thank you, please report again tomorrow, even if you’re well.
                    </Text>

                    {unlocked && (
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
                    )}

                    {!unlocked && (
                        <View style={styles.estimatedCaseContainer}>
                            <View style={styles.blurred}>
                                <MaterialIcons name="lock-outline" size={48} style={styles.lockIcon}/>
                            </View>
                        </View>
                        )}



                    <RegularText style={styles.countyRank}>
                        <RegularBoldText>{countyName}</RegularBoldText>'s rank in contribution
                    </RegularText>
                    <Text style={styles.dailyDelta}>
                        {sign}{delta} since yesterday
                    </Text>

                    <Text style={styles.position}>
                        <Text style={styles.positionBold}>{countyRank}</Text> out of <Text style={styles.positionBold}>{totalCounty}</Text> counties
                    </Text>

                    <View style={styles.shareContainer}>
                        <View style={styles.covidIconContainer}>
                            <Image source={covidIcon} style={styles.covidIcon}/>
                        </View>
                        <Text style={styles.share}>Sharing is caring</Text>
                        <RegularText style={styles.shareSubtitle}>
                            The more people report, the better our estimates & the faster you can help your community fight COVID
                        </RegularText>
                        <BrandedButton onPress={this.shareApp} style={styles.shareButton}>Share this app</BrandedButton>
                    </View>

                    <RegularText style={styles.partnerContainer}>
                        Thank you for joining millions of people supporting scientists at{" "}
                        <Text style={styles.partner}>Massachusetts General Hospital</Text>,{" "}
                        <Text style={styles.partner}>Stanford University School of Medicine</Text> &{" "}
                        <Text style={styles.partner}>King's College London</Text> to help our communities.
                    </RegularText>

                    <RegularText style={styles.visitWebsite}>
                        Visit our{" "}
                        <ClickableText onPress={() => Linking.openURL(i18n.t('blog-link'))} style={styles.newsFeed}>
                            website
                        </ClickableText>{" "}
                        to see the discoveries you made possible
                    </RegularText>

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

    countyRank: {
        marginTop:40,
        color: colors.secondary,
        textAlign:"center",
    },

    dailyDelta: {
        marginTop:4,
        fontSize:14,
        lineHeight:20,
        fontWeight: "300",
        color: colors.secondary,
        textAlign:"center",
    },

    position: {
        marginTop:16,
        fontSize:14,
        lineHeight:20,
        fontWeight: "300",
        color: colors.secondary,
        textAlign:"center",
    },

    positionBold: {
        fontSize:24,
        lineHeight:32,
        fontWeight: "500",
        color: colors.primary,
    },

    blurred: {
        flex:1,
        height:120,
        color:"lightgray",
        justifyContent:"center",
    },

    lockIcon: {
        color:colors.primary,
        borderWidth: 1,
        borderColor: "#ff0000",
        alignSelf:"center"
    },


    shareContainer: {
        marginTop:40,
        backgroundColor: "#ffffff",
        borderRadius: 10,
    },

    covidIconContainer: {
        height: 60,
        width: 60,
        borderRadius: 10,
        margin: 30,
        backgroundColor: "#082A5D",
        alignSelf: "center"
    },

    share: {
        fontSize: 20,
        lineHeight:32,
        fontWeight: "500",
        textAlign: "center",
    },
    shareSubtitle: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        textAlign: "center",
        color: colors.secondary
    },

    shareButton: {
        marginVertical: 20,
        width:240,
        alignSelf: "center"
    },

    partnerContainer: {
        marginTop:40,
        textAlign:"center",
        marginHorizontal: 16,
        lineHeight:24,
    },

    partner: {
        fontWeight: "700",
        lineHeight:24,
    },

    visitWebsite: {
        marginTop:24,
        textAlign:"center",
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
