import { BigButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { CaptionText, HeaderText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/services';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'TreatmentSelection'>;
  route: RouteProp<ScreenParamList, 'TreatmentSelection'>;
}

function TreatmentSelectionScreen({ navigation, route }: IProps) {
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
      navigation={navigation}
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="treatment-selection-screen"
    >
      <Header>
        <HeaderText>{title}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus maxSteps={5} step={4} />
      </ProgressBlock>

      <View style={styles.content}>
        <FieldWrapper style={styles.fieldWrapper}>
          <BigButton onPress={() => handleTreatment('none')}>
            <Text>{i18n.t('treatment-selection-picker-none')}</Text>
          </BigButton>
        </FieldWrapper>

        <FieldWrapper style={styles.fieldWrapper}>
          <BigButton onPress={() => handleTreatment('oxygen')}>
            <Text>{i18n.t('treatment-selection-picker-oxygen')}</Text>
          </BigButton>
          <CaptionText style={styles.indentedText}>{i18n.t('treatment-selection-picker-subtext-oxygen')}</CaptionText>
        </FieldWrapper>

        <FieldWrapper style={styles.fieldWrapper}>
          <BigButton onPress={() => handleTreatment('nonInvasiveVentilation')}>
            <Text>{i18n.t('treatment-selection-picker-non-invasive-ventilation')}</Text>
          </BigButton>
          <CaptionText style={styles.indentedText}>
            {i18n.t('treatment-selection-picker-subtext-non-invasive-ventilation')}
          </CaptionText>
        </FieldWrapper>

        <FieldWrapper style={styles.fieldWrapper}>
          <BigButton onPress={() => handleTreatment('invasiveVentilation')}>
            <Text>{i18n.t('treatment-selection-picker-invasive-ventilation')}</Text>
          </BigButton>
          <CaptionText style={styles.indentedText}>
            {i18n.t('treatment-selection-picker-subtext-invasive-ventilation')}
          </CaptionText>
        </FieldWrapper>

        <FieldWrapper style={styles.fieldWrapper}>
          <BigButton onPress={() => handleTreatment('other')}>
            <Text>{i18n.t('treatment-selection-picker-other')}</Text>
          </BigButton>
        </FieldWrapper>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 36,
  },

  fieldWrapper: {
    marginVertical: 8,
  },

  indentedText: {
    marginHorizontal: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default TreatmentSelectionScreen;
