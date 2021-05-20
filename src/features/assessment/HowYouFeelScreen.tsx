import { RightArrow } from '@assets';
import InfoCircle from '@assets/icons/InfoCircle';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { SelectorButton } from '@covid/components/SelectorButton';
import { HeaderText, RegularBoldText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { RootState } from '@covid/core/state/root';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { assessmentService, longCovidApiClient } from '@covid/Services';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { USStudyInvite } from './partials/USStudyInvite';

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

    console.log('assessmentCoordinator.assessmentData.patientData: ',assessmentCoordinator.assessmentData.patientData)
    console.log('assessmentCoordinator.assessmentData.patientData.should_ask_long_covid_questions: ',assessmentCoordinator.assessmentData.patientData.patientInfo?.should_ask_long_covid_questions)

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
    if (assessmentCoordinator.assessmentData.patientData.patientInfo?.should_ask_long_covid_questions) {
      NavigatorService.navigate('LongCovidStart', { patientData: assessmentCoordinator.assessmentData.patientData });
      return;
    }
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
          assessmentCoordinator.assessmentData.patientData.patientInfo!,
        );
      } else {
        assessmentService.saveAssessment(assessment);
      }
    } catch (error) {
      setErrorMessage(i18n.t('something-went-wrong'));
      setIsSubmitting(false);
    }
  }

  let currentProfileVaccineEnteredText;
  if (currentProfileVaccines.length) {
    currentProfileVaccineEnteredText = (
      <TouchableOpacity onPress={() => assessmentCoordinator.goToVaccineLogSymptomsInfo()} style={{ margin: 16 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.1 }}>
            <InfoCircle color={colors.linkBlue} />
          </View>
          <RegularText style={{ color: colors.linkBlue, flex: 0.9 }}>
            {i18n.t('how-you-feel.vaccine-reporting-message')}
          </RegularText>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: 32, marginTop: 16 }}>
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

      <Screen navigation={navigation} profile={currentPatient.profile}>
        <Header>
          <HeaderText>{i18n.t('how-you-feel.question-health-status')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={1} step={0} />
        </ProgressBlock>

        <TouchableOpacity onPress={() => assessmentCoordinator.editLocation()} style={{ padding: 16 }}>
          <RegularText>
            <RegularText>{`${i18n.t('how-you-feel.current-location')} `}</RegularText>
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
