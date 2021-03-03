import React, { useEffect, useState } from 'react';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { SelectorButton } from '@covid/components/SelectorButton';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';

import { ScreenParamList } from '../ScreenParamList';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'WhereAreYou'>;
  route: RouteProp<ScreenParamList, 'WhereAreYou'>;
}

function WhereAreYouScreen({ navigation, route }: IProps) {
  const isFocused = useIsFocused();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;

  const updateAssessment = async (status: string, isComplete = false) => {
    const assessment = {
      location: status,
    };

    if (isComplete) {
      await assessmentService.completeAssessment(
        assessment,
        assessmentCoordinator.assessmentData.patientData.patientInfo!
      );
    } else {
      assessmentService.saveAssessment(assessment);
    }
  };

  const handleLocationSelection = async (location: string, endAssessment: boolean) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      await updateAssessment(location, endAssessment);
      assessmentCoordinator.gotoNextScreen(route.name, { location, endAssessment });
    } catch (error) {
      // TODO - activate messaging for error handling;
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setIsSubmitting(false);
  }, [isFocused]);

  return (
    <Screen profile={currentPatient.profile} navigation={navigation}>
      <Header>
        <HeaderText>{i18n.t('where-are-you.question-location')}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus step={6} maxSteps={6} />
      </ProgressBlock>

      <View style={styles.content}>
        <SelectorButton
          onPress={() => handleLocationSelection('home', true)}
          text={i18n.t('where-are-you.picker-location-home')}
        />
        <SelectorButton
          onPress={() => handleLocationSelection('hospital', false)}
          text={i18n.t('where-are-you.picker-location-hospital')}
        />
        <SelectorButton
          onPress={() => handleLocationSelection('back_from_hospital', false)}
          text={i18n.t('where-are-you.picker-location-back-from-hospital')}
        />
        <SelectorButton
          onPress={() => handleLocationSelection('back_from_hospital', true)}
          text={i18n.t('where-are-you.picker-location-back-from-hospital-already-reported')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 32,
  },
});

export default WhereAreYouScreen;
