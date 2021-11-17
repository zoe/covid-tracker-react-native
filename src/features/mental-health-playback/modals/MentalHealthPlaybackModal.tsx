import { QuoteMarks } from '@assets';
import { BrandedButton, DoctorProfile, Modal, Tag, Text } from '@covid/components';
import Analytics from '@covid/core/Analytics';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { getMentalHealthStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import i18n from '@covid/locale/i18n';
import { generalApiClient } from '@covid/services';
import { colors, sizes, styling } from '@covid/themes';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

export default function MentalHealthPlaybackModal(props: IProps) {
  function onRequestClose(positive?: boolean) {
    if (!positive) {
      Analytics.track(Analytics.events.MENTAL_HEALTH_PLAYBACK_CLOSE_MODAL);
    }
    props.onRequestClose();
  }

  function handlePositive() {
    generalApiClient.postUserEvent('view-mental-health-insights');
    onRequestClose(true);
    appCoordinator.goToMentalHealthStudyPlayback();
  }

  function handleNegative() {
    generalApiClient.postUserEvent('skip-mental-health-insights');
    onRequestClose();
  }

  return (
    <Modal
      enableBackdropDismiss
      modalName="MentalHealthPlayback"
      onRequestClose={onRequestClose}
      testID="mental-health-playback-modal"
      visible={props.visible}
    >
      <Tag
        color={colors.coral.main.bgColor}
        style={styling.selfCenter}
        text={i18n.t('mental-health-playback.modal.tag')}
      />
      <Text
        inverted
        colorPalette="accentBlue"
        colorShade="main"
        style={styles.title}
        textAlign="center"
        textClass="h3Regular"
      >
        {i18n.t('mental-health-playback.modal.title-new-personal')}
      </Text>
      <DoctorProfile
        image={getMentalHealthStudyDoctorImage()}
        location={i18n.t('mental-health.doctor-location')}
        name={i18n.t('mental-health.doctor-name')}
        title={i18n.t('mental-health.doctor-title')}
      />
      <QuoteMarks />
      <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.description} textClass="pLight">
        {i18n.t('mental-health-playback.modal.description-new')}
      </Text>
      <BrandedButton onPress={handlePositive} style={styles.buttonPositive} testID="button-positive">
        {i18n.t('mental-health-playback.modal.button-positive-new')}
      </BrandedButton>
      <BrandedButton onPress={handleNegative} style={styles.buttonNegative} testID="button-negative">
        <Text textClass="pSmallLight">{i18n.t('mental-health-playback.modal.button-negative')}</Text>
      </BrandedButton>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonNegative: {
    backgroundColor: 'white',
  },
  buttonPositive: {
    backgroundColor: '#0165B5',
  },
  description: {
    paddingBottom: sizes.l,
    paddingHorizontal: sizes.m,
    paddingTop: sizes.xs,
  },
  title: {
    marginBottom: sizes.m,
    marginTop: sizes.m,
  },
});
