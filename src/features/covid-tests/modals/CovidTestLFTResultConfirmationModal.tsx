import { ENegativePositiveFieldOptions } from '@covid/components/inputsRedesigned/NegativePositiveField';
import { Modal } from '@covid/components/Modal';
import { TextWithBoldInserts } from '@covid/components/typography';
import i18n from '@covid/locale/i18n';
import Button from '@tracer/components/atoms/Button';
import Tag from '@tracer/components/atoms/Tag';
import * as React from 'react';

import { covidStyles, healthStudyStyles } from './CovidTestLFTResultConfirmationModalStyle';

interface IProps {
  onPositiveConfirmation: () => void;
  onRequestClose: () => void;
  result: ENegativePositiveFieldOptions;
  visible: boolean;
  reBrand?: boolean;
}

export const CovidTestLFTResultConfirmationModal: React.FC<IProps> = (props) => {
  const styles = props.reBrand ? healthStudyStyles : covidStyles;

  const footerChildren = React.useMemo(
    () => (
      <>
        <Button
          onPress={props.onPositiveConfirmation}
          style={styles.positiveButton}
          testID="lft-quick-report-confirm-add"
          text={i18n.t('covid-test-list.lft-quick-report.confirmation-positive')}
        />
        <Button
          onPress={props.onRequestClose}
          style={styles.negativeButton}
          testID="lft-quick-report-confirm-cancel"
          text={i18n.t('covid-test-list.lft-quick-report.confirmation-negative')}
          textStyle={styles.negativeButtonText}
        />
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
      <Tag
        color={styles.tagColor.color}
        style={styles.tag}
        text={i18n.t('covid-test-list.lft-quick-report.tag-confirm')}
      />
      <TextWithBoldInserts inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3Light">
        {i18n.t('covid-test-list.lft-quick-report.confirmation', { result: props.result })}
      </TextWithBoldInserts>
    </Modal>
  );
};
