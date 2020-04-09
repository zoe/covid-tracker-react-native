import React, {Component} from "react";
import {SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Header} from "../../components/Screen";
import {ErrorText, HeaderText, RegularText} from "../../components/Text";
import {colors} from "../../../theme"
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import UserService from "../../core/user/UserService";
import moment from "moment";
import {profile1} from "../../../assets";
import {Card} from "native-base";

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

    getNextReportScreen() {
        // TODO - Wire up to proper logic
        return 'CovidTest'
    }

    getAvatar(patient: Patient) {
        // TODO - Return the proper asset
        return profile1;
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

                            <ErrorText>{this.state.errorMessage}</ErrorText>

                            {
                                this.state.patients.map((patient, i) =>
                                    <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate(this.getNextReportScreen())}>
                                        <Card style={styles.cardContainer}>
                                            <RegularText>{patient.name}</RegularText>
                                            {
                                                <RegularText>{patient.last_reported_at ? moment(patient.last_reported_at).fromNow() : "Never reported"}</RegularText>
                                            }
                                        </Card>
                                    </TouchableOpacity>
                                )
                            }

                            <TouchableOpacity key={'new'} onPress={() => this.props.navigation.navigate('CreateProfile')}>
                                <Card style={styles.cardContainer}>
                                    <RegularText>New profile</RegularText>
                                </Card>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 20
    },

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
