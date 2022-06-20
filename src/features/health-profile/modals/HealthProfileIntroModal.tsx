import { closeIcon } from '@assets';
import { Text } from '@covid/components';
import { BrandedButtonAnalytics } from '@covid/components/analytics/BrandedButtonAnalytics';
import { Modal } from '@covid/components/Modal';
import { updateShowModal } from '@covid/core/state';
import HealthProfileIntroModalBgImage from '@covid/features/health-profile/components/HealthProfileIntroModalBgImage';
import HealthProfileLogo from '@covid/features/health-profile/components/HealthProfileLogo';
import ImageTimSpector from '@covid/features/health-profile/components/ImageTimSpector';
import { IconTime } from '@covid/features/study-hub/components/IconTime';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { generalApiClient } from '@covid/services';
import { sizes } from '@covid/themes';
import Analytics, { events } from '@health-study/analytics';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

type TProps = {
  onRequestClose: () => void;
  visible: boolean;
};

const hitSlop = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

export default function HealthProfileIntroModal(props: TProps) {
  const dispatch = useDispatch();

  const closeModal = () => {
    Analytics.track(events.HEALTH_PROFILE_INTRO_MODAL_REMIND_LATER_CLICKED);
    dispatch(updateShowModal(null));
    generalApiClient.postUserEvent('remind-later-health-profile-intro');
    props.onRequestClose();
  };

  const closeModalAndUpdateHealthProfile = () => {
    Analytics.track(events.HEALTH_PROFILE_INTRO_MODAL_UPDATE_NOW_CLICKED);
    props.onRequestClose();
    NavigatorService.navigate('HPAboutYou');
  };

  return (
    <Modal
      backgroundImage={<HealthProfileIntroModalBgImage />}
      modalName="HealthProfileIntro"
      onRequestClose={closeModal}
      testID="health-profile-intro-modal"
      visible={props.visible}
    >
      <TouchableOpacity hitSlop={hitSlop} onPress={closeModal} style={styles.alignEnd} testID="button-close-modal">
        <Image source={closeIcon} style={styles.closeCross} />
      </TouchableOpacity>
      <HealthProfileLogo style={styles.logo} />
      <ImageTimSpector />
      <Text inverted style={[styles.black, styles.marginTop]} textAlign="center" textClass="h3Light">
        {i18n.t('health-profile.intro-modal.title')}
      </Text>
      <Text
        inverted
        colorPalette="uiDark"
        colorShade="darker"
        style={styles.marginVertical}
        textAlign="center"
        textClass="h5Light"
      >
        {i18n.t('health-profile.intro-modal.description')}
      </Text>
      <View style={styles.rowWrapper}>
        <IconTime color={colors.primary} />
        <Text style={styles.time} textClass="labelMedium">
          {i18n.t('health-profile.intro-modal.time')}
        </Text>
      </View>
      <BrandedButtonAnalytics
        eventName={events.HEALTH_PROFILE_INTRO_MODAL_UPDATE_NOW_CLICKED}
        onPress={closeModalAndUpdateHealthProfile}
        style={[styles.button]}
        testID="health-profile-intro-modal-update-now-button"
      >
        {i18n.t('health-profile.intro-modal.button')}
      </BrandedButtonAnalytics>
    </Modal>
  );
}

const styles = StyleSheet.create({
  alignEnd: {
    alignSelf: 'flex-end',
  },
  black: {
    color: colors.black,
  },
  button: {
    backgroundColor: colors.purple,
    marginBottom: sizes.l,
    marginHorizontal: sizes.s,
  },
  closeCross: {
    height: 14,
    tintColor: colors.tertiary,
    width: 14,
  },
  darkBlue: {
    color: colors.purple,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: sizes.l,
  },
  marginTop: {
    marginTop: sizes.l,
  },
  marginVertical: {
    marginBottom: sizes.xl,
    marginTop: sizes.m,
  },
  rowWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: sizes.m,
  },
  time: {
    marginLeft: sizes.xs,
    textTransform: 'uppercase',
  },
});
