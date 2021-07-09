import { BrandedButton, Text } from '@covid/components';
import { patientService } from '@covid/core/patient/PatientService';
import { resetFeedback, selectFeedbackData } from '@covid/core/state/reconsent';
import { RootState } from '@covid/core/state/root';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { generalApiClient } from '@covid/services';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme/colors';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, useWindowDimensions, View } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ReconsentReconsider'>;
}

const VIMEO_ID = '571660625';
const VIDEO_RATIO = 640 / 480;

const source = {
  html: `
  <html style="padding: 0; margin: 0; background-color: transparent;">
    <body style="padding: 0; margin: 0; background-color: transparent;">
      <iframe
        allow="autoplay; picture-in-picture"
        frameborder="0"
        height="100%"
        src="https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&loop=0"
        style="background-color: transparent;"
        width="100%"
      ></iframe>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </body>
  </html>
  `,
};

export default function ReconsentReconsiderScreen(props: IProps) {
  const windowDimensions = useWindowDimensions();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const feedbackData = useSelector(selectFeedbackData);
  const patientId = useSelector<RootState, string>((state) => state.user.patients[0]);

  const videoWidth = windowDimensions.width;
  const videoHeight = videoWidth / VIDEO_RATIO;

  function onPressPositive() {
    props.navigation.push('ReconsentRequestConsent', { secondTime: true });
  }

  async function onPressNegative() {
    setLoading(true);
    try {
      await generalApiClient.postUserEvent('feedback_reconsent', feedbackData);
      await patientService.updatePatientInfo(patientId, { research_consent_asked: true });
    } catch (_) {}
    setLoading(false);
    dispatch(resetFeedback());
    NavigatorService.navigate('Dashboard');
  }

  return (
    <ReconsentScreen hideBackButton noPadding>
      <View style={styles.padding}>
        <Text rhythm={24} textAlign="center" textClass="h2Light">
          {i18n.t('reconsent.reconsider.title')}
        </Text>
        <Text rhythm={24} textAlign="center" textClass="pLight">
          {i18n.t('reconsent.reconsider.description-1')}
        </Text>
        <Text textAlign="center" textClass="pLight">
          {i18n.t('reconsent.reconsider.description-2')}
        </Text>
      </View>
      <View style={styles.videoWrapper}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator color={colors.brand} size="large" />
        </View>
        {videoHeight > 0 ? (
          <WebView
            allowsInlineMediaPlayback
            automaticallyAdjustContentInsets
            allowsFullscreenVideo={false}
            containerStyle={{
              backgroundColor: 'transparent',
              flex: 0,
              height: videoHeight,
              width: videoWidth,
            }}
            scrollEnabled={false}
            source={source}
            style={{
              backgroundColor: 'transparent',
              flex: 0,
              height: videoHeight,
              width: videoWidth,
            }}
          />
        ) : null}
      </View>
      <View style={styles.padding}>
        <BrandedButton onPress={onPressPositive} style={styles.buttonPositive}>
          {i18n.t('reconsent.reconsider.button-positive')}
        </BrandedButton>
        <BrandedButton
          enabled={!loading}
          indicatorColor={colors.brand}
          loading={loading}
          onPress={onPressNegative}
          style={styles.buttonNegative}
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
    marginBottom: 12,
  },
  padding: {
    padding: 16,
  },
  videoWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});
