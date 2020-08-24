import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { USStudyInvite } from '@covid/components/USStudyInvite';
import { SelectorButton } from '@covid/components/SelectorButton';
import { colors } from '@theme';

import { ScreenParamList } from '../ScreenParamList';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'HowYouFeel'>;
  route: RouteProp<ScreenParamList, 'HowYouFeel'>;
};

export const HowYouFeelScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const { patientInfo } = assessmentCoordinator.assessmentData.patientData;

    return navigation.addListener('focus', () => {
      const location = patientInfo?.current_country_code ?? patientInfo?.current_postcode ?? patientInfo?.postcode!;

      setLocation(location);
    });
  }, [navigation]);

  const handleFeelNormal = async () => {
    try {
      const isAssessmentComplete = true;
      await updateAssessment('healthy', isAssessmentComplete);
      assessmentCoordinator.goToNextHowYouFeelScreen(true);
    } catch (error) {
      // Error already handled.
    }
  };

  const handleHaveSymptoms = async () => {
    try {
      await updateAssessment('not_healthy');
      assessmentCoordinator.goToNextHowYouFeelScreen(false);
    } catch (error) {
      // Error already handled.
    }
  };

  async function updateAssessment(status: string, isComplete: boolean = false) {
    try {
      const assessmentId = assessmentCoordinator.assessmentData.assessmentId;
      const assessment = {
        health_status: status,
      };
      if (isComplete) {
        await assessmentService.completeAssessment(
          assessmentId!,
          assessment,
          assessmentCoordinator.assessmentData.patientData.patientInfo!
        );
      } else {
        await assessmentService.saveAssessment(assessmentId!, assessment);
      }
    } catch (error) {
      setErrorMessage(i18n.t('something-went-wrong'));
      throw error;
    }
  }

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <>
      <USStudyInvite assessmentData={assessmentCoordinator.assessmentData} />

      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('how-you-feel.question-health-status')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={3} maxSteps={5} />
        </ProgressBlock>

        <View style={styles.content}>
          {assessmentCoordinator.shouldShowEditLocation() && (
            <TouchableOpacity style={{ paddingHorizontal: 16 }} onPress={() => assessmentCoordinator.editLocation()}>
              <RegularText>You are reporting from: {location}</RegularText>
              <RegularText style={{ color: colors.purple }}>{i18n.t('how-you-feel.update-location')}</RegularText>
            </TouchableOpacity>
          )}

          <SelectorButton onPress={handleFeelNormal} text={i18n.t('how-you-feel.picker-health-status-healthy')} />

          <SelectorButton onPress={handleHaveSymptoms} text={i18n.t('how-you-feel.picker-health-status-not-healthy')} />
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    marginVertical: 32,
  },
});
