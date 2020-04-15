import React, {Component} from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Header} from "../../components/Screen";
import {ErrorText, HeaderText, RegularText, SecondaryText} from "../../components/Text";
import {colors} from "../../../theme"
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import UserService from "../../core/user/UserService";
import {addProfile, NUMBER_OF_PROFILE_AVATARS, profile1} from "../../../assets";
import {Card} from "native-base";
import '../../../assets';
import key from "weak-key";
import {AvatarName, getAvatarByName} from "../../utils/avatar";
import DaysAgo from "../../components/DaysAgo";

type RenderProps = {
    navigation: StackNavigationProp<ScreenParamList, 'SelectProfile'>
    route: RouteProp<ScreenParamList, 'SelectProfile'>;
}

type Patient = {
    id: string,
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
            .catch(err => {
                this.setState({errorMessage: "Something went wrong, please try again later"})
            });
    }

    async startAssessment(patientId: string) {
        const userService = new UserService();
        const currentPatient = await userService.getCurrentPatient(patientId);
        this.props.navigation.reset({
            index: 0,
            routes: [{name: 'StartAssessment', params: {currentPatient: currentPatient}}]
        });
    }

    getNextAvatarName() {
        if (this.state.patients) {
            const n = (this.state.patients.length + 1) % NUMBER_OF_PROFILE_AVATARS;
            return "profile" + n.toString()
        } else {
            return "profile1"
        }
    }

    gotoCreateProfile() {
        this.props.navigation.navigate('CreateProfile', {avatarName: this.getNextAvatarName()});
    }

    render() {
        return (
            <View style={styles.view}>
                <SafeAreaView>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.rootContainer}>
                            <Header>
                                <HeaderText style={{marginBottom: 12}}>Select profile you want to report for</HeaderText>
                                <SecondaryText>Or add more profiles</SecondaryText>
                            </Header>

                            <ErrorText>{this.state.errorMessage}</ErrorText>

                            <View style={styles.profileList}>
                                {
                                    this.state.patients.map((patient, i) => {
                                        const avatarImage = getAvatarByName((patient.avatar_name || "profile1") as AvatarName);
                                        return (
                                            <View style={styles.cardContainer} key={key(patient)}>
                                                <TouchableOpacity onPress={() => this.startAssessment(patient.id)}>
                                                    <Card style={styles.card}>
                                                        <Image source={avatarImage} style={styles.avatar} resizeMode={'contain'}/>
                                                        <RegularText>{patient.name}</RegularText>
                                                        <DaysAgo timeAgo={patient.last_reported_at}/>
                                                    </Card>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }

                                <TouchableOpacity style={styles.cardContainer} key={'new'} onPress={() => this.gotoCreateProfile()}>
                                    <Card style={styles.card}>
                                        <Image source={addProfile} style={styles.addImage} resizeMode={'contain'}/>
                                        <RegularText>New profile</RegularText>
                                    </Card>
                                </TouchableOpacity>
                            </View>


                        </View>

                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profileList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        width: "100%",
        alignContent: "stretch"
    },

    cardContainer: {
        width: "45%",
        margin: 5,
    },

    avatar: {
        width: "80%",
        height: 100,
        marginBottom: 10
    },

    addImage: {
        width: "80%",
        height: 100,
        marginBottom: 10
    },

    card: {
        width: "100%",
        borderRadius: 16,
        minHeight: 200,
        padding: 20,
        alignItems: "center"
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
