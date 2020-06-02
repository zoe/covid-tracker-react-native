import { assessmentService } from '@covid/Services';
import { BigButton } from '@covid/components/Button';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { CaptionText, HeaderText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Navigator from '../Navigation';
import { ScreenParamList } from '../ScreenParamList';

type TreatmentSelectionProps = {
  navigation: StackNavigationProp<ScreenParamList, 'TreatmentSelection'>;
  route: RouteProp<ScreenParamList, 'TreatmentSelection'>;
};

export default class TreatmentSelectionScreen extends Component<TreatmentSelectionProps> {
  constructor(props: TreatmentSelectionProps) {
    super(props);
    Navigator.resetNavigation(props.navigation);
  }

  handleTreatment = async (treatment: string) => {
    const { currentPatient, assessmentId, location } = this.props.route.params;

    if (treatment === 'other') {
      this.props.navigation.navigate('TreatmentOther', { currentPatient, assessmentId, location });
    } else {
      const assessment = { treatment };
      await assessmentService.completeAssessment(assessmentId, assessment);
      Navigator.gotoEndAssessment();
    }
  };

  render() {
    const currentPatient = this.props.route.params.currentPatient;
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

        <Form style={styles.form}>
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
        </Form>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 24,
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
