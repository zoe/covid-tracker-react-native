import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';

import UserService from '../../core/user/UserService';
import Navigator from '../Navigation';
import { ScreenParamList } from '../ScreenParamList';

type StartAssessmentProps = {
  navigation: StackNavigationProp<ScreenParamList, 'StartAssessment'>;
  route: RouteProp<ScreenParamList, 'StartAssessment'>;
};

export default class StartAssessmentScreen extends Component<StartAssessmentProps> {
  async componentDidMount() {
    Navigator.setNavigation(this.props.navigation);
    const currentPatient = this.props.route.params.currentPatient;
    const assessmentId = this.props.route.params.assessmentId ?? null;

    const userService = new UserService();
    const features = userService.getConfig();

    if (currentPatient.hasCompletedPatientDetails) {
      const mustBackfillProfile =
        ((features.showRaceQuestion || features.showEthnicityQuestion) && !currentPatient.hasRaceEthnicityAnswer) ||
        !currentPatient.hasPeriodAnswer ||
        !currentPatient.hasHormoneTreatmentAnswer ||
        !currentPatient.hasBloodPressureAnswer;

      if (mustBackfillProfile) {
        this.props.navigation.replace('ProfileBackDate', { currentPatient });
      } else if (currentPatient.shouldAskLevelOfIsolation) {
        this.props.navigation.replace('LevelOfIsolation', { currentPatient, assessmentId });
      } else {
        // Everything in this block should be replicated in Level Of Isolation navigation for now
        if (currentPatient.isHealthWorker) {
          this.props.navigation.replace('HealthWorkerExposure', { currentPatient, assessmentId });
        } else {
          this.props.navigation.replace('CovidTest', { currentPatient, assessmentId });
        }
      }
    } else {
      const nextPage = await Navigator.getStartPatientScreenName(currentPatient);
      Navigator.replaceScreen(nextPage, { currentPatient });
    }
  }

  render() {
    return null;
  }
}
