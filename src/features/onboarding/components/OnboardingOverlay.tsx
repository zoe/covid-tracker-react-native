import { Text } from '@covid/components';
import { TStateOnboarding } from '@covid/core/state/onboarding/types';
import { TRootState } from '@covid/core/state/root';
import { IconClose } from '@covid/features/onboarding/components/IconClose';
import { useHideStudyHubInterestOverlay } from '@covid/features/onboarding/hooks/useHideStudyHubInterestOverlay';
import i18n from '@covid/locale/i18n';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSelector } from 'react-redux';

export const OnboardingOverlay = React.memo(() => {
  const onboardingState = useSelector<TRootState, TStateOnboarding>((state) => state.onboarding);
  const windowDimensions = useWindowDimensions();
  const hideStudyHubInterestOverlay = useHideStudyHubInterestOverlay();

  const iconSize = 24;
  const circleSize = (windowDimensions.width * 8) / 9;
  const translateY = circleSize / 8;

  const iconXValue = onboardingState.studyHubInterestOverlay.iconXValue || 0;
  const iconYValue = onboardingState.studyHubInterestOverlay.iconYValue || 0;

  if (!onboardingState.studyHubInterestOverlay.show || iconYValue <= 0 || iconXValue <= 0) {
    return null;
  }

  const left = iconXValue;
  const top = iconYValue;

  return (
    <>
      <TouchableOpacity activeOpacity={0.5} onPress={hideStudyHubInterestOverlay} style={styles.overlay} />
      <View
        style={{
          backgroundColor: 'black',
          borderRadius: circleSize / 2,
          height: circleSize,
          left: left - circleSize / 2,
          opacity: 0.8,
          position: 'absolute',
          top: top - circleSize / 2 - translateY,
          width: circleSize,
          zIndex: 1000,
        }}
      >
        <TouchableOpacity onPress={hideStudyHubInterestOverlay} style={styles.iconWrapper}>
          <IconClose />
        </TouchableOpacity>
        <Text
          inverted
          colorPalette="ui"
          colorShade="lighter"
          style={{
            marginLeft: 48,
            marginTop: circleSize / 4,
            width: circleSize / 2,
          }}
          textClass="pSmall"
        >
          {i18n.t('study-hub.onboarding-overlay.description')}
        </Text>
      </View>

      {onboardingState.studyHubInterestOverlay.renderIcon ? (
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: iconSize,
            height: iconSize * 2,
            justifyContent: 'center',
            left: left - iconSize / 2,
            position: 'absolute',
            top: top - iconSize / 2,
            width: iconSize * 2,
            zIndex: 1001,
          }}
        >
          {onboardingState.studyHubInterestOverlay.renderIcon()}
        </View>
      ) : null}
    </>
  );
});

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 32 / 2,
    height: 32,
    justifyContent: 'center',
    left: 0,
    opacity: 1,
    position: 'absolute',
    top: 0,
    width: 32,
  },
  overlay: {
    backgroundColor: 'black',
    bottom: 0,
    left: 0,
    opacity: 0.5,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
});
