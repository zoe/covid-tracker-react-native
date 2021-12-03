import { BrandedButton, Text } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { patientService } from '@covid/core/patient/PatientService';
import { fetchStartupInfo } from '@covid/core/state/contentSlice';
import { resetFeedback, selectFeedbackData, selectReturnScreenName } from '@covid/core/state/reconsent';
import { TRootState } from '@covid/core/state/root';
import VimeoVideo from '@covid/features/reconsent//components/VimeoVideo';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { generalApiClient } from '@covid/services';
import { sizes } from '@covid/themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  navigation: StackNavigationProp<TScreenParamList, 'ReconsentReconsider'>;
}

const VIMEO_ID = '571660625';
const VIDEO_RATIO = 640 / 480;

export default function ReconsentReconsiderScreen(props: IProps) {
  const windowDimensions = useWindowDimensions();
  const [hideVideo, setHideVideo] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const feedbackData = useSelector(selectFeedbackData);
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const returnScreenName = useSelector(selectReturnScreenName);

  const videoWidth = Math.min(sizes.maxScreenWidth, windowDimensions.width);
  const videoHeight = videoWidth / VIDEO_RATIO;

  function onPressPositive() {
    Analytics.track(events.RECONSENT_RECONSIDER_CLICKED);
    props.navigation.navigate('ReconsentRequestConsent');
    setHideVideo(true);
  }

  async function onPressNegative() {
    setLoading(true);
    Analytics.track(events.RECONSENT_CONFIRMED_NO_CLICKED);

    try {
      await generalApiClient.postUserEvent('feedback_reconsent', feedbackData);
      await patientService.updatePatientInfo(patientId, { research_consent_asked: true });
      // Update the startup info (as research consent has changed and app needs to be aware)
      // This requires async await to make sure!
      await dispatch(fetchStartupInfo());
    } catch (_) {}
    dispatch(resetFeedback());
    setLoading(false);
    setHideVideo(true);
    NavigatorService.navigate('Dashboard');
    if (returnScreenName === 'Menu') {
      NavigatorService.openDrawer();
    }
  }

  return (
    <ReconsentScreen noHeader noPadding testID="reconsent-reconsider-screen">
      <View style={styles.padding}>
        <Text rhythm={24} style={styles.marginTop} textAlign="center" textClass="h2Light">
          {i18n.t('reconsent.reconsider.title')}
        </Text>
        <Text rhythm={24} textAlign="center" textClass="h4Light">
          {i18n.t('reconsent.reconsider.description-1')}
        </Text>
        <Text textAlign="center" textClass="h4Light">
          {i18n.t('reconsent.reconsider.description-2')}
        </Text>
      </View>
      <View style={styles.videoWrapper}>
        {!hideVideo && videoHeight > 0 ? (
          <VimeoVideo autoplay showLoading height={videoHeight} vimeoId={VIMEO_ID} width={videoWidth} />
        ) : null}
      </View>
      <View style={styles.padding}>
        <BrandedButton onPress={onPressPositive} style={styles.buttonPositive} testID="button-positive">
          {i18n.t('reconsent.reconsider.button-positive')}
        </BrandedButton>
        <BrandedButton
          enabled={!loading}
          indicatorColor={colors.brand}
          loading={loading}
          onPress={onPressNegative}
          style={styles.buttonNegative}
          testID="button-negative"
          textStyle={styles.buttonNegativeText}
        >
          {i18n.t('reconsent.reconsider.button-negative')}
        </BrandedButton>
      </View>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    alignItems: 'center',
    aspectRatio: VIDEO_RATIO,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  buttonNegative: {
    backgroundColor: colors.white,
    borderColor: colors.brand,
    borderWidth: 1,
  },
  buttonNegativeText: {
    color: colors.brand,
  },
  buttonPositive: {
    backgroundColor: colors.brand,
    marginBottom: sizes.s,
  },
  marginTop: {
    marginTop: sizes.m,
  },
  padding: {
    padding: sizes.m,
  },
  videoWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});
