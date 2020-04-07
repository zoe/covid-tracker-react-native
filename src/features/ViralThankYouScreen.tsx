import React, {Component} from "react";
import {
    Image,
    ScrollView,
    Share,
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableOpacity
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
import {Spinner} from "native-base";
import BrandedSpinner from "../components/Spinner";

type Props = {
    navigation: StackNavigationProp<ScreenParamList, 'ViralThankYou'>
    route: RouteProp<ScreenParamList, 'ViralThankYou'>;
}

type State = {
    modalVisible: boolean;
    areaStats: AreaStatsResponse | null;
    loading: boolean,
}

export default class ViralThankYouScreen extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            modalVisible: false,
            areaStats: null,
            loading: true,
        };
    }

    componentDidMount() {
        const userService = new UserService();
        userService.getAreaStats("todotodotodo")
            .then(response => this.setState({
                areaStats: response.data,
                loading: false,
            }));

        // todo: handle error
    }

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
        const area = this.state.areaStats;
        const loading = this.state.loading;
        const casePercentage = area?.population ? ((area.predicted_cases / area?.population) * 100).toFixed(1) : 0;

        // todo: different text if no change?
        const sign = area?.rank_delta ?? 0 > 0 ? '+' : '-'; // can't find a one liner to format numbers in TS. Am I stupid?

        const modal = (
            <Modal animationType="slide" visible={this.state.modalVisible}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalCloseIconContainer} onPress={() => this.setState({modalVisible: false})}>
                        <MaterialIcons name="close" size={32} style={styles.modalCloseIcon}/>
                    </TouchableOpacity>
                    <RegularText style={styles.modalTitle}>
                        Prediction model
                    </RegularText>
                   <RegularText style={styles.modalContent}>
                       Prediction is based on symptoms of app users who tested positive and adjusted for your area
                   </RegularText>
                </View>
            </Modal>);

        return (
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

                    {!loading && !area?.locked && (
                        <View style={styles.estimatedCaseContainer}>
                            <View style={styles.estimatedCaseFirstRow}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({modalVisible: true});
                                    console.log("clicked");
                                }} style={styles.infoIconContainer}>
                                    <MaterialIcons name="info-outline" size={16} style={styles.infoIcon} />
                                </TouchableOpacity>
                                <Text style={styles.estimatedCases}>Estimated cases of COVID</Text>
                                <Text style={styles.estimatedCasesCounty}>in {area?.area_name}</Text>
                            </View>
                            <View style={styles.estimatedCaseSecondRow}>
                                <View>
                                    <Text style={styles.estimatedCasesCount}>{area?.predicted_cases}</Text>
                                    <Text style={styles.estimatedCasesPercentage}>{casePercentage}%</Text>
                                    <Text style={styles.estimatedCasesPopulation}>of {area?.population} residents</Text>
                                </View>
                            <View style={styles.chartContainer}>
                                <Text>Placeholder</Text>
                            </View>
                            </View>
                        </View>
                    )}

                    {!loading && area?.locked && (
                        <View style={styles.estimatedCaseContainer}>
                            <View style={styles.blurred}>
                                <MaterialIcons name="lock-outline" size={48} style={styles.lockIcon}/>
                            </View>
                        </View>
                        )}


                    {!loading && (
                        <View>
                            <RegularText style={styles.countyRank}>
                                <RegularBoldText>{area?.area_name}</RegularBoldText>'s rank in contribution
                            </RegularText>
                            <Text style={styles.dailyDelta}>
                                {sign}{area?.rank_delta} since yesterday
                            </Text>


                        <Text style={styles.position}>
                            <Text style={styles.positionBold}>{area?.rank}</Text> out of <Text style={styles.positionBold}>{area?.number_of_areas}</Text> counties
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
        marginVertical:8,
    },

    infoIconContainer: {
        position: "absolute",
        zIndex:1,
        right:0,
        padding:5,
    },

    infoIcon: {
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

    },

    modalTitle: {
        fontSize:20,
        lineHeight:32,
        marginTop:64,
        fontWeight: "300",
        textAlign: "center",
    },

    modalContent: {
        marginTop:32,
        textAlign: "center",
        color: colors.secondary
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
