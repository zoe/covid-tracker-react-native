import { assessmentService } from '@covid/Services';
import { BigButton } from '@covid/components/Button';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Navigator from '../Navigation';
import { ScreenParamList } from '../ScreenParamList';

const ASSESSMENT_COMPLETED = true;

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
    Navigator.resetNavigation(props.navigation);

    // Fix reference to `this` inside these functions
    this.handleFeelNormal = this.handleFeelNormal.bind(this);
    this.handleHaveSymptoms = this.handleHaveSymptoms.bind(this);
  }

  async handleFeelNormal() {
    if (await this.updateAssessment('healthy', ASSESSMENT_COMPLETED)) {
      Navigator.gotoEndAssessment();
    }
  }

  async handleHaveSymptoms() {
    const { assessmentId, currentPatient } = this.props.route.params;
    if (await this.updateAssessment('not_healthy')) {
      this.props.navigation.navigate('DescribeSymptoms', { currentPatient, assessmentId });
    }
  }

  private async updateAssessment(status: string, isComplete: boolean = false) {
    try {
      const assessmentId = this.props.route.params.assessmentId;
      const assessment = {
        health_status: status,
      };
      if (isComplete) {
        await assessmentService.completeAssessment(assessmentId, assessment);
      } else {
        await assessmentService.saveAssessment(assessmentId, assessment);
      }
      return true;
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
      return false;
    }
  }

  render() {
    const currentPatient = this.props.route.params.currentPatient;
    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('how-you-feel.question-health-status')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={3} maxSteps={5} />
        </ProgressBlock>

        <Form style={styles.form}>
          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={this.handleFeelNormal}>
              <Text>{i18n.t('how-you-feel.picker-health-status-healthy')}</Text>
            </BigButton>
          </FieldWrapper>

          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={this.handleHaveSymptoms}>
              <Text>{i18n.t('how-you-feel.picker-health-status-not-healthy')}</Text>
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

  fieldWrapper: {
    marginVertical: 32,
  },
});
