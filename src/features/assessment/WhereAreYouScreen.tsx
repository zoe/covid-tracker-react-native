import React, {Component} from "react";
import {StyleSheet} from "react-native";
import Screen, {FieldWrapper, Header, ProgressBlock} from "../../components/Screen";
import {HeaderText} from "../../components/Text";
import {Form, Text} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import {colors, fontStyles} from "../../../theme"
import UserService, {isUSLocale} from "../../core/user/UserService";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {BigButton} from "../../components/Button";
import {getThankYouScreen} from "../Navigation";


type LocationProps = {
    navigation: StackNavigationProp<ScreenParamList, 'WhereAreYou'>
    route: RouteProp<ScreenParamList, 'WhereAreYou'>;
}

export default class WhereAreYouScreen extends Component<LocationProps> {
    constructor(props: LocationProps) {
        super(props);
        this.handleAtHome = this.handleAtHome.bind(this);
        this.handleAtHospital = this.handleAtHospital.bind(this);
        this.handleBackAtHome = this.handleBackAtHome.bind(this);
        this.handleStillAtHome = this.handleStillAtHome.bind(this);
    }

    handleAtHome() {
        const {currentPatient, assessmentId} = this.props.route.params;
        this.updateAssessment('home')
            .then(response => this.props.navigation.navigate('LevelOfIsolation', {currentPatient, assessmentId}))
            .catch(err => this.setState({errorMessage: "Something went wrong, please try again later"}));
    }

    handleAtHospital() {
        const {currentPatient, assessmentId} = this.props.route.params;
        const location = "hospital";
        this.updateAssessment(location)
            .then(response => this.props.navigation.navigate('TreatmentSelection', {
                currentPatient, assessmentId, location
            }))
            .catch(err => this.setState({errorMessage: "Something went wrong, please try again later"}));
    }

    handleBackAtHome() {
        const {currentPatient, assessmentId} = this.props.route.params;
        const location = "back_from_hospital";
        this.updateAssessment(location)
            .then(response => this.props.navigation.navigate('TreatmentSelection', {
                currentPatient, assessmentId, location
            }))
            .catch(err => this.setState({errorMessage: "Something went wrong, please try again later"}));
    }

    handleStillAtHome() {
        this.updateAssessment('back_from_hospital')
            .then(response => this.props.navigation.navigate(getThankYouScreen()))
            .catch(err => this.setState({errorMessage: "Something went wrong, please try again later"}));
    }

    private updateAssessment(status: string) {
        const assessmentId = this.props.route.params.assessmentId;
        const userService = new UserService();
        const promise = userService.updateAssessment(assessmentId, {
            location: status
        });
        return promise;
    }


    render() {
        const currentPatient = this.props.route.params.currentPatient;
        const medicalBuilding = isUSLocale() ? "clinic or hospital" : "hospital";

        return (
            <Screen profile={currentPatient.profile}>
                <Header>
                    <HeaderText>Where are you right now?</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={4} maxSteps={5}/>
                </ProgressBlock>

                <Form style={styles.form}>


                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={this.handleAtHome}>
                            <Text style={[fontStyles.bodyLight, styles.buttonText]}>I'm at home. I haven't been to a {medicalBuilding} for suspected COVID-19 symptoms.</Text>
                        </BigButton>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={this.handleAtHospital}>
                            <Text style={[fontStyles.bodyLight, styles.buttonText]}>I am at the {medicalBuilding} with suspected COVID-19 symptoms.</Text>
                        </BigButton>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={this.handleBackAtHome}>
                            <Text style={[fontStyles.bodyLight, styles.buttonText]}>I am back from the {medicalBuilding}, I'd like to tell you about my treatment.</Text>
                        </BigButton>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={this.handleStillAtHome}>
                            <Text style={[fontStyles.bodyLight, styles.buttonText]}>I am back from the {medicalBuilding}, I've already told you about my treatment.</Text>
                        </BigButton>
                    </FieldWrapper>
                </Form>

            </Screen>
        )
    }
}


const styles = StyleSheet.create({

    form: {
        marginVertical: 32,
    },

    fieldWrapper: {
        // marginVertical: 32,
    },

    buttonText: {
        color: colors.primary,
    },
});
