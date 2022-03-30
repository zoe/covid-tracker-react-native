import { BrandedButton } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import { Text } from '@covid/components/typography';
import Analytics, { events } from '@covid/core/Analytics';
import { updateShowCovidTestLFTPromptModal } from '@covid/core/state';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

export default function CovidTestLFTPromptModal(props: IProps) {
  const dispatch = useDispatch();

  const confirmSaveAndExit = () => {
    dispatch(updateShowCovidTestLFTPromptModal(null));
    props.onRequestClose();
    Analytics.track(events.COVID_TEST_LFT_PROMPT_OK_BUTTON_CLICKED);
  };

  const footerChildren = React.useMemo(
    () => <BrandedButton onPress={confirmSaveAndExit}>{i18n.t('ok')}</BrandedButton>,
    [props.onRequestClose],
  );

  return (
    <Modal
      footerChildren={footerChildren}
      modalName="CovidTestLFTPromptModal"
      onRequestClose={props.onRequestClose}
      testID="ovid-test-lft-prompt-modal"
      visible={props.visible}
    >
      <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.title} textClass="h3Regular">
        {i18n.t('covid-test.lft-prompt-modal.title')}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.main} textClass="h3Light">
        {i18n.t('covid-test.lft-prompt-modal.main')}
      </Text>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: sizes.xs,
  },
  title: {
    marginVertical: sizes.s,
    textAlign: 'center',
  },
});
