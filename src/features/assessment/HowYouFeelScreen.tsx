import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { BigButton } from '../../components/Button';
import ProgressStatus from '../../components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '../../components/Screen';
import { HeaderText } from '../../components/Text';
import UserService from '../../core/user/UserService';
import i18n from '../../locale/i18n';
import Navigator from '../Navigation';
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
    Navigator.resetNavigation(props.navigation);

    // Fix reference to `this` inside these functions
    this.handleFeelNormal = this.handleFeelNormal.bind(this);
    this.handleHaveSymptoms = this.handleHaveSymptoms.bind(this);
  }

  handleFeelNormal() {
    this.updateAssessment('healthy')
      .then((response) => Navigator.gotoEndAssessment())
      .catch((err) => this.setState({ errorMessage: i18n.t('something-went-wrong') }));
  }

  handleHaveSymptoms() {
    const currentPatient = this.props.route.params.currentPatient;
    this.updateAssessment('not_healthy')
      .then((response) =>
        this.props.navigation.navigate('DescribeSymptoms', { currentPatient, assessmentId: response.data.id })
      ) // todo julien: thank you
      .catch((err) => this.setState({ errorMessage: i18n.t('something-went-wrong') }));
  }

  private updateAssessment(status: string) {
    const assessmentId = this.props.route.params.assessmentId;
    const userService = new UserService();
    const promise = userService.updateAssessment(assessmentId, {
      health_status: status,
    });
    return promise;
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
