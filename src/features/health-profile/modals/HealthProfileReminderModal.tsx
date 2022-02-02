import { closeIcon } from '@assets';
import { BrandedButton, HeaderText, Tag, Text } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import Analytics, { events } from '@covid/core/Analytics';
import { TStateHealthProfile } from '@covid/core/state/health-profile/slice';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

const hitSlop = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

export const HealthProfileReminderModal: React.FC<IProps> = (props) => {
  const healthProfileState = useSelector<TRootState, TStateHealthProfile>((state) => state.healthProfile);

  const continueOnPress = () => {
    Analytics.track(events.HEALTH_PROFILE_REMINDER_MODAL_CONTINUE);
    if (healthProfileState.screenToReturnTo === 'HPAboutYou') {
      NavigatorService.navigate('HPAboutYou');
    } else {
      NavigatorService.navigate('HPFormScreen', { screenName: healthProfileState.screenToReturnTo });
    }
    props.onRequestClose();
  };

  const onCloseRequest = () => {
    Analytics.track(events.HEALTH_PROFILE_REMINDER_MODAL_DISMISS);
    props.onRequestClose();
  };

  const footerChildren = React.useMemo(
    () => <BrandedButton onPress={continueOnPress}>{i18n.t('continue')}</BrandedButton>,
    [props.onRequestClose],
  );

  return (
    <Modal
      footerChildren={footerChildren}
      modalName="HealthProfileReminder"
      onRequestClose={onCloseRequest}
      testID="health-profile-reminder-modal"
      visible={props.visible}
    >
      <TouchableOpacity hitSlop={hitSlop} onPress={onCloseRequest} style={styles.alignEnd} testID="button-close-modal">
        <Image source={closeIcon} style={styles.closeCross} />
      </TouchableOpacity>
      <Tag color={colors.accent} style={styles.tag} text={i18n.t('health-profile.reminder-modal.tag')} />
      <HeaderText style={styles.title}>{i18n.t('health-profile.reminder-modal.title')}</HeaderText>

      <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.center} textClass="pLight">
        {i18n.t('health-profile.reminder-modal.description')}
      </Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  alignEnd: {
    alignSelf: 'flex-end',
  },
  center: {
    textAlign: 'center',
  },
  closeCross: {
    height: 14,
    tintColor: colors.primary,
    width: 14,
  },
  tag: {
    alignSelf: 'center',
  },
  title: {
    marginVertical: sizes.m,
    textAlign: 'center',
  },
});
