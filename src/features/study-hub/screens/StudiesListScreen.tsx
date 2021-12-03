import { Tag, Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { TRootState } from '@covid/core/state/root';
import {
  fetchStudySummary,
  selectShouldShowFeedbackModal,
  selectShouldShowReconsentModal,
  selectStudiesList,
  studyHubSlice,
} from '@covid/core/state/study-hub/slice';
import { EInteraction, TStudyHubInteraction } from '@covid/core/state/study-hub/types';
import { StudyCard } from '@covid/features/study-hub/components/StudyCard';
import { StudyHubFeedbackModal } from '@covid/features/study-hub/modals/StudyHubFeedbackModal';
import { StudyHubReconsentModal } from '@covid/features/study-hub/modals/StudyHubReconsentModal';
import { TStudy } from '@covid/features/study-hub/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export function StudiesListScreen() {
  const dispatch = useDispatch();
  const shouldShowReconsentModal = useSelector(selectShouldShowReconsentModal);
  const shouldShowFeedbackModal = useSelector(selectShouldShowFeedbackModal);
  const [showReconsentModal, setShowReconsentModal] = React.useState(shouldShowReconsentModal);
  const [showFeedbackModal, setShowFeedbackModal] = React.useState(shouldShowFeedbackModal);
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const studyHubInteractions = useSelector<TRootState, TStudyHubInteraction[]>(
    (state) => state.studyHub.studyHubInteractions,
  );
  const studiesList = useSelector<TRootState, TStudy[]>(selectStudiesList);

  React.useEffect(() => {
    dispatch(studyHubSlice.actions.addStudyHubInteraction(EInteraction.VISIT_LIST_SCREEN));
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      if (isActive) {
        setShowReconsentModal(shouldShowReconsentModal);
        dispatch(fetchStudySummary(patientId));
      }

      return () => {
        isActive = false;
      };
    }, [dispatch, patientId, shouldShowReconsentModal]),
  );

  const title = i18n.t('study-hub.consented.title');
  const description = i18n.t('study-hub.consented.description');

  return (
    <Screen isInsideTabBar noHeader testID="study-hub-screen">
      <StudyHubReconsentModal onRequestClose={() => setShowReconsentModal(false)} visible={showReconsentModal} />
      <StudyHubFeedbackModal onRequestClose={() => setShowFeedbackModal(false)} visible={showFeedbackModal} />
      {studyHubInteractions.length > 1 ? null : (
        <Tag color={colors.accent} style={[styles.alignStart, styles.marginBottomMedium]} text={i18n.t('new')} />
      )}
      <Text
        inverted
        colorPalette="uiDark"
        colorShade="darker"
        style={styles.marginBottomMedium}
        testID="study-hub-screen-title"
        textClass="h2"
      >
        {title}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.marginBottom} textClass="pLight">
        {description}
      </Text>
      {studiesList.map((study, index) => {
        return (
          <StudyCard
            active={study.patient_is_interested}
            cardColor={study.cardColor}
            enableOnboardingOverlay={index === 0}
            key={`study-card-${study.key}`}
            onPress={() => NavigatorService.navigate('StudyDetails', { study })}
            study={study}
            style={index !== 0 && styles.marginTop}
          />
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  alignStart: {
    alignSelf: 'flex-start',
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  marginBottomMedium: {
    marginBottom: sizes.m,
  },
  marginTop: {
    marginTop: sizes.m,
  },
});
