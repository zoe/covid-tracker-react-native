import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { SelectorButton } from '@covid/components/SelectorButton';
import { HeaderText } from '@covid/components/Text';
import { Text } from '@covid/components/typography';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomSheet } from 'react-native-elements';

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
        assessmentCoordinator.assessmentData.patientData.patientInfo!,
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
      assessmentCoordinator.gotoNextScreen(route.name, { endAssessment, location });
    } catch (error) {
      // TODO - activate messaging for error handling;
      setIsSubmitting(false);
    }
  };

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const offeredPcrTest = false;

  const offerPcrTest = () => {
    if (!offeredPcrTest) {
      setBottomSheetVisible(true);
    } else {
      handleLocationSelection('home', true);
    }
  };

  useEffect(() => {
    setIsSubmitting(false);
  }, [isFocused]);

  return (
    <Screen navigation={navigation} profile={currentPatient.profile}>
      <Header>
        <HeaderText>{i18n.t('where-are-you.question-location')}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus maxSteps={6} step={6} />
      </ProgressBlock>

      <View style={styles.content}>
        <SelectorButton onPress={() => offerPcrTest()} text={i18n.t('where-are-you.picker-location-home')} />
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

      <BottomSheet isVisible={bottomSheetVisible} modalProps={{ animationType: 'slide' }}>
        <TouchableOpacity onPress={() => setBottomSheetVisible(false)}>
          <Text>Close</Text>
        </TouchableOpacity>
        <Text>{i18n.t('pcr-test.question-interest')}</Text>
        <Text>{i18n.t('pcr-test.description')}</Text>
        <TouchableOpacity>
          <Text>{i18n.t('pcr-test.learn-more')}</Text>
        </TouchableOpacity>
      </BottomSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 32,
  },
});

export default WhereAreYouScreen;
