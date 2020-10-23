import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { Divider, HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { USStudyInvite } from '@covid/components/USStudyInvite';
import { SelectorButton } from '@covid/components/SelectorButton';
import { colors } from '@theme';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'HowYouFeel'>;
  route: RouteProp<ScreenParamList, 'HowYouFeel'>;
};

export const HowYouFeelScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const { patientInfo } = assessmentCoordinator.assessmentData.patientData;
    const { getName } = require('country-list');

    return navigation.addListener('focus', () => {
      const location = patientInfo?.current_country_code
        ? getName(patientInfo?.current_country_code)
        : patientInfo?.current_postcode ?? patientInfo?.postcode!;
      setLocation(location);
    });
  }, [navigation]);

  const handlePress = async (healthy: boolean) => {
    const status = healthy ? 'healthy' : 'not_healthy';
    await updateAssessment(status, healthy);
    assessmentCoordinator.gotoNextScreen(route.name, healthy);
  };

  async function updateAssessment(status: string, isComplete: boolean) {
    try {
      const assessment = {
        health_status: status,
      };
      if (isComplete) {
        await assessmentService.completeAssessment(
          assessment,
          assessmentCoordinator.assessmentData.patientData.patientInfo!
        );
      } else {
        await assessmentService.saveAssessment(assessment);
      }
    } catch (error) {
      setErrorMessage(i18n.t('something-went-wrong'));
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

        <Divider />

        <>
          <TouchableOpacity style={{ padding: 16 }} onPress={() => assessmentCoordinator.editLocation()}>
            <RegularText>
              <RegularText>{i18n.t('how-you-feel.current-location') + ' '}</RegularText>
              <RegularText style={{ fontWeight: 'bold' }}>{location}</RegularText>
            </RegularText>
            <RegularText style={{ color: colors.purple }}>{i18n.t('how-you-feel.update-location')}</RegularText>
          </TouchableOpacity>

          <SelectorButton
            onPress={() => handlePress(true)}
            text={i18n.t('how-you-feel.picker-health-status-healthy')}
          />
          <SelectorButton
            onPress={() => handlePress(false)}
            text={i18n.t('how-you-feel.picker-health-status-not-healthy')}
          />
        </>
      </Screen>
    </>
  );
};
