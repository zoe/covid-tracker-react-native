import { BrandedButton, HeaderText, Text } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

export const HealthProfileWhyWeAskModal: React.FC<IProps> = (props) => {
  const footerChildren = React.useMemo(
    () => (
      <BrandedButton onPress={props.onRequestClose} testID="health-profile-why-we-ask-modal-button">
        {i18n.t('ok')}
      </BrandedButton>
    ),
    [props.onRequestClose],
  );

  return (
    <Modal
      footerChildren={footerChildren}
      modalName="HealthProfileWhyWeAsk"
      onRequestClose={props.onRequestClose}
      testID="health-profile-why-we-ask-modal"
      visible={props.visible}
    >
      <HeaderText style={styles.title}>{i18n.t('health-profile.why-we-ask-modal.title')}</HeaderText>

      <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.center} textClass="pLight">
        {i18n.t('health-profile.why-we-ask-modal.description')}
      </Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  title: {
    marginVertical: sizes.m,
    textAlign: 'center',
  },
});
