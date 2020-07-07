import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { assessmentService } from '@covid/Services';
import { ScreenParamList } from '@covid/features/ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyAboutYou'>;
  route: RouteProp<ScreenParamList, 'DietStudyAboutYou'>;
};

export default class DietStudyAboutYouScreen extends Component<Props> {
  constructor(props: Props) {
    super(props);
    AssessmentCoordinator.resetNavigation(props.navigation);
  }

  private async updateAssessment(status: string, isComplete = false) {
    const { assessmentId } = AssessmentCoordinator.assessmentData;
    const assessment = {
      location: status,
    };

    if (isComplete) {
      await assessmentService.completeAssessment(assessmentId!, assessment);
    } else {
      await assessmentService.saveAssessment(assessmentId!, assessment);
    }
  }

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{}</HeaderText>
        </Header>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({});
