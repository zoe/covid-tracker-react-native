import { BrandedButton, HeaderText, Tag } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import { TextWithBoldInserts } from '@covid/components/typography';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

export const CovidTestTrackingOmicronModal: React.FC<IProps> = (props) => {
  const footerChildren = React.useMemo(
    () => <BrandedButton onPress={props.onRequestClose}>{i18n.t('ok')}</BrandedButton>,
    [props.onRequestClose],
  );

  return (
    <Modal
      showsVerticalScrollIndicator
      footerChildren={footerChildren}
      modalName="CovidTestTrackingOmicron"
      onRequestClose={props.onRequestClose}
      testID="covid-test-tracking-omicron-modal"
      visible={props.visible}
    >
      <Tag color={colors.accent} style={styles.tag} text={i18n.t('covid-test.tracking-omicron-modal.tag')} />
      <HeaderText style={styles.title}>{i18n.t('covid-test.tracking-omicron-modal.title')}</HeaderText>

      <TextWithBoldInserts inverted colorPalette="uiDark" colorShade="dark" textClass="p">
        {i18n.t('covid-test.tracking-omicron-modal.description')}
      </TextWithBoldInserts>
    </Modal>
  );
};

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'center',
  },
  title: {
    marginVertical: sizes.m,
    textAlign: 'center',
  },
});
