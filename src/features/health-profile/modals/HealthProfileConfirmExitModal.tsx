import { BrandedButton, ClickableText, HeaderText } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import { TextWithBoldInserts } from '@covid/components/typography';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes, styling } from '@covid/themes';
import Analytics, { events } from '@health-study/analytics';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

export const HealthProfileConfirmExitModal: React.FC<IProps> = (props) => {
  const dismiss = () => {
    props.onRequestClose();
    Analytics.track(events.HEALTH_PROFILE_CONFIRM_EXIT_MODAL_DISMISS_BUTTON_CLICKED);
  };

  const confirmSaveAndExit = () => {
    Analytics.track(events.HEALTH_PROFILE_CONFIRM_EXIT_MODAL_SAVE_EXIT_BUTTON_CLICKED);
    props.onRequestClose();
    NavigatorService.navigate('DashboardUK');
  };

  const footerChildren = React.useMemo(
    () => (
      <>
        <BrandedButton onPress={confirmSaveAndExit} testID="health-profile-confirm-exit-modal-confirm">
          {i18n.t('health-profile.confirm-save-exit-modal.button')}
        </BrandedButton>
        <TouchableOpacity
          onPress={dismiss}
          style={styling.paddingVertical}
          testID="health-profile-confirm-exit-modal-dismiss"
        >
          <ClickableText style={[styling.textCenter, styles.darkBlue]}>
            {i18n.t('health-profile.confirm-save-exit-modal.dismiss')}
          </ClickableText>
        </TouchableOpacity>
      </>
    ),
    [props.onRequestClose],
  );

  return (
    <Modal
      footerChildren={footerChildren}
      modalName="HealthProfileConfirmExit"
      onRequestClose={props.onRequestClose}
      testID="health-profile-confirm-exit-modal"
      visible={props.visible}
    >
      <HeaderText style={styles.title}>{i18n.t('health-profile.confirm-save-exit-modal.title')}</HeaderText>

      <TextWithBoldInserts inverted colorPalette="uiDark" colorShade="darker" textClass="pLight">
        {i18n.t('health-profile.confirm-save-exit-modal.description')}
      </TextWithBoldInserts>
    </Modal>
  );
};

const styles = StyleSheet.create({
  darkBlue: {
    color: colors.brand,
  },
  title: {
    marginVertical: sizes.m,
    textAlign: 'center',
  },
});
