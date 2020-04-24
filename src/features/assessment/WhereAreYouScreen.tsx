import React, {Component} from "react";
import {StyleSheet} from "react-native";
import Screen, {FieldWrapper, Header, ProgressBlock} from "../../components/Screen";
import {HeaderText} from "../../components/Text";
import {Form, Text} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import i18n from "../../locale/i18n"
import UserService from "../../core/user/UserService";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {BigButton} from "../../components/Button";
import { navigateAfterFinishingAssessment } from "../Navigation";


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
        this.updateAssessment('home')
            .then(response => navigateAfterFinishingAssessment(this.props.navigation))
            .catch(err => this.setState({errorMessage: i18n.t('something-went-wrong')}));
    }

    handleAtHospital() {
        const {currentPatient, assessmentId} = this.props.route.params;
        const location = "hospital";
        this.updateAssessment(location)
            .then(response => this.props.navigation.navigate('TreatmentSelection', {
                currentPatient, assessmentId, location
            }))
            .catch(err => this.setState({errorMessage: i18n.t('something-went-wrong')}));
    }

    handleBackAtHome() {
        const {currentPatient, assessmentId} = this.props.route.params;
        const location = "back_from_hospital";
        this.updateAssessment(location)
            .then(response => this.props.navigation.navigate('TreatmentSelection', {
                currentPatient, assessmentId, location
            }))
            .catch(err => this.setState({errorMessage: i18n.t('something-went-wrong')}));
    }

    handleStillAtHome() {
        this.updateAssessment('back_from_hospital')
            .then(response => navigateAfterFinishingAssessment(this.props.navigation))
            .catch(err => this.setState({errorMessage: i18n.t('something-went-wrong')}));
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

        return (
            <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
                <Header>
                    <HeaderText>{i18n.t('where-are-you.question-location')}</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={4} maxSteps={5}/>
                </ProgressBlock>

                <Form style={styles.form}>


                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={this.handleAtHome}>
                            <Text>{i18n.t('where-are-you.picker-location-home')}.</Text>
                        </BigButton>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={this.handleAtHospital}>
                            <Text>{i18n.t('where-are-you.picker-location-hospital')}</Text>
                        </BigButton>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={this.handleBackAtHome}>
                            <Text>{i18n.t('where-are-you.picker-location-back-from-hospital')}</Text>
                        </BigButton>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={this.handleStillAtHome}>
                            <Text>{i18n.t('where-are-you.picker-location-back-from-hospital-already-reported')}</Text>
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
});
