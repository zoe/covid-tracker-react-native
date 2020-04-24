import React, {Component} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import Navigator from "../Navigation";


type StartAssessmentProps = {
    navigation: StackNavigationProp<ScreenParamList, 'StartAssessment'>
    route: RouteProp<ScreenParamList, 'StartAssessment'>;
}


export default class StartAssessmentScreen extends Component<StartAssessmentProps> {
    async componentDidMount() {
        Navigator.setNavigation(this.props.navigation);
        const currentPatient = this.props.route.params.currentPatient;
        const assessmentId = this.props.route.params.assessmentId || null;

        if (currentPatient.hasCompletePatientDetails) {
            if (currentPatient.shouldAskLevelOfIsolation) {
                this.props.navigation.replace('LevelOfIsolation', {currentPatient, assessmentId})
            } else {
                // Everything in this block should be replicated in Level Of Isolation navigation for now
                if (currentPatient.isHealthWorker) {
                    this.props.navigation.replace('HealthWorkerExposure', {currentPatient, assessmentId})
                } else {
                    this.props.navigation.replace('CovidTest', {currentPatient, assessmentId})
                }
            }
        } else {
            const nextPage = await Navigator.getStartPatientScreenName(currentPatient);
            Navigator.replaceScreen(nextPage, {currentPatient});
        }
    }

    render() {
        return null;
    }
}
