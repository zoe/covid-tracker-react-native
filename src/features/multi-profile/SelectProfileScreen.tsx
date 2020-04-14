import React, {Component} from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Header} from "../../components/Screen";
import {ErrorText, HeaderText, RegularText} from "../../components/Text";
import {colors} from "../../../theme"
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import UserService from "../../core/user/UserService";
import moment from "moment";
import {profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10, addProfile, NUMBER_OF_PROFILE_AVATARS} from "../../../assets";
import {Card} from "native-base";
import '../../../assets';
import key from "weak-key";

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
        this.props.navigation.navigate('StartAssessment', {currentPatient});
    }

    getAvatar(patient: Patient) {
        // This makes me sad...
        switch (patient.avatar_name) {
            case 'profile1': return profile1;
            case 'profile2': return profile2;
            case 'profile3': return profile3;
            case 'profile4': return profile4;
            case 'profile5': return profile5;
            case 'profile6': return profile6;
            case 'profile7': return profile7;
            case 'profile8': return profile8;
            case 'profile9': return profile9;
            case 'profile10': return profile10;
            default: return profile1;
        }
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
                                <HeaderText>Select profile you want to report for</HeaderText>
                                <RegularText>Or add more profiles</RegularText>
                            </Header>

                            <ErrorText>{this.state.errorMessage}</ErrorText>

                            <View style={styles.profileList}>
                                {
                                    this.state.patients.map((patient, i) =>
                                      <View style={styles.cardContainer}  key={key(patient)}>
                                        <TouchableOpacity onPress={() => this.startAssessment(patient.id)}>
                                            <Card style={styles.card}>
                                                <Image source={this.getAvatar(patient)} style={styles.avatar} resizeMode={'contain'} />
                                                <RegularText>{patient.name}</RegularText>
                                                {
                                                    <RegularText style={{textAlign: "center"}}>{patient.last_reported_at ?  "Reported " + moment(patient.last_reported_at).fromNow() : "Never reported"}</RegularText>
                                                }
                                            </Card>
                                        </TouchableOpacity>
                                      </View>
                                    )
                                }

                                <TouchableOpacity style={styles.cardContainer} key={'new'} onPress={() => this.gotoCreateProfile()}>
                                    <Card style={styles.card}>
                                        <Image source={addProfile} style={styles.addImage} resizeMode={'contain'} />
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
