import { BrandedButton, HeaderText, Text } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const hitSlop = {
  bottom: 20,
  top: 20,
};
interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

export const HealthProfileWhyWeAskModal: React.FC<IProps> = (props) => {
  const onPressPrivacyPolicy = () => {
    props.onRequestClose();
    NavigatorService.navigate('PrivacyPolicyUK');
  };

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

      <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.center} textClass="pLight">
        {i18n.t('health-profile.why-we-ask-modal.description')}
        <TouchableOpacity hitSlop={hitSlop} onPress={onPressPrivacyPolicy}>
          <Text style={styles.externalLink}>{i18n.t('health-profile.why-we-ask-modal.description-cont')}</Text>
        </TouchableOpacity>
      </Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  externalLink: {
    color: colors.purple,
  },
  title: {
    marginVertical: sizes.m,
    textAlign: 'center',
  },
});
