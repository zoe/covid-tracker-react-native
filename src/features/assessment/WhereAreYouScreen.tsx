import { assessmentService } from '@covid/Services';
import { BigButton } from '@covid/components/Button';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import AssessmentCoordinator from '@covid/features/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { ScreenParamList } from '../ScreenParamList';

type LocationProps = {
  navigation: StackNavigationProp<ScreenParamList, 'WhereAreYou'>;
  route: RouteProp<ScreenParamList, 'WhereAreYou'>;
};

export default class WhereAreYouScreen extends Component<LocationProps> {
  constructor(props: LocationProps) {
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

        <Form style={styles.form}>
          <FieldWrapper>
            <BigButton onPress={() => this.handleLocationSelection('home', true)}>
              <Text>{i18n.t('where-are-you.picker-location-home')}</Text>
            </BigButton>
          </FieldWrapper>

          <FieldWrapper>
            <BigButton onPress={() => this.handleLocationSelection('hospital', false)}>
              <Text>{i18n.t('where-are-you.picker-location-hospital')}</Text>
            </BigButton>
          </FieldWrapper>

          <FieldWrapper>
            <BigButton onPress={() => this.handleLocationSelection('back_from_hospital', false)}>
              <Text>{i18n.t('where-are-you.picker-location-back-from-hospital')}</Text>
            </BigButton>
          </FieldWrapper>

          <FieldWrapper>
            <BigButton onPress={() => this.handleLocationSelection('back_from_hospital', true)}>
              <Text>{i18n.t('where-are-you.picker-location-back-from-hospital-already-reported')}</Text>
            </BigButton>
          </FieldWrapper>
        </Form>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 32,
  },
});
