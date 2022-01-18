import { BrandedButton } from '@covid/components/buttons';
import { Dots } from '@covid/components/Dots';
import { Screen } from '@covid/components/Screen';
import { patientService } from '@covid/core/patient/PatientService';
import { updateShowStudyHubOnboarding } from '@covid/core/state';
import { TRootState } from '@covid/core/state/root';
import { OnboardingSlideFour } from '@covid/features/study-hub/onboarding/OnboardingSlideFour';
import { OnboardingSlideOne } from '@covid/features/study-hub/onboarding/OnboardingSlideOne';
import { OnboardingSlideThree } from '@covid/features/study-hub/onboarding/OnboardingSlideThree';
import { OnboardingSlideTwo } from '@covid/features/study-hub/onboarding/OnboardingSlideTwo';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import GestureRecognizer from 'rn-swipe-gestures';

const AMOUNT_DOTS = 4;

const gestureConfig = {
  detectSwipeDown: false,
  detectSwipeLeft: true,
  detectSwipeRight: true,
  detectSwipeUp: false,
};

export function StudyHubOnboardingScreen() {
  const [activeDot, setActiveDot] = React.useState(1);
  const dispatch = useDispatch();
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);

  const finishOnboarding = React.useCallback(async () => {
    NavigatorService.goBack();

    dispatch(updateShowStudyHubOnboarding(false));

    await patientService.updatePatientInfo(patientId, {
      has_seen_study_hub_onboarding: true,
    });
  }, [dispatch, patientId]);

  const onSwipeLeft = React.useCallback(() => {
    if (activeDot < AMOUNT_DOTS) {
      setActiveDot(activeDot + 1);
    } else {
      finishOnboarding();
    }
  }, [activeDot]);

  const onSwipeRight = React.useCallback(() => {
    if (activeDot > 0) {
      setActiveDot(activeDot - 1);
    }
  }, [activeDot]);

  const renderHeader = React.useCallback(() => {
    return (
      <View style={styles.headerWrapper}>
        <Dots activeDot={activeDot} amount={AMOUNT_DOTS} />
      </View>
    );
  }, [activeDot]);

  const renderFooter = React.useCallback(() => {
    return (
      <View style={styles.footerWrapper}>
        <BrandedButton
          onPress={onSwipeLeft}
          style={{
            backgroundColor: activeDot < AMOUNT_DOTS ? colors.purple : colors.darkBlue,
          }}
        >
          {activeDot < AMOUNT_DOTS ? i18n.t('study-hub.onboarding.button') : i18n.t('study-hub.onboarding.button-last')}
        </BrandedButton>
      </View>
    );
  }, [activeDot, onSwipeLeft, finishOnboarding]);

  return (
    <GestureRecognizer config={gestureConfig} onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} style={styles.flex}>
      <Screen
        backgroundColor={colors.backgroundPrimary}
        renderFooter={renderFooter}
        renderHeader={renderHeader}
        testID="study-hub-onboarding-screen"
      >
        {activeDot === 1 ? <OnboardingSlideOne /> : null}
        {activeDot === 2 ? <OnboardingSlideTwo /> : null}
        {activeDot === 3 ? <OnboardingSlideThree /> : null}
        {activeDot === 4 ? <OnboardingSlideFour /> : null}
      </Screen>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  footerWrapper: {
    paddingBottom: sizes.screenVerticalPadding,
    paddingHorizontal: sizes.screenHorizontalPadding,
  },
  headerWrapper: {
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingVertical: sizes.screenVerticalPadding,
  },
});
