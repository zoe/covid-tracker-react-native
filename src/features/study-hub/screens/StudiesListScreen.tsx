import { Tag, Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
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
import { useToggleRebrand } from '@health-study/redux/app/selectors';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { covidStyles, healthStudyStyles } from './StudiesListScreenStyle';

export function StudiesListScreen() {
  const dispatch = useDispatch();
  const toggleReBrand = useSelector(useToggleRebrand);
  const startupInfo = useSelector(selectStartupInfo);
  const shouldShowReconsentModal = useSelector(selectShouldShowReconsentModal);
  const shouldShowFeedbackModal = useSelector(selectShouldShowFeedbackModal);
  const [showReconsentModal, setShowReconsentModal] = React.useState(shouldShowReconsentModal);
  const [showFeedbackModal, setShowFeedbackModal] = React.useState(shouldShowFeedbackModal);
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const username = useSelector<TRootState, string>((state) => state.user.username);
  const studyHubInteractions = useSelector<TRootState, TStudyHubInteraction[]>(
    (state) => state.studyHub.studyHubInteractions,
  );
  const studiesList = useSelector<TRootState, TStudy[]>(selectStudiesList);
  const scrollRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    if (startupInfo?.show_study_hub_onboarding) {
      NavigatorService.navigate('StudyHubOnboarding');
    }
  }, [startupInfo?.show_study_hub_onboarding]);

  React.useEffect(() => {
    dispatch(studyHubSlice.actions.addStudyHubInteraction({ interaction: EInteraction.VISIT_LIST_SCREEN, username }));
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      // Product requested we scroll to top of Studies list on screen focus
      scrollRef.current?.scrollTo({
        animated: true,
        y: 0,
      });

      if (isActive) {
        setShowReconsentModal(shouldShowReconsentModal);
        dispatch(fetchStudySummary(patientId));
      }

      return () => {
        isActive = false;
      };
    }, [dispatch, patientId, scrollRef, shouldShowReconsentModal]),
  );

  const title = i18n.t('study-hub.consented.title');
  const description = i18n.t('study-hub.consented.description');

  const styles = toggleReBrand ? healthStudyStyles : covidStyles;
  return (
    <Screen isInsideTabBar noHeader scrollRef={scrollRef} testID="studies-list-screen">
      <StudyHubReconsentModal onRequestClose={() => setShowReconsentModal(false)} visible={showReconsentModal} />
      <StudyHubFeedbackModal onRequestClose={() => setShowFeedbackModal(false)} visible={showFeedbackModal} />
      {studyHubInteractions.length > 1 ? null : (
        <Tag color={styles.tag.color} style={[styles.alignStart, styles.marginBottomMedium]} text={i18n.t('new')} />
      )}
      <Text
        inverted
        colorPalette="uiDark"
        colorShade="darker"
        style={styles.marginBottomMedium}
        testID="studies-list-screen-title"
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
