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
import UserService from "../../core/user/UserService";
import moment from "moment";

type RenderProps = {
    navigation: StackNavigationProp<ScreenParamList, 'SelectProfile'>
    route: RouteProp<ScreenParamList, 'SelectProfile'>;
}

type Patient = {
    id?: string,
    name?: string,
    avatar_name?: string,
    reported_by_another?: boolean,
    report_count?: number,
    last_reported_at?: Date,
    created_at?: Date
}

interface State {
    patients: Patient[],
    errorMessage: string
}

export default class SelectProfileScreen extends Component<RenderProps, State> {
    constructor(props: RenderProps) {
        super(props);
        this.state = {
            patients: [],
            errorMessage: ""
        };
    }

    async componentDidMount() {
        this.listProfiles();
    }

    listProfiles() {
        const userService = new UserService();
        userService.listPatients()
            .then(response => this.setState({patients: response.data}))
            .catch(err => this.setState({errorMessage: "Something went wrong, please try again later"}));
    }


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

                            {
                                this.state.patients.map((patient, i) =>
                                    <View key={i}>
                                        <RegularText>{patient.name}</RegularText>
                                        <RegularText>{patient.avatar_name}</RegularText>
                                        {
                                            patient.avatar_name &&
                                                <Image source={require(`./../../../assets/profiles/profile1.png`)}></Image>
                                        }
                                        {
                                            <RegularText>{patient.last_reported_at ? moment(patient.last_reported_at).fromNow() : ""}</RegularText>
                                        }
                                    </View>
                                )
                            }



                            <BrandedButton onPress={() => this.props.navigation.navigate('CovidTest')}>
                                <Text style={[fontStyles.bodyLight, styles.buttonText]}>Me</Text>
                            </BrandedButton>

                            <BrandedButton onPress={() => this.props.navigation.navigate('CreateProfile')}>
                                <Text style={[fontStyles.bodyLight, styles.buttonText]}>New profile</Text>
                            </BrandedButton>

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
