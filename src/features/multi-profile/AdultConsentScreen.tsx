import React, {Component} from "react";
import {Platform, StyleSheet} from "react-native";
import Screen, {FieldWrapper, Header, ProgressBlock, screenWidth} from "../../components/Screen";
import {BrandedButton, ClickableText, ErrorText, HeaderText, RegularText} from "../../components/Text";
import {Body, CheckBox, Form, Item, Label, ListItem, Text, Textarea} from "native-base";

import {Formik} from "formik";
import * as Yup from "yup";

import {colors, fontStyles} from "../../../theme"
import UserService from "../../core/user/UserService";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {getThankYouScreen} from "../Navigation";


type RenderProps = {
    navigation: StackNavigationProp<ScreenParamList, 'AdultConsent'>
    route: RouteProp<ScreenParamList, 'AdultConsent'>;
}

interface ConsentState {
    consentChecked: boolean,
    errorMessage: string
}


export default class AdultConsentScreen extends Component<RenderProps, ConsentState> {
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

    getAvatarName() {
        return (this.props.route.params.avatarName) ?  this.props.route.params.avatarName : "profile1";
    }

    createProfile() {
        const name = this.props.route.params.profileName;
        const userService = new UserService();
        userService.createPatient({
            name: name,
            avatar_name: this.getAvatarName(),
            reported_by_another: true
        })
            .then(response => this.props.navigation.navigate("CovidTest"))
            .catch(err => this.setState({errorMessage: "Something went wrong, please try again later"}));
    }

    render() {
        return (
            <Screen>
                <Header>
                    <HeaderText>Adult consent</HeaderText>
                    <RegularText>
                        Please confirm that you have shown or read our{" "}
                        <ClickableText onPress={() => this.props.navigation.navigate("Terms")}>consent</ClickableText>
                        {" "}screen to the individual on whose behalf you are entering the data, that they are 18 or over, and that they have given their consent for you to share their data with us.
                    </RegularText>
                </Header>

                <ListItem>
                    <CheckBox
                        checked={this.state.consentChecked}
                        onPress={this.handleConsentClick}
                    />
                    <Body style={styles.label}>
                        <RegularText>
                            I confirm the above
                        </RegularText>
                    </Body>
                </ListItem>

                <ErrorText>{this.state.errorMessage}</ErrorText>

                <BrandedButton style={styles.button}
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
