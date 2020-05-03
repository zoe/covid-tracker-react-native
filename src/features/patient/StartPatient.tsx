import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';

import { ScreenParamList } from '../ScreenParamList';

type StartPatientProps = {
  navigation: StackNavigationProp<ScreenParamList, 'StartPatient'>;
  route: RouteProp<ScreenParamList, 'StartPatient'>;
};

export default class StartPatientScreen extends Component<StartPatientProps> {
  async componentDidMount() {
    const currentPatient = this.props.route.params.currentPatient;
    this.props.navigation.replace('YourWork', { currentPatient });
  }

  render() {
    return null;
  }
}
