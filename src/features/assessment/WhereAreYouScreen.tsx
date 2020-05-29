import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { BigButton } from '@covid/components/Button';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import UserService from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '../ScreenParamList';

type LocationProps = {
  navigation: StackNavigationProp<ScreenParamList, 'WhereAreYou'>;
  route: RouteProp<ScreenParamList, 'WhereAreYou'>;
};

export default class WhereAreYouScreen extends Component<LocationProps> {
  constructor(props: LocationProps) {
    super(props);
    this.props.route.params.coordinator.resetNavigation(props.navigation);
  }

  handleLocationSelection = (location: string, endAssessment: boolean) => {
    this.updateAssessment(location)
      .then(() => this.props.route.params.coordinator.goToNextWhereAreYouScreen(location, endAssessment))
      .catch(() => this.setState({ errorMessage: i18n.t('something-went-wrong') }));
  };

  private updateAssessment(status: string) {
    const assessmentId = this.props.route.params.coordinator.assessmentId;
    const userService = new UserService();
    return userService.updateAssessment(assessmentId!!, { location: status });
  }

  render() {
    const currentPatient = this.props.route.params.coordinator.currentPatient;

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
