import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { USStudyInvite } from '@covid/components/USStudyInvite';
import { SelectorButton } from '@covid/components/SelectorButton';

import { ScreenParamList } from '../ScreenParamList';

type HowYouFeelProps = {
  navigation: StackNavigationProp<ScreenParamList, 'HowYouFeel'>;
  route: RouteProp<ScreenParamList, 'HowYouFeel'>;
};

type State = {
  errorMessage: string;
};

const initialState: State = {
  errorMessage: '',
};

export default class HowYouFeelScreen extends Component<HowYouFeelProps, State> {
  constructor(props: HowYouFeelProps) {
    super(props);
    this.state = initialState;
  }

  handleFeelNormal = async () => {
    try {
      const isAssessmentComplete = true;
      await this.updateAssessment('healthy', isAssessmentComplete);
      AssessmentCoordinator.goToNextHowYouFeelScreen(true);
    } catch (error) {
      // Error already handled.
    }
  };

  handleHaveSymptoms = async () => {
    try {
      await this.updateAssessment('not_healthy');
      AssessmentCoordinator.goToNextHowYouFeelScreen(false);
    } catch (error) {
      // Error already handled.
    }
  };

  private async updateAssessment(status: string, isComplete: boolean = false) {
    try {
      const assessmentId = AssessmentCoordinator.assessmentData.assessmentId;
      const assessment = {
        health_status: status,
      };
      if (isComplete) {
        await assessmentService.completeAssessment(assessmentId!, assessment);
      } else {
        await assessmentService.saveAssessment(assessmentId!, assessment);
      }
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
      throw error;
    }
  }

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;
    return (
      <>
        <USStudyInvite assessmentData={AssessmentCoordinator.assessmentData} />

        <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
          <Header>
            <HeaderText>{i18n.t('how-you-feel.question-health-status')}</HeaderText>
          </Header>

          <ProgressBlock>
            <ProgressStatus step={3} maxSteps={5} />
          </ProgressBlock>

          <View style={styles.content}>
            <SelectorButton
              onPress={this.handleFeelNormal}
              text={i18n.t('how-you-feel.picker-health-status-healthy')}
            />

            <SelectorButton
              onPress={this.handleHaveSymptoms}
              text={i18n.t('how-you-feel.picker-health-status-not-healthy')}
            />
          </View>
        </Screen>
      </>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 32,
  },
});
