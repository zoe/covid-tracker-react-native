import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { QuoteMarks } from '@assets';
import i18n from '@covid/locale/i18n';
import { BrandedButton, DoctorProfile, Modal, Tag, Text } from '@covid/components';
import { colors, styling } from '@covid/themes';
import { events, track } from '@covid/core/Analytics';
import { getMentalHealthStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import appCoordinator from '@covid/features/AppCoordinator';

export default function MentalHealthPlaybackModal() {
  const [tracked, setTracked] = useState(false);
  const { goBack } = useNavigation();

  useEffect(() => {
    if (!tracked) {
      track(events.MENTAL_HEALTH_PLAYBACK_SCREEN_MODAL);
      setTracked(true);
    }
  });

  return (
    <Modal>
      <Tag
        color={colors.coral.main.bgColor}
        style={styling.selfCenter}
        text={i18n.t('mental-health-playback.modal.tag').toUpperCase()}
      />
      <Text
        inverted
        colorPalette="accentBlue"
        colorShade="main"
        style={styles.title}
        textClass="h3Regular"
        textAlign="center">
        {i18n.t('mental-health-playback.modal.title')}
      </Text>
      <DoctorProfile
        image={getMentalHealthStudyDoctorImage()}
        location={i18n.t('mental-health.doctor-location')}
        name={i18n.t('mental-health.doctor-name')}
        title={i18n.t('mental-health.doctor-title')}
      />
      <QuoteMarks />
      <Text colorPalette="uiDark" colorShade="dark" inverted textClass="pLight" style={styles.description}>
        {i18n.t('mental-health-playback.modal.description')}
      </Text>
      <BrandedButton onPress={() => appCoordinator.goToMentalHealthStudyPlayback()} style={styles.buttonPositive}>
        {i18n.t('mental-health-playback.modal.button-positive')}
      </BrandedButton>
      <BrandedButton onPress={() => goBack()} style={styles.buttonNegative}>
        <Text textClass="pSmallLight">{i18n.t('mental-health-playback.modal.button-negative')}</Text>
      </BrandedButton>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonPositive: {
    backgroundColor: '#0165B5',
  },
  buttonNegative: {
    backgroundColor: 'white',
  },
  description: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    marginTop: 16,
    marginBottom: 16,
  },
});
