import { dietStudyPlaybackGlobal1, dietStudyPlaybackGlobal2, dietStudyPlaybackGlobal3 } from '@assets';
import { Spacer, Text } from '@covid/components';
import { ScalableImage } from '@covid/components/ScalableImage';
import { Screen } from '@covid/components/Screen';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet } from 'react-native';

export default function DietStudyGlobalScreen() {
  return (
    <Screen testID="diet-study-global-screen">
      <Text rhythm={24} textClass="h2">
        {i18n.t('diet-study.global-title')}
      </Text>
      <Text rhythm={16} textClass="pMedium">
        {i18n.t('diet-study.global-section-0-title')}
      </Text>
      <ScalableImage fullWidth source={{ uri: dietStudyPlaybackGlobal1 }} style={styles.image} />
      <Spacer space={24} />
      <Text rhythm={16} textClass="pMedium">
        {i18n.t('diet-study.global-section-1-title')}
      </Text>
      <ScalableImage fullWidth source={{ uri: dietStudyPlaybackGlobal2 }} style={styles.image} />
      <Spacer space={24} />
      <Text rhythm={16} textClass="pMedium">
        {i18n.t('diet-study.global-section-2-title')}
      </Text>
      <ScalableImage fullWidth source={{ uri: dietStudyPlaybackGlobal3 }} style={styles.image} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: sizes.m,
  },
});
