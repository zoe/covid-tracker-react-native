import React, {Component} from "react";
import {
    Image,
    ScrollView,
    Share,
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableOpacity, SafeAreaView
} from "react-native";
import {isAndroid} from "../components/Screen";
import {BrandedButton, ClickableText, RegularBoldText, RegularText} from "../components/Text";
import {colors} from "../../theme"
import {ScreenParamList} from "./ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {social} from "../../assets";
import i18n from "../locale/i18n"
import {Linking} from "expo";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import UserService from "../core/user/UserService";
import {AreaStatsResponse} from "../core/user/dto/UserAPIContracts";
import BrandedSpinner from "../components/Spinner";
import moment from "moment";
import { CovidRating } from "../components/CovidRating";
import I18n from "i18n-js";


type Props = {
    navigation: StackNavigationProp<ScreenParamList, 'ViralThankYou'>
    route: RouteProp<ScreenParamList, 'ViralThankYou'>;
}

type State = {
    modalVisible: boolean;
    areaStats: AreaStatsResponse | null;
    loading: boolean,
    missingData: boolean,
    askForRating: boolean,
}

export default class ViralThankYouScreen extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            modalVisible: false,
            areaStats: null,
            loading: true,
            missingData: false,
            askForRating: true,
        };
    }

    async componentDidMount() {


        const userService = new UserService();
        const profile = await userService.getProfile();

        // Ask for rating if not asked before and server indicates eligible.
        const eligibleToAskForRating = profile.ask_for_rating;
        const askedToRateStatus = await userService.getAskedToRateStatus();
        if (!askedToRateStatus && eligibleToAskForRating) {this.setState({askForRating: true})}

        userService.getAreaStats(profile.patients[0]) // todo: multipatient
            .then(response => this.setState({
                areaStats: {
                    ...response.data,
                    area_name: response.data.area_name + " County"
                },
                loading: false,
            }))
            .catch(() => {
                this.setState({
                    missingData: true,
                    loading: false,
                });
            });
    }

    shareUrl = i18n.t("share-with-friends-url");

    getShareMessage = () => {
        const area = this.state.areaStats;
        if(!area)
            return i18n.t("share-with-friends-message");

        if(area.locked)
            // Be careful with extra tabs or space, they would appear in the message.
            return "I’m helping to fight #COVID19 – " +
                    `We only need ${area.number_of_missing_contributors} more people on the app to get a COVID ` +
                    `estimate for ${area.area_name}. ` +
                    "Please help by taking 1 min daily to report how you feel 🙏. " +
                    "You also get an estimate of COVID in your area. Download the app";
        else
            return `I’m helping to fight #COVID19 – ${area.predicted_cases} people are estimated to have COVID ` +
                    `symptoms in ${area.area_name} today. Please help by taking 1 min daily to report how you `+
                    "feel 🙏. You also get an estimate of COVID in your area. Download the app"

    };

    shareApp = async () => {
        const message = this.getShareMessage() + (isAndroid ? " " + this.shareUrl : ""); // On Android add link to end of message

        try {
            await Share.share({
                message: message,
                url: this.shareUrl, // IOS has separate field for URL
            })
        } catch (error) {
        }
    };

    formatNumber = (x : number | undefined) => I18n.toNumber(x ?? 0, {precision: 0});

    render() {
        const area = this.state.areaStats;
        const date = moment();
        const {loading, missingData} = this.state;
        const displayStats = !loading && !missingData;
        const casePercentage = area?.population ? ((area.predicted_cases / area?.population) * 100).toFixed(1) : 0;

        // todo: different text if no change?
        const sign = area?.rank_delta ?? 0 > 0 ? '+' : '-'; // can't find a one liner to format numbers in TS. Am I stupid?

        const modal = (
            <Modal animationType="slide" visible={this.state.modalVisible}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalCloseIconContainer} onPress={() => this.setState({modalVisible: false})}>
                        <MaterialIcons name="close" size={32} style={styles.modalCloseIcon}/>
                    </TouchableOpacity>
                    <ScrollView style={styles.modalText}>
                        <RegularText style={styles.modalTitle}>
                            The methodology behind our estimates
                        </RegularText>
                       <RegularText style={styles.modalContent}>
                           We have developed machine learning models to estimate the number of people who currently
                           have COVID symptoms.{"\n\n"}
                           These estimates could be an earlier signal of COVID in your area today vs the confirmed cases
                           which only come later and include only the people who tested.{"\n\n"}
                           Our estimates are calculated in 3 steps:{"\n\n"}
                           1. We learn which symptoms best predict COVID, based on app users who have been tested all
                           around the world (
                           <ClickableText onPress={() => Linking.openURL('https://covid.joinzoe.com/us-post/loss-of-smell-or-taste-is-a-key-symptom-of-covid-19')}>
                               read more here
                           </ClickableText>){"\n\n"}
                           2. We estimate total number of app users in your county with COVID today by applying those
                           rules to all users’ logged symptoms in your county{"\n\n"}
                           3. We extrapolate to the whole county population from app users, based on geography,
                           age & gender proportions
                       </RegularText>

                        <View style={styles.divider}/>
                        <RegularText style={styles.smallPrint}>
                            *Our estimates do not include people aged under 20 or over 70 or with asymptomatic COVID infections, since we have too little data to model these.
                        </RegularText>
                        <View style={styles.divider}/>

                        <RegularText style={styles.readBlog}>
                            Read more on our{" "}
                            <ClickableText onPress={() => Linking.openURL(i18n.t('blog-link'))}>blog</ClickableText>
                        </RegularText>
                    </ScrollView>
                </View>
            </Modal>);

        const peopleWithSymptoms = (
            <Text style={styles.estimatedCases}>
                People with COVID symptoms in{"\n"}
                <RegularBoldText>{area?.area_name}</RegularBoldText>{" "}
                today
            </Text>
        );

        return (
            <>
             {this.state.askForRating && <CovidRating /> }
            <SafeAreaView>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.rootContainer}>

                    {modal}

                    <AntDesign name="checkcircle" style={styles.checkIcon} size={32} />
                    <Text style={styles.thankYou}>
                        Thank you, please report again tomorrow, even if you’re well.
                    </Text>

                    {loading && (
                        <View>
                            <BrandedSpinner/>
                            <Text style={styles.loading}>Loading data for your area</Text>
                        </View>
                    )}

                    {displayStats && !area?.locked && (
                        <View style={styles.estimatedCaseContainer}>
                            <View style={styles.estimatedCaseFirstRow}>
                                {peopleWithSymptoms}
                                <Text style={styles.estimatedCasesCount}>{this.formatNumber(area?.predicted_cases)}</Text>
                            </View>
                            <View style={styles.estimatedCaseSecondRow}>
                                <View style={styles.estimatedCasesPercentage}>
                                    <Text style={styles.estimatedCasesPercentageText}>{casePercentage}%</Text>
                                </View>
                                <Text style={styles.estimatedCasesPopulation}>of {this.formatNumber(area?.population)} residents</Text>
                            </View>
                            <View style={styles.divider}/>
                            <View style={styles.estimatedCaseSecondRow}>
                                <Text style={styles.estimate}>
                                    Estimate for {date.format('MMMM D, YYYY')}{" "}
                                    <ClickableText style={styles.learnMore} onPress={() => this.setState({modalVisible: true})}>Learn more</ClickableText>
                                </Text>
                            </View>
                        </View>
                    )}

                    {displayStats && area?.locked && (
                        <View style={styles.estimatedCaseContainer}>
                            <View style={styles.estimatedCaseFirstRow}>
                                {peopleWithSymptoms}
                            </View>
                            <View style={styles.blurred}>
                                <MaterialIcons name="lock-outline" size={32} style={styles.lockIcon}/>
                            </View>
                            <View>
                                <Text style={styles.almostThere}>
                                    Almost there! We only need{" "}
                                    <Text style={styles.almostThereCount}>{area?.number_of_missing_contributors} more people</Text>{" "}
                                     from your county to report via the app, to provide accurate daily COVID estimates
                                </Text>

                                <ClickableText onPress={this.shareApp} style={styles.pleaseShare}>Please share the app</ClickableText>
                            </View>
                        </View>
                        )}


                    {displayStats && (
                        <View>
                            <RegularText style={styles.countyRank}>
                                <RegularBoldText>{area?.area_name}</RegularBoldText>'s rank in contribution
                            </RegularText>
                            <Text style={styles.dailyDelta}>
                                {sign}{area?.rank_delta} places since yesterday
                            </Text>


                        <Text style={styles.position}>
                            <Text style={styles.positionBold}>{this.formatNumber(area?.rank)}</Text> out of <Text style={styles.positionBold}>{this.formatNumber(area?.number_of_areas)}</Text> counties
                        </Text>
                        </View>
                    )}

                    <View style={styles.shareContainer}>
                        <View style={styles.socialIconContainer}>
                            <Image source={social} style={styles.socialIcon}/>
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
                        <ClickableText onPress={() => Linking.openURL(i18n.t('blog-link'))}>
                            website
                        </ClickableText>{" "}
                        to see the discoveries you made possible
                    </RegularText>

                    <ClickableText onPress={this.props.navigation.popToTop} style={styles.done}>Done</ClickableText>

                </View>
            </ScrollView>
            </SafeAreaView>
            </>
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
        marginTop:16,
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

    loading: {
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
        justifyContent: "center",
        alignContent: "center",
        marginVertical:8,
    },

    estimatedCases: {
        fontSize:16,
        lineHeight:24,
        color: colors.primary,
        textAlign: "center"
    },

    estimatedCasesCount: {
        marginTop:10,
        fontSize:40,
        lineHeight:48,
        color: colors.primary,
        fontWeight: "500",
        textAlign: "center",
    },

    estimatedCasesPercentage: {
        backgroundColor: "#D28C90",
        width:48,
        height:28,
        borderRadius:5,
        justifyContent: "center",
    },

    estimatedCasesPercentageText: {
        fontSize:14,
        lineHeight:20,
        color: "white",
        alignSelf: "center",
    },

    estimatedCasesPopulation: {
        marginTop:4,
        marginLeft:4,
        fontSize:14,
        lineHeight:20,
        fontWeight: "300",
        color: colors.primary,
    },

    estimate: {
        fontSize:12,
        lineHeight:16,
        color: colors.secondary,
    },

    learnMore: {
        fontSize:12,
        lineHeight:16,
    },

    divider: {
        height: 1,
        backgroundColor: "#E2E2E2",
        marginVertical: 20,
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

    almostThere: {
        fontSize:14,
        lineHeight:20,
        fontWeight:"300",
        textAlign:"center",
        color: colors.primary,
    },

    almostThereCount: {
        fontSize:16,
        lineHeight:24,
        fontWeight:"700",
        color: colors.primary,
    },

    pleaseShare: {
        marginTop:12,
        fontSize:14,
        lineHeight:20,
        textAlign:"center",
    },

    lockIcon: {
        color:"#E5E5E5",
        borderWidth: 1,
        borderRadius:22,
        padding: 5,
        borderColor: "#E5E5E5",
        alignSelf:"center",
        textAlign: "center",
    },


    shareContainer: {
        marginTop:40,
        backgroundColor: "#ffffff",
        borderRadius: 10,
    },


    share: {
        marginTop:16,
        fontSize: 20,
        lineHeight:32,
        fontWeight: "500",
        textAlign: "center",
    },

    socialIconContainer: {
        height: 60,
        marginTop:32,
        alignSelf: "center",
    },

    socialIcon: {
        height: 60,
        resizeMode: "contain"
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


    done: {
        alignSelf: "center",
        margin: 40,
        fontSize: 24,
        color: colors.brand
    },

    modalContainer: {
        flex:1,
        padding:16,
        marginTop:32,
    },

    modalText: {
        marginTop:48,
    },

    modalTitle: {
        fontSize:24,
        lineHeight:38,
        fontWeight: "300",
    },

    modalContent: {
        marginTop:32,
        color: colors.secondary
    },

    smallPrint: {
        color: colors.tertiary
    },

    readBlog: {
        textAlign:"center",
    },

    modalCloseIconContainer: {
        position: "absolute",
        zIndex:1,
        right:0,
        padding:16,
    },

    modalCloseIcon: {
        color: colors.primary
    }

});
