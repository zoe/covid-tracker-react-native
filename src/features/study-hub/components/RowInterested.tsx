import { Text } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { patientService } from '@covid/core/patient/PatientService';
import { updateShowStudyHubInterestFirstTimeModal } from '@covid/core/state';
import { onboardingActions } from '@covid/core/state/onboarding/slice';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { selectShouldShowReconsentModal, studyHubSlice } from '@covid/core/state/study-hub/slice';
import { EInteraction } from '@covid/core/state/study-hub/types';
import { studyInterestService } from '@covid/core/study-interest/StudyInterestService';
import { useHideStudyHubInterestOverlay } from '@covid/features/onboarding/hooks/useHideStudyHubInterestOverlay';
import { IconPeople } from '@covid/features/study-hub/components/IconPeople';
import { TouchableIconHeart } from '@covid/features/study-hub/components/TouchableIconHeart';
import { InterestShownModal } from '@covid/features/study-hub/modals/InterestShownModal';
import { TStudy } from '@covid/features/study-hub/types';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import lodash from 'lodash';
import * as React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { batch, useDispatch, useSelector } from 'react-redux';

type TProps = {
  enableOnboardingOverlay?: boolean;
  study: TStudy;
  style?: StyleProp<ViewStyle>;
};

const DEBOUNCE_TIME_MS = 500;
const debouncedFunction = lodash.debounce((func) => func(), DEBOUNCE_TIME_MS);

const MIN_PARTICIPANTS_TO_SHOW = 1000;

export function RowInterested(props: TProps) {
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();
  const heartRef = React.useRef<TouchableOpacity>(null);
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const startupInfo = useSelector(selectStartupInfo);
  const shouldShowReconsentModal = useSelector(selectShouldShowReconsentModal);
  const hideStudyHubInterestOverlay = useHideStudyHubInterestOverlay();

  const showOnboardingOverlay: boolean = !!(
    startupInfo?.show_study_hub_interest_onboarding &&
    props.enableOnboardingOverlay &&
    !shouldShowReconsentModal
  );

  const onPressHeart = React.useCallback(async () => {
    setLoading(true);

    if (showOnboardingOverlay) {
      await hideStudyHubInterestOverlay();
    }

    if (!props.study.patient_is_interested && startupInfo?.show_study_hub_interest_first_time_modal) {
      setShowModal(true);
      try {
        // Update the Redux state immediately because the api calls could take a long time to finish.
        dispatch(updateShowStudyHubInterestFirstTimeModal(false));

        await patientService.updatePatientInfo(patientId, {
          has_seen_study_hub_interest_first_time_modal: true,
        });
      } catch (_) {}
    }

    try {
      if (props.study.patient_is_interested) {
        await studyInterestService.cancelInterest(patientId, props.study.key);
        dispatch(
          studyHubSlice.actions.updateStudyInterest({
            patientIsInterested: false,
            studyKey: props.study.key,
          }),
        );
        Analytics.track(events.STUDY_HUB_INTEREST_OFF);
      } else {
        await studyInterestService.registerInterest(patientId, props.study.key);
        batch(() => {
          dispatch(studyHubSlice.actions.addStudyHubInteraction(EInteraction.SHOW_INTEREST));
          dispatch(
            studyHubSlice.actions.updateStudyInterest({
              patientIsInterested: true,
              studyKey: props.study.key,
            }),
          );
        });
        Analytics.track(events.STUDY_HUB_INTEREST_ON);
      }
    } catch (_) {}

    setLoading(false);
  }, [
    dispatch,
    patientId,
    props.study.key,
    props.study.patient_is_interested,
    showOnboardingOverlay,
    startupInfo?.show_study_hub_interest_first_time_modal,
  ]);

  const onRequestClose = React.useCallback(() => setShowModal(false), [setShowModal]);

  const renderIcon = React.useCallback(
    (isOriginal?: boolean) => {
      return loading ? (
        <TouchableWithoutFeedback>
          <ActivityIndicator color={colors.purple} size={24} />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableIconHeart
          full={props.study.patient_is_interested}
          onPress={() => debouncedFunction(onPressHeart)}
          ref={isOriginal ? heartRef : undefined}
          testID={`row-interested-${props.study.key}-icon-heart`}
        />
      );
    },
    [loading, props.study.patient_is_interested, props.study.key, onPressHeart],
  );

  React.useEffect(() => {
    if (showOnboardingOverlay && heartRef.current) {
      heartRef.current?.measure((_width, _height, _px, _py, fx, fy) => {
        dispatch(
          onboardingActions.showStudyHubInterestOverlay({
            iconXValue: fx,
            iconYValue: fy,
            renderIcon,
          }),
        );
      });
    }
  }, [showOnboardingOverlay, heartRef.current, renderIcon]);

  return (
    <View style={[styles.view, props.style]}>
      <InterestShownModal onRequestClose={onRequestClose} visible={showModal} />
      {props.study.interest_count && props.study.interest_count > MIN_PARTICIPANTS_TO_SHOW ? (
        <>
          <IconPeople style={styles.marginRight} />
          {props.study.patient_is_interested ? (
            <>
              <Text
                inverted
                colorPalette="actionSecondary"
                colorShade="main"
                testID={`row-interested-${props.study.key}-you-text`}
                textClass="pMedium"
              >
                {i18n.t('you')}
              </Text>
              <Text
                inverted
                colorPalette="uiDark"
                colorShade="darker"
                style={styles.marginHorizontal}
                textClass="pMedium"
              >
                +
              </Text>
            </>
          ) : null}
          <Text inverted colorPalette="uiDark" colorShade="darker" textClass="pMedium">
            {props.study.interest_count.toLocaleString()}
          </Text>
          <View style={styles.lineVertical} />
        </>
      ) : null}

      {renderIcon(true)}
    </View>
  );
}

const styles = StyleSheet.create({
  lineVertical: {
    backgroundColor: colors.hrColor,
    height: 24,
    marginHorizontal: sizes.m,
    width: 1,
  },
  marginHorizontal: {
    marginHorizontal: sizes.xxs,
  },
  marginRight: {
    marginRight: sizes.xs,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: sizes.xs,
  },
});
