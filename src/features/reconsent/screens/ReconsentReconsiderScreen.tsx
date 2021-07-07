import { BrandedButton, Text } from '@covid/components';
import { resetFeedback, selectFeedbackData } from '@covid/core/state/reconsent';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { generalApiClient } from '@covid/services';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ReconsentReconsider'>;
}

export default function ReconsentReconsiderScreen(props: IProps) {
  const [config, setConfig] = React.useState<any>(undefined);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const feedbackData = useSelector(selectFeedbackData);

  React.useEffect(() => {
    const VIMEO_ID = '571660625';
    fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
      .then((res) => res.json())
      .then((res) => setConfig(res));
  }, []);

  function onPressPositive() {
    props.navigation.push('ReconsentRequestConsent', { secondTime: true });
  }

  async function onPressNegative() {
    setLoading(true);
    try {
      await generalApiClient.postUserEvent('feedback_reconsent', feedbackData);
    } catch (_) {}
    setLoading(false);
    dispatch(resetFeedback());
    NavigatorService.navigate('Dashboard');
  }

  const videoUrl = config?.request?.files?.hls?.cdns[config?.request?.files?.hls?.default_cdn]?.url;

  return (
    <ReconsentScreen hideBackButton>
      <Text rhythm={24} textAlign="center" textClass="h2Light">
        {i18n.t('reconsent.reconsider.title')}
      </Text>
      <Text rhythm={24} textAlign="center" textClass="pLight">
        {i18n.t('reconsent.reconsider.description-1')}
      </Text>
      <Text textAlign="center" textClass="pLight">
        {i18n.t('reconsent.reconsider.description-2')}
      </Text>
      {videoUrl ? (
        <Video
          onError={(error) => console.log('error', error)}
          source={{ uri: videoUrl }}
          style={{
            bottom: 0,
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        />
      ) : null}
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
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 'auto',
  },
});
