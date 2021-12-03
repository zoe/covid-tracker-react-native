import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { SelectorButton } from '@covid/components/SelectorButton';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { assessmentService } from '@covid/services';
import { sizes } from '@covid/themes';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  route: RouteProp<TScreenParamList, 'WhereAreYou'>;
}

function WhereAreYouScreen({ route }: IProps) {
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
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="where-are-you-screen"
    >
      <ProgressHeader currentStep={6} maxSteps={6} title={i18n.t('where-are-you.question-location')} />

      <SelectorButton
        onPress={() => handleLocationSelection('home', true)}
        style={styles.marginTop}
        testID="button-location-home"
        text={i18n.t('where-are-you.picker-location-home')}
      />
      <SelectorButton
        onPress={() => handleLocationSelection('hospital', false)}
        style={styles.marginTop}
        testID="button-location-hospital"
        text={i18n.t('where-are-you.picker-location-hospital')}
      />
      <SelectorButton
        onPress={() => handleLocationSelection('back_from_hospital', false)}
        style={styles.marginTop}
        testID="button-location-back-from-hospital"
        text={i18n.t('where-are-you.picker-location-back-from-hospital')}
      />
      <SelectorButton
        onPress={() => handleLocationSelection('back_from_hospital', true)}
        style={styles.marginTop}
        testID="button-location-back-from-hospital-already-reported"
        text={i18n.t('where-are-you.picker-location-back-from-hospital-already-reported')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: sizes.xl,
  },
  marginVertical: {
    marginVertical: sizes.xl,
  },
});

export default WhereAreYouScreen;
