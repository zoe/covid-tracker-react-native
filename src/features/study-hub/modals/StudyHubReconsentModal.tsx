import { BrandedButton, ClickableText, Text } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import Analytics, { events } from '@covid/core/Analytics';
import { useStartReconsent } from '@covid/features/wider-health-studies/hooks/useStartReconsent';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes, styling } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

type TProps = {
  onRequestClose: () => void;
  visible: boolean;
};

const sourceImage = require('../assets/reconsent_modal_illustration.png');

export function StudyHubReconsentModal(props: TProps) {
  const closeModalAndReturnHome = () => {
    props.onRequestClose();
    NavigatorService.navigate('Dashboard', { screen: 'DashboardUK' });
  };

  const startReconsent = useStartReconsent();
  const closeModalAndStartReconsent = () => {
    props.onRequestClose();
    Analytics.track(events.STUDY_HUB_RECONSENT_CLICKED);
    startReconsent('Studies');
  };

  return (
    <Modal
      modalName="StudyHubReconsent"
      onRequestClose={props.onRequestClose}
      testID="study-hub-reconsent-modal"
      visible={props.visible}
    >
      <Image source={sourceImage} style={styles.image} />
      <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3Regular">
        {i18n.t('study-hub.reconsent-modal.title')}
      </Text>
      <Text
        inverted
        colorPalette="uiDark"
        colorShade="dark"
        style={styles.marginVertical}
        textAlign="center"
        textClass="pLight"
      >
        {i18n.t('study-hub.reconsent-modal.description')}
      </Text>
      <BrandedButton
        onPress={closeModalAndStartReconsent}
        style={styles.button}
        testID="study-hub-reconsent-modal-opt-in-button"
      >
        {i18n.t('study-hub.reconsent-modal.button')}
      </BrandedButton>
      <TouchableOpacity
        onPress={closeModalAndReturnHome}
        style={styling.paddingVertical}
        testID="study-hub-reconsent-modal-return"
      >
        <ClickableText style={[styling.textCenter, styles.darkBlue]}>
          {i18n.t('study-hub.reconsent-modal.return')}
        </ClickableText>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.darkBlue,
  },
  darkBlue: {
    color: colors.darkBlue,
  },
  image: {
    height: 139,
    marginBottom: sizes.xs,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 134,
  },
  marginVertical: {
    marginBottom: sizes.l,
    marginTop: sizes.xs,
  },
});
