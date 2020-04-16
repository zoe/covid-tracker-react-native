import React, {Component} from "react";
import {Platform, StyleSheet} from "react-native";
import Screen, {Header, ProgressBlock, screenWidth} from "../../components/Screen";
import {BrandedButton, ErrorText, HeaderText} from "../../components/Text";
import {Form, Text} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import {Formik} from "formik";
import * as Yup from "yup";

import {colors, fontStyles} from "../../../theme"
import i18n from "../../locale/i18n"
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import UserService from "../../core/user/UserService";
import {AssessmentInfosRequest} from "../../core/user/dto/UserAPIContracts";
import DropdownField from "../../components/DropdownField";
import { ValidationErrors } from "../../components/ValidationError";
import moment from "moment";


type StartAssessmentProps = {
    navigation: StackNavigationProp<ScreenParamList, 'CovidTest'>
    route: RouteProp<ScreenParamList, 'CovidTest'>;
}


export default class StartAssessmentScreen extends Component<StartAssessmentProps> {
    async componentDidMount() {
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
            // TODO: refactor as "StartPatient" screen/controller
            this.props.navigation.replace('YourWork', {currentPatient});
        }
    }

    render() {
        return null;
    }
}
