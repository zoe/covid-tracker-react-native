import { BrandedButton } from '@covid/components/buttons';
import { CONTENT_SPACING, Modal } from '@covid/components/Modal';
import { ScalableImage } from '@covid/components/ScalableImage';
import { Text } from '@covid/components/typography';
import Analytics, { events } from '@covid/core/Analytics';
import { patientService } from '@covid/core/patient/PatientService';
import { updateShowStudyHubVideoModal } from '@covid/core/state';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type TProps = {
  onRequestClose: () => void;
  visible: boolean;
};

export function StudyHubVideoModal(props: TProps) {
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const dispatch = useDispatch();

  const backgroundImage = React.useMemo(() => require('../assets/background_video_modal.png'), []);

  React.useEffect(() => {
    if (props.visible) {
      Analytics.track(events.STUDY_HUB_VIDEO_MODAL_SHOWN);
    }
  }, [props.visible]);

  const onRequestClose = React.useCallback(async () => {
    if (props.onRequestClose) {
      props.onRequestClose();
    }

    Analytics.track(events.STUDY_HUB_VIDEO_MODAL_CLOSED);

    try {
      // Update the Redux state immediately because the api calls could take a long time to finish.
      dispatch(updateShowStudyHubVideoModal(false));

      await patientService.updatePatientInfo(patientId, {
        has_seen_study_hub_video_modal: true,
      });
    } catch (_) {}
  }, [props.onRequestClose, patientId]);

  return (
    <Modal
      noPadding
      modalName="StudyHubVideo"
      onRequestClose={onRequestClose}
      testID="study-hub-video-modal"
      visible={props.visible}
    >
      <View style={styles.fullWidth} />

      <ScalableImage fullWidth source={backgroundImage} />

      <View style={styles.view}>
        <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3Regular">
          {i18n.t('study-hub.video-modal.title')}
        </Text>

        <Text
          inverted
          colorPalette="uiDark"
          colorShade="darker"
          style={styles.marginVertical}
          textAlign="center"
          textClass="pLight"
        >
          {i18n.t('study-hub.video-modal.description')}
        </Text>

        <BrandedButton onPress={onRequestClose}>{i18n.t('ok')}</BrandedButton>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: 1000,
  },
  marginVertical: {
    marginBottom: sizes.l,
    marginTop: sizes.m,
  },
  view: {
    padding: CONTENT_SPACING,
  },
});
