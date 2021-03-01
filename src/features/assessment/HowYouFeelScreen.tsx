import React, { useEffect, useState } from 'react';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import { useSelector } from 'react-redux';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText, RegularBoldText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { USStudyInvite } from '@covid/components/USStudyInvite';
import { SelectorButton } from '@covid/components/SelectorButton';
import { colors } from '@theme';
import InfoCircle from '@assets/icons/InfoCircle';
import { RightArrow } from '@assets';
import { RootState } from '@covid/core/state/root';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'HowYouFeel'>;
  route: RouteProp<ScreenParamList, 'HowYouFeel'>;
};

export const HowYouFeelScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState('');
  const currentProfileVaccines = useSelector<RootState, VaccineRequest[]>((state) => state.vaccines.vaccines);
  const isFocused = useIsFocused();

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
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
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
        assessmentService.saveAssessment(assessment);
      }
    } catch (error) {
      setErrorMessage(i18n.t('something-went-wrong'));
    }
  }

  let currentProfileVaccineEnteredText;
  if (currentProfileVaccines.length) {
    currentProfileVaccineEnteredText = (
      <TouchableOpacity style={{ margin: 16 }} onPress={() => assessmentCoordinator.goToVaccineLogSymptomsInfo()}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.1 }}>
            <InfoCircle color={colors.linkBlue} />
          </View>
          <RegularText style={{ color: colors.linkBlue, flex: 0.9 }}>
            {i18n.t('how-you-feel.vaccine-reporting-message')}
          </RegularText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 32, marginTop: 16 }}>
          <View style={{ paddingRight: 8 }}>
            <RightArrow color={colors.linkBlue} />
          </View>
          <RegularBoldText style={{ color: colors.linkBlue }}>
            {i18n.t('how-you-feel.vaccine-reporting-link')}
          </RegularBoldText>
        </View>
      </TouchableOpacity>
    );
  }

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;

  useEffect(() => {
    setIsSubmitting(false);
  }, [isFocused]);

  return (
    <>
      <USStudyInvite assessmentData={assessmentCoordinator.assessmentData} />

      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('how-you-feel.question-health-status')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={0} maxSteps={1} />
        </ProgressBlock>

        <TouchableOpacity style={{ padding: 16 }} onPress={() => assessmentCoordinator.editLocation()}>
          <RegularText>
            <RegularText>{i18n.t('how-you-feel.current-location') + ' '}</RegularText>
            <RegularText style={{ fontFamily: 'SofiaPro-Medium' }}>{location}</RegularText>
          </RegularText>
          <RegularText style={{ color: colors.purple }}>{i18n.t('how-you-feel.update-location')}</RegularText>
        </TouchableOpacity>

        {currentProfileVaccineEnteredText}

        <View style={{ marginHorizontal: 16 }}>
          <SelectorButton
            onPress={() => handlePress(true)}
            text={i18n.t('how-you-feel.picker-health-status-healthy')}
          />
          <SelectorButton
            onPress={() => handlePress(false)}
            text={i18n.t('how-you-feel.picker-health-status-not-healthy')}
          />
        </View>
      </Screen>
    </>
  );
};
