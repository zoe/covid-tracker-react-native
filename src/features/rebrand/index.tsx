import { healthStudyRebrand } from '@assets';
import { HeaderText, Text } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import i18n from '@covid/locale/i18n';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Spacer from '@tracer/components/atoms/Spacer';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

const ReBrandModal: React.FC<IProps> = (props) => {
  const footerChildren = React.useMemo(
    () => (
      <View>
        <Button buttonType="primary" onPress={props.onRequestClose} testID="rebrand-modal-button">
          {i18n.t('re-brand.modal-cta')}
        </Button>
        <Spacer style={{ marginBottom: grid.g8, marginTop: grid.g16 }}>
          <Text
            inverted
            colorPalette="uiDark"
            colorShade="dark"
            fontSize={12}
            fontStyle="italic"
            style={styles.footerText}
            textClass="pBold"
          >
            Look out for more changes over the coming weeks!
          </Text>
        </Spacer>
      </View>
    ),
    [props.onRequestClose],
  );

  return (
    <Modal
      footerChildren={footerChildren}
      modalName="ReBrandModal"
      onRequestClose={props.onRequestClose}
      testID="re-brand-modal"
      visible={props.visible}
    >
      <View style={styles.modalImageBox}>
        <Image source={healthStudyRebrand} style={styles.modalImage} />
      </View>
      <View style={styles.modalTitle}>
        <HeaderText style={styles.title}>{i18n.t('re-brand.modal-title')}</HeaderText>
      </View>
      <View style={styles.modalContent}>
        <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.contentText} textClass="pLight">
          {i18n.t('re-brand.modal-content')}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentText: {
    textAlign: 'center',
  },
  footerText: {
    color: colors.text.primary,
    textAlign: 'center',
  },
  modalContent: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  modalImage: {
    alignItems: 'center',
    height: 80,
    marginTop: 40,
    width: 176,
  },
  modalImageBox: {
    alignItems: 'center',
    flex: 1,
    paddingLeft: grid.g16,
    paddingRight: grid.g16,
  },
  modalTitle: {
    marginTop: grid.g8,
  },
  title: {
    marginVertical: grid.g16,
    textAlign: 'center',
  },
});

export default ReBrandModal;
