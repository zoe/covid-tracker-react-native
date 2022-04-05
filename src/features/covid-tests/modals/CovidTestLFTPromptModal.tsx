import { BrandedButton, HeaderText, Text } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

export const CovidTestLFTPromptModal: React.FC<IProps> = (props) => {
  const footerChildren = React.useMemo(
    () => (
      <BrandedButton onPress={props.onRequestClose} style={styles.button} testID="covid-test-lft-prompt-button">
        {i18n.t('ok')}
      </BrandedButton>
    ),
    [props.onRequestClose],
  );

  return (
    <Modal
      footerChildren={footerChildren}
      modalName="CovidTestLFTPromptModal"
      onRequestClose={props.onRequestClose}
      testID="covid-test-lft-prompt-modal"
      visible={props.visible}
    >
      <HeaderText style={styles.title}>{i18n.t('covid-test.lft-prompt-modal.title')}</HeaderText>

      <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.center} textClass="pLight">
        {i18n.t('covid-test.lft-prompt-modal.description')}
      </Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.darkBlue,
  },
  center: {
    textAlign: 'center',
  },
  title: {
    marginVertical: sizes.m,
    textAlign: 'center',
  },
});
