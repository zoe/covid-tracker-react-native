import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { BigButton } from '@covid/components/BigButton';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { CaptionText, HeaderText } from '@covid/components/Text';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';

import { ScreenParamList } from '../ScreenParamList';

type TreatmentSelectionProps = {
  navigation: StackNavigationProp<ScreenParamList, 'TreatmentSelection'>;
  route: RouteProp<ScreenParamList, 'TreatmentSelection'>;
};

export default class TreatmentSelectionScreen extends Component<TreatmentSelectionProps> {
  handleTreatment = async (treatment: string) => {
    const { assessmentId } = AssessmentCoordinator.assessmentData;
    const { location } = this.props.route.params;

    if (treatment === 'other') {
      AssessmentCoordinator.goToNextTreatmentSelectionScreen(true, location);
    } else {
      const assessment = { treatment };
      await assessmentService.completeAssessment(assessmentId!, assessment);
      AssessmentCoordinator.goToNextTreatmentSelectionScreen(false, location);
    }
  };

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;
    const title =
      this.props.route.params.location === 'back_from_hospital'
        ? i18n.t('treatment-selection-title-after')
        : i18n.t('treatment-selection-title-during');

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{title}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={4} maxSteps={5} />
        </ProgressBlock>

        <View style={styles.content}>
          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={() => this.handleTreatment('none')}>
              <Text>{i18n.t('treatment-selection-picker-none')}</Text>
            </BigButton>
          </FieldWrapper>

          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={() => this.handleTreatment('oxygen')}>
              <Text>{i18n.t('treatment-selection-picker-oxygen')}</Text>
            </BigButton>
            <CaptionText style={styles.indentedText}>{i18n.t('treatment-selection-picker-subtext-oxygen')}</CaptionText>
          </FieldWrapper>

          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={() => this.handleTreatment('nonInvasiveVentilation')}>
              <Text>{i18n.t('treatment-selection-picker-non-invasive-ventilation')}</Text>
            </BigButton>
            <CaptionText style={styles.indentedText}>
              {i18n.t('treatment-selection-picker-subtext-non-invasive-ventilation')}
            </CaptionText>
          </FieldWrapper>

          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={() => this.handleTreatment('invasiveVentilation')}>
              <Text>{i18n.t('treatment-selection-picker-invasive-ventilation')}</Text>
            </BigButton>
            <CaptionText style={styles.indentedText}>
              {i18n.t('treatment-selection-picker-subtext-invasive-ventilation')}
            </CaptionText>
          </FieldWrapper>

          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={() => this.handleTreatment('other')}>
              <Text>{i18n.t('treatment-selection-picker-other')}</Text>
            </BigButton>
          </FieldWrapper>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 36,
  },

  fieldWrapper: {
    marginVertical: 8,
  },

  indentedText: {
    marginHorizontal: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});
