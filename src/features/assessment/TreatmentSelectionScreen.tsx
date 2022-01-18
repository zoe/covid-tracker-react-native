import { BigButton } from '@covid/components';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { CaptionText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { assessmentService } from '@covid/services';
import { sizes } from '@covid/themes';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  route: RouteProp<TScreenParamList, 'TreatmentSelection'>;
}

function TreatmentSelectionScreen({ route }: IProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const title =
    route.params?.location === 'back_from_hospital'
      ? i18n.t('treatment-selection-title-after')
      : i18n.t('treatment-selection-title-during');
  const isFocused = useIsFocused();

  const handleTreatment = async (treatment: string) => {
    const location = route.params?.location;
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    if (treatment === 'other') {
      assessmentCoordinator.gotoNextScreen(route.name, { location, other: true });
    } else {
      const assessment = { treatment };
      await assessmentService.completeAssessment(
        assessment,
        assessmentCoordinator.assessmentData?.patientData?.patientInfo!,
      );
      assessmentCoordinator.gotoNextScreen(route.name, { location, other: false });
    }
  };

  React.useEffect(() => {
    setIsSubmitting(false);
  }, [isFocused]);

  return (
    <Screen
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="treatment-selection-screen"
    >
      <ProgressHeader currentStep={4} maxSteps={5} title={title} />

      <BigButton onPress={() => handleTreatment('none')} style={styles.marginTop}>
        <Text>{i18n.t('treatment-selection-picker-none')}</Text>
      </BigButton>

      <BigButton onPress={() => handleTreatment('oxygen')} style={styles.marginTop}>
        <Text>{i18n.t('treatment-selection-picker-oxygen')}</Text>
      </BigButton>
      <CaptionText style={styles.text}>{i18n.t('treatment-selection-picker-subtext-oxygen')}</CaptionText>

      <BigButton onPress={() => handleTreatment('nonInvasiveVentilation')} style={styles.marginTop}>
        <Text>{i18n.t('treatment-selection-picker-non-invasive-ventilation')}</Text>
      </BigButton>
      <CaptionText style={styles.text}>
        {i18n.t('treatment-selection-picker-subtext-non-invasive-ventilation')}
      </CaptionText>

      <BigButton onPress={() => handleTreatment('invasiveVentilation')} style={styles.marginTop}>
        <Text>{i18n.t('treatment-selection-picker-invasive-ventilation')}</Text>
      </BigButton>

      <CaptionText style={styles.text}>{i18n.t('treatment-selection-picker-subtext-invasive-ventilation')}</CaptionText>

      <BigButton onPress={() => handleTreatment('other')} style={styles.marginTop}>
        <Text>{i18n.t('treatment-selection-picker-other')}</Text>
      </BigButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: sizes.xl,
  },
  text: {
    marginTop: sizes.xs,
    textAlign: 'center',
  },
});

export default TreatmentSelectionScreen;
