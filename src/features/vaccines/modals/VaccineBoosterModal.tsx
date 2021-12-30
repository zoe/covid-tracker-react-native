import { BrandedButton, LightText, Modal } from '@covid/components';
import { Text } from '@covid/components/typography';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet } from 'react-native';

type TProps = {
  onRequestClose: () => void;
  visible: boolean;
};

export const VaccineBoosterModal = React.memo((props: TProps) => {
  return (
    <Modal
      enableBackdropDismiss
      modalName="VaccineListBooster"
      onRequestClose={props.onRequestClose}
      testID="vaccine-list-booster-modal"
      visible={props.visible}
    >
      <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.title} textClass="h3Regular">
        {i18n.t('vaccines.booster-modal.title')}
      </Text>
      <LightText style={styles.body}>{i18n.t('vaccines.booster-modal.description')}</LightText>
      <BrandedButton onPress={props.onRequestClose}>{i18n.t('vaccines.booster-modal.button')}</BrandedButton>
    </Modal>
  );
});

const styles = StyleSheet.create({
  body: {
    marginBottom: sizes.xl,
  },
  title: {
    marginBottom: sizes.l,
    textAlign: 'center',
  },
});
