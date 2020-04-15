import React, {Component} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";


type StartAssessmentProps = {
    navigation: StackNavigationProp<ScreenParamList, 'StartAssessment'>
    route: RouteProp<ScreenParamList, 'StartAssessment'>;
}


export default class StartAssessmentScreen extends Component<StartAssessmentProps> {
    async componentDidMount() {
        const currentPatient = this.props.route.params.currentPatient;
        const assessmentId = this.props.route.params.assessmentId || null;
        if (currentPatient.hasCompletePatientDetails) {
            if (currentPatient.isHealthWorker) {
                this.props.navigation.replace('HealthWorkerExposure', {currentPatient, assessmentId})
            } else {
                this.props.navigation.replace('CovidTest', {currentPatient, assessmentId})
            }
        } else {
            this.props.navigation.replace('StartPatient', {currentPatient});
        }
    }

    render() {
        return null;
    }
}
