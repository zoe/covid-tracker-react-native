import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { SelectorButton } from '@covid/components/SelectorButton';
import { HeaderText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/services';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'WhereAreYou'>;
  route: RouteProp<ScreenParamList, 'WhereAreYou'>;
}

function WhereAreYouScreen({ navigation, route }: IProps) {
  const isFocused = useIsFocused();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const updateAssessment = async (status: string, isComplete = false) => {
    const assessment = {
      location: status,
    };

    if (isComplete) {
      await assessmentService.completeAssessment(
        assessment,
        assessmentCoordinator.assessmentData?.patientData?.patientInfo!,
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

  React.useEffect(() => {
    setIsSubmitting(false);
  }, [isFocused]);

  return (
    <Screen
      navigation={navigation}
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="where-are-you-screen"
    >
      <Header>
        <HeaderText>{i18n.t('where-are-you.question-location')}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus maxSteps={6} step={6} />
      </ProgressBlock>

      <View style={styles.content}>
        <SelectorButton
          onPress={() => handleLocationSelection('home', true)}
          testID="button-location-home"
          text={i18n.t('where-are-you.picker-location-home')}
        />
        <SelectorButton
          onPress={() => handleLocationSelection('hospital', false)}
          testID="button-location-hospital"
          text={i18n.t('where-are-you.picker-location-hospital')}
        />
        <SelectorButton
          onPress={() => handleLocationSelection('back_from_hospital', false)}
          testID="button-location-back-from-hospital"
          text={i18n.t('where-are-you.picker-location-back-from-hospital')}
        />
        <SelectorButton
          onPress={() => handleLocationSelection('back_from_hospital', true)}
          testID="button-location-back-from-hospital-already-reported"
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
