import { BrandedButton, Tag } from '@covid/components';
import { ENegativePositiveFieldOptions } from '@covid/components/inputsRedesigned/NegativePositiveField';
import { Modal } from '@covid/components/Modal';
import { TextWithBoldInserts } from '@covid/components/typography';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  onPositiveConfirmation: () => void;
  onRequestClose: () => void;
  result: ENegativePositiveFieldOptions;
  visible: boolean;
}

export const CovidTestLFTResultConfirmationModal: React.FC<IProps> = (props) => {
  const footerChildren = React.useMemo(
    () => (
      <>
        <BrandedButton
          onPress={props.onPositiveConfirmation}
          style={styles.positiveButton}
          testID="lft-quick-report-confirm-add"
        >
          {i18n.t('covid-test-list.lft-quick-report.confirmation-positive')}
        </BrandedButton>
        <BrandedButton
          onPress={props.onRequestClose}
          style={styles.negativeButton}
          testID="lft-quick-report-confirm-cancel"
          textStyle={styles.negativeButtonText}
        >
          {i18n.t('covid-test-list.lft-quick-report.confirmation-negative')}
        </BrandedButton>
      </>
    ),
    [props.onRequestClose, props.onPositiveConfirmation],
  );

  return (
    <Modal
      footerChildren={footerChildren}
      modalName="CovidTestLFTResultConfirmation"
      onRequestClose={props.onRequestClose}
      testID="covid-test-lft-result-confirmation-modal"
      visible={props.visible}
    >
      <Tag color={colors.teal} style={styles.tag} text={i18n.t('covid-test-list.lft-quick-report.tag-confirm')} />

      <TextWithBoldInserts inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3Light">
        {i18n.t('covid-test-list.lft-quick-report.confirmation', { result: props.result })}
      </TextWithBoldInserts>
    </Modal>
  );
};

const styles = StyleSheet.create({
  negativeButton: {
    backgroundColor: 'transparent',
    borderColor: colors.darkBlue,
    borderWidth: 1,
    marginTop: sizes.m,
  },
  negativeButtonText: {
    color: colors.darkBlue,
  },
  positiveButton: {
    backgroundColor: colors.darkBlue,
  },
  tag: {
    alignSelf: 'center',
    marginBottom: sizes.m,
  },
  title: {
    marginVertical: sizes.m,
    textAlign: 'center',
  },
});
