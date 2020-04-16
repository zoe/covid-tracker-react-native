import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Screen, { Header, ProgressBlock } from "../../components/Screen";
import { HeaderText } from "../../components/Text";
import { Form } from "native-base";

import ProgressStatus from "../../components/ProgressStatus";
import i18n from "../../locale/i18n"
import UserService from "../../core/user/UserService";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenParamList } from "../ScreenParamList";
import { RouteProp } from "@react-navigation/native";
import { SelectorButton } from "../../components/SelectorButton";
import { AssessmentInfosRequest, PatientInfosRequest } from "../../core/user/dto/UserAPIContracts";
import moment from "moment";
import { PatientStateType } from "../../core/patient/PatientState";


type LocationProps = {
    navigation: StackNavigationProp<ScreenParamList, 'LevelOfIsolation'>
    route: RouteProp<ScreenParamList, 'LevelOfIsolation'>;
}


export default class LevelOfIsolationScreen extends Component<LocationProps> {
    constructor(props: LocationProps) {
        super(props);
    }

    private updatePatientsLastAskedDate(currentPatient: PatientStateType) {
        const userService = new UserService();
        const patientId = currentPatient.patientId;
        let timeNow = moment().toDate();
        const infos = {
            last_asked_level_of_isolation: timeNow
        } as Partial<PatientInfosRequest>;

        return userService.updatePatient(patientId, infos)
            .then(response => currentPatient.shouldAskLevelOfIsolation = false)
            .catch(err => {
                this.setState({errorMessage: i18n.t("something-went-wrong")});
            })
    }

    navigateToStart = (currentPatient: PatientStateType, assessmentId: string) => {
        if (currentPatient.isHealthWorker) {
            this.props.navigation.navigate('HealthWorkerExposure', {currentPatient, assessmentId})
        } else {
            this.props.navigation.navigate('CovidTest', {currentPatient, assessmentId})
        }
    };

    handleSelection = (level_of_isolation: string) => {
        let {currentPatient, assessmentId} = this.props.route.params;
        const patientId = currentPatient.patientId;
        const userService = new UserService();
        const assessment = {
            patient: patientId,
            level_of_isolation: level_of_isolation
        } as Partial<AssessmentInfosRequest>;

        let promise = null;
        if (assessmentId == null) {
            promise = userService.addAssessment(assessment)
        } else {
            promise = userService.updateAssessment(assessmentId, assessment)
        }
        promise.then(response => assessmentId = response.data.id)
        .then(() => this.updatePatientsLastAskedDate(currentPatient)
        .then(() => this.navigateToStart(currentPatient, assessmentId as string)))
        .catch(err => {
            this.setState({errorMessage: i18n.t("something-went-wrong")});
        });
    };

    render() {
        const currentPatient = this.props.route.params.currentPatient;
        return (
            <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
                <Header>
                    <HeaderText>How much have you been isolating over the last week?</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={3} maxSteps={5}/>
                </ProgressBlock>

                <Form style={styles.form}>
                    <SelectorButton text={"I have not left the house"} onPress={() => this.handleSelection('not_left_the_house')}/>
                    <SelectorButton text={"I rarely leave the house and when I do, I have little interaction with others (e.g. to exercise)"} onPress={() => this.handleSelection('rarely_left_the_house')}/>
                    <SelectorButton text={"I rarely leave the house but had to visit somewhere with lots of people (e.g. hospital/clinic, groceries"} onPress={() => this.handleSelection('rarely_left_the_house_but_visited_lots')}/>
                    <SelectorButton text={"I have to leave the house often and am in contact with other people (eg still working outside the house or using public transport)"} onPress={() => this.handleSelection('often_left_the_house')}/>
                </Form>

            </Screen>
        )
    }
}


const styles = StyleSheet.create({
    form: {
        marginVertical: 32,
    },
});
