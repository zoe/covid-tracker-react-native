import React, {Component} from "react";
import {StyleSheet} from "react-native";
import Screen, {Header, screenWidth} from "../../components/Screen";
import {BrandedButton, ClickableText, ErrorText, HeaderText, RegularText, SecondaryText} from "../../components/Text";
import {Body, CheckBox, Item, ListItem} from "native-base";

import {colors} from "../../../theme"
import UserService from "../../core/user/UserService";
import {StackNavigationProp} from "@react-navigation/stack";
import {ConsentType, ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {PatientInfosRequest} from "../../core/user/dto/UserAPIContracts";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";


type RenderProps = {
    navigation: StackNavigationProp<ScreenParamList, 'ConsentForOther'>
    route: RouteProp<ScreenParamList, 'ConsentForOther'>;
}

interface ConsentState {
    consentChecked: boolean,
    errorMessage: string
}


export default class ConsentForOtherScreen extends Component<RenderProps, ConsentState> {
    constructor(props: RenderProps) {
        super(props);
        this.state = {
            consentChecked: false,
            errorMessage: ""
        };
        this.createProfile = this.createProfile.bind(this);
    }

    handleConsentClick = () => {
        this.setState({consentChecked: !this.state.consentChecked})
    };

    isAdultConsent = () => {
        return this.props.route.params.consentType == ConsentType.Adult;
    };

    headerText = this.isAdultConsent() ? "Adult consent" : "Child consent";
    secondaryText = this.isAdultConsent() ? (
        <SecondaryText>
            Please confirm that you have shown or read our{" "}
            <ClickableText onPress={() => this.props.navigation.navigate("Consent", {viewOnly: true})}>consent</ClickableText>
            {" "}screen to the individual on whose behalf you are entering the data, that they are 18 or over, and that they have given their consent for you to share their data with us.
        </SecondaryText>
    ) : (
        <SecondaryText>
            If your child is old enough to understand our{" "}
            <ClickableText onPress={() => this.props.navigation.navigate("Consent", {viewOnly: true})}>consent</ClickableText>
            {" "}requirements, please explain to them that you are sharing information about them with us and what we are going to do with it. If you think that your child is old enough to make their own decisions, please confirm that they have consented to your sharing their data with us.
        </SecondaryText>
    );
    consentLabel = this.isAdultConsent() ? (
        "I confirm the above"
    ) : (
        "I confirm that I am the child's legal guardian and that I have done the above"
    );

    async startAssessment(patientId: string) {
        const userService = new UserService();
        const currentPatient = await userService.getCurrentPatient(patientId);
        this.props.navigation.reset({
            index: 0,
            routes: [{name: 'StartAssessment', params: {currentPatient: currentPatient}}]
        });
    }

    createProfile() {
        const name = this.props.route.params.profileName;
        const avatarName = this.props.route.params.avatarName;
        const userService = new UserService();

        const newPatient = {
            name: name,
            avatar_name: avatarName,
            reported_by_another: true
        } as Partial<PatientInfosRequest>

        userService.createPatient(newPatient)
            .then(response => {
                this.startAssessment(response.data.id);
            })
            .catch(err => this.setState({errorMessage: "Something went wrong, please try again later"}));
    }

    render() {
        return (
            <Screen>
                <Header>
                    <HeaderText style={{marginBottom: 12}}>{this.headerText}</HeaderText>
                    {this.secondaryText}
                </Header>

                <ListItem>
                    <CheckBox
                        checked={this.state.consentChecked}
                        onPress={this.handleConsentClick}
                    />
                    <TouchableWithoutFeedback onPress={this.handleConsentClick}>
                        <Body style={styles.label}>
                            <RegularText>
                                {this.consentLabel}
                            </RegularText>
                        </Body>
                    </TouchableWithoutFeedback>

                </ListItem>

                <ErrorText>{this.state.errorMessage}</ErrorText>

                <BrandedButton
                    enable={this.state.consentChecked}
                    hideLoading={true}
                    onPress={this.createProfile}>Create profile</BrandedButton>
            </Screen>
        )
    }
}


const styles = StyleSheet.create({
    label: {
        marginLeft: 10,
    },

    fieldRow: {
        flexDirection: "row",
    },

    primaryField: {
        flex: 3,
    },

    secondaryField: {
        flex: 1,
    },

    picker: {
        width: screenWidth - 16,
        marginTop: 16,
    },

    smallPicker: {
        // width: 40,
    },

    textarea: {
        width: '100%',
    },

    button: {
        borderRadius: 8,
        height: 56,
        backgroundColor: colors.brand,
    },
    buttonText: {
        color: colors.white,
    },

});
