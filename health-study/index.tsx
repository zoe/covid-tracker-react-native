import { Header3Text, RegularText } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { appActions, appSelectors } from '@covid/core/state/app/slice';
import { HealthProfileIntroModal } from '@covid/features';
import MentalHealthPlaybackModal from '@covid/features/mental-health-playback/modals/MentalHealthPlaybackModal';
import { OnboardingOverlay } from '@covid/features/onboarding/components/OnboardingOverlay';
import { sizes } from '@covid/themes';
import { Navigation } from '@health-study/navigation';
import { colors } from '@theme';
import * as Notifications from 'expo-notifications';
import * as React from 'react';
import { View } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

const toastConfig = {
  // Note: For custom messaging, can pass in props arg - https://github.com/calintamas/react-native-toast-message/blob/main/docs/custom-layouts.md
  customError: ({ text1, text2 }: ToastConfig) => (
    <View
      style={{
        backgroundColor: colors.feedbackBad,
        borderRadius: sizes.m,
        padding: sizes.m,
        width: '90%',
      }}
    >
      <Header3Text style={{ marginBottom: sizes.xxs }}>{text1}</Header3Text>
      <RegularText>{text2}</RegularText>
    </View>
  ),
};

export default function HealthStudyApp() {
  const app = useSelector(appSelectors.selectApp);
  const dispatch = useDispatch();

  React.useEffect(() => {
    Notifications.addNotificationResponseReceivedListener(() => {
      Analytics.track(events.OPEN_FROM_NOTIFICATION);
    });
  });

  return (
    <>
      <MentalHealthPlaybackModal
        onRequestClose={() => dispatch(appActions.setModalMentalHealthPlaybackVisible(false))}
        visible={app.modalMentalHealthPlaybackVisible}
      />
      <HealthProfileIntroModal
        onRequestClose={() => dispatch(appActions.setModalHealthProfileIntroVisible(false))}
        visible={app.modalHealthProfileIntroVisible}
      />
      <OnboardingOverlay />
      <Navigation />
      <Toast config={toastConfig} />
    </>
  );
}
