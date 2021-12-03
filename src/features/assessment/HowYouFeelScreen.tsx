import { RightArrow } from '@assets';
import InfoCircle from '@assets/icons/InfoCircle';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { SelectorButton } from '@covid/components/SelectorButton';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { TRootState } from '@covid/core/state/root';
import { TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { assessmentService } from '@covid/services';
import { sizes, styling } from '@covid/themes';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { USStudyInvite } from './partials/USStudyInvite';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'HowYouFeel'>;
  route: RouteProp<TScreenParamList, 'HowYouFeel'>;
};

export const HowYouFeelScreen: React.FC<TProps> = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const currentProfileVaccines = useSelector<TRootState, TVaccineRequest[]>((state) => state.vaccines.vaccines);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const patientInfo = assessmentCoordinator.assessmentData?.patientData?.patientInfo;
    const { getName } = require('country-list');

    return navigation.addListener('focus', () => {
      setLocation(
        patientInfo?.current_country_code
          ? getName(patientInfo?.current_country_code)
          : patientInfo?.current_postcode ?? patientInfo?.postcode!,
      );
    });
  }, [navigation]);

  const currentProfileHasVaccine = () =>
    currentProfileVaccines.length &&
    currentProfileVaccines[0] &&
    assessmentCoordinator.assessmentData?.patientData?.patientId === currentProfileVaccines[0].patient;

  async function updateAssessment(status: string, isComplete: boolean) {
    try {
      const assessment = {
        health_status: status,
      };
      if (isComplete) {
        await assessmentService.completeAssessment(
          assessment,
          assessmentCoordinator.assessmentData?.patientData?.patientInfo!,
        );
      } else {
        assessmentService.saveAssessment(assessment);
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  }

  const handlePress = async (healthy: boolean) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const status = healthy ? 'healthy' : 'not_healthy';
    await updateAssessment(status, healthy);
    assessmentCoordinator.gotoNextScreen(route.name, healthy);
  };

  let currentProfileVaccineEnteredText;
  if (currentProfileHasVaccine()) {
    currentProfileVaccineEnteredText = (
      <TouchableOpacity onPress={() => assessmentCoordinator.goToVaccineLogSymptomsInfo()} style={{ margin: sizes.m }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.1 }}>
            <InfoCircle color={colors.linkBlue} />
          </View>
          <RegularText style={{ color: colors.linkBlue, flex: 0.9 }}>
            {i18n.t('how-you-feel.vaccine-reporting-message')}
          </RegularText>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: sizes.xl, marginTop: sizes.m }}>
          <View style={{ paddingRight: sizes.xs }}>
            <RightArrow color={colors.linkBlue} />
          </View>
          <RegularBoldText style={{ color: colors.linkBlue }}>
            {i18n.t('how-you-feel.vaccine-reporting-link')}
          </RegularBoldText>
        </View>
      </TouchableOpacity>
    );
  }

  React.useEffect(() => {
    setIsSubmitting(false);
  }, [isFocused]);

  return (
    <>
      <USStudyInvite assessmentData={assessmentCoordinator.assessmentData} />

      <Screen
        profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
        testID="how-you-feel-screen"
      >
        <ProgressHeader currentStep={0} maxSteps={1} title={i18n.t('how-you-feel.question-health-status')} />

        <TouchableOpacity onPress={() => assessmentCoordinator.editLocation()} style={{ paddingVertical: sizes.xl }}>
          <RegularText>
            <RegularText>{`${i18n.t('how-you-feel.current-location')} `}</RegularText>
            <RegularText style={{ fontFamily: 'SofiaPro-Medium' }}>{location}</RegularText>
          </RegularText>
          <RegularText style={{ color: colors.purple }}>{i18n.t('how-you-feel.update-location')}</RegularText>
        </TouchableOpacity>

        {currentProfileVaccineEnteredText}

        <SelectorButton
          onPress={() => handlePress(true)}
          style={styling.marginBottomHuge}
          testID="button-status-healthy"
          text={i18n.t('how-you-feel.picker-health-status-healthy')}
        />
        <SelectorButton
          onPress={() => handlePress(false)}
          testID="button-status-not-healthy"
          text={i18n.t('how-you-feel.picker-health-status-not-healthy')}
        />
      </Screen>
    </>
  );
};
