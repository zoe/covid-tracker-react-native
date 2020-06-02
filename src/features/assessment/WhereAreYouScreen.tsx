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

const ASSESSMENT_COMPLETE = true;

type LocationProps = {
  navigation: StackNavigationProp<ScreenParamList, 'WhereAreYou'>;
  route: RouteProp<ScreenParamList, 'WhereAreYou'>;
};

export default class WhereAreYouScreen extends Component<LocationProps> {
  constructor(props: LocationProps) {
    super(props);
    Navigator.resetNavigation(props.navigation);
  }

  handleAtHome = async () => {
    if (await this.updateAssessment('home', ASSESSMENT_COMPLETE)) {
      Navigator.gotoEndAssessment();
    }
  };

  handleAtHospital = async () => {
    const { currentPatient, assessmentId } = this.props.route.params;
    const location = 'hospital';
    if (await this.updateAssessment(location)) {
      this.props.navigation.navigate('TreatmentSelection', {
        currentPatient,
        assessmentId,
        location,
      });
    }
  };

  handleBackAtHome = async () => {
    const { currentPatient, assessmentId } = this.props.route.params;
    const location = 'back_from_hospital';
    if (await this.updateAssessment(location)) {
      this.props.navigation.navigate('TreatmentSelection', {
        currentPatient,
        assessmentId,
        location,
      });
    }
  };

  handleStillAtHome = async () => {
    if (await this.updateAssessment('back_from_hospital', ASSESSMENT_COMPLETE)) {
      Navigator.gotoEndAssessment();
    }
  };

  private async updateAssessment(status: string, isComplete = false) {
    try {
      const assessmentId = this.props.route.params.assessmentId;
      const assessment = {
        location: status,
      };

      if (isComplete) {
        await assessmentService.completeAssessment(assessmentId, assessment);
      } else {
        await assessmentService.saveAssessment(assessmentId, assessment);
      }
      return true;
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
    }
    return false;
  }

  render() {
    const currentPatient = this.props.route.params.currentPatient;

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('where-are-you.question-location')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={4} maxSteps={5} />
        </ProgressBlock>

        <Form style={styles.form}>
          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={this.handleAtHome}>
              <Text>{i18n.t('where-are-you.picker-location-home')}</Text>
            </BigButton>
          </FieldWrapper>

          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={this.handleAtHospital}>
              <Text>{i18n.t('where-are-you.picker-location-hospital')}</Text>
            </BigButton>
          </FieldWrapper>

          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={this.handleBackAtHome}>
              <Text>{i18n.t('where-are-you.picker-location-back-from-hospital')}</Text>
            </BigButton>
          </FieldWrapper>

          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={this.handleStillAtHome}>
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

  fieldWrapper: {
    // marginVertical: 32,
  },
});
