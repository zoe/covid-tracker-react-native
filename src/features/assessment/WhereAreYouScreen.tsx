import { closeIcon } from '@assets';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { SelectorButton } from '@covid/components/SelectorButton';
import { ClickableText, Header3Text, HeaderText, SecondaryText } from '@covid/components/Text';
import { Text } from '@covid/components/typography';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { openWebLink } from '@covid/utils/links';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
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

  const pcrTestDeclined = () => {
    console.log('hi');
    setBottomSheetVisible(false);
    handleLocationSelection('home', true);
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

      <BottomSheet
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        isVisible={bottomSheetVisible}
        modalProps={{ animationType: 'slide' }}
      >
        <View style={styles.bottomSheet}>
          <TouchableOpacity onPress={() => pcrTestDeclined()}>
            <Image source={closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setBottomSheetVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
          <Header3Text style={styles.question}>{i18n.t('pcr-test.question-interest')}</Header3Text>
          <SecondaryText style={styles.description}>{i18n.t('pcr-test.description')}</SecondaryText>
          <ClickableText onPress={() => openWebLink(i18n.t('pcr-test.pcr-link'))}>
            {i18n.t('pcr-test.learn-more')}
          </ClickableText>
        </View>
      </BottomSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: '#f7f7f7',
    paddingBottom: 45,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    height: 20,
    marginBottom: 20,
    width: 20,
  },
  content: {
    marginVertical: 32,
  },
  description: {
    marginBottom: 18,
  },
  question: {
    marginBottom: 32,
  },
});

export default WhereAreYouScreen;
