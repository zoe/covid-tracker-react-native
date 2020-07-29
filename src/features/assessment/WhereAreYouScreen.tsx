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
import { SelectorButton } from '@covid/components/SelectorButton';

import { ScreenParamList } from '../ScreenParamList';

type LocationProps = {
  navigation: StackNavigationProp<ScreenParamList, 'WhereAreYou'>;
  route: RouteProp<ScreenParamList, 'WhereAreYou'>;
};

export default class WhereAreYouScreen extends Component<LocationProps> {
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

  handleLocationSelection = async (location: string, endAssessment: boolean) => {
    try {
      await this.updateAssessment(location, endAssessment);
      AssessmentCoordinator.goToNextWhereAreYouScreen(location, endAssessment);
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
    }
  };

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('where-are-you.question-location')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={4} maxSteps={5} />
        </ProgressBlock>

        <View style={styles.content}>
          <SelectorButton
            onPress={() => this.handleLocationSelection('home', true)}
            text={i18n.t('where-are-you.picker-location-home')}
          />
          <SelectorButton
            onPress={() => this.handleLocationSelection('hospital', false)}
            text={i18n.t('where-are-you.picker-location-hospital')}
          />
          <SelectorButton
            onPress={() => this.handleLocationSelection('back_from_hospital', false)}
            text={i18n.t('where-are-you.picker-location-back-from-hospital')}
          />
          <SelectorButton
            onPress={() => this.handleLocationSelection('back_from_hospital', true)}
            text={i18n.t('where-are-you.picker-location-back-from-hospital-already-reported')}
          />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 32,
  },
});
