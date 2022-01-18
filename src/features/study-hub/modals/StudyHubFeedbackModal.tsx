import { BrandedButton, Text, TextareaWithCharCount } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import { events, track } from '@covid/core/Analytics';
import { patientService } from '@covid/core/patient/PatientService';
import { fetchStartupInfo, updateShowStudyHubFeedback } from '@covid/core/state';
import { TRootState } from '@covid/core/state/root';
import { TFeedbackRating } from '@covid/core/study-interest/StudyInterest.dto';
import { studyInterestService } from '@covid/core/study-interest/StudyInterestService';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

const thumbsDown = require('@covid/features/study-hub/assets/thumbsdown.png');
const thumbsUp = require('@covid/features/study-hub/assets/thumbsup.png');

export const StudyHubFeedbackModal: React.FC<IProps> = (props) => {
  const [comments, setComments] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [selectedFeedback, setSelectedFeedback] = React.useState<TFeedbackRating>();
  const dispatch = useDispatch();
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);

  const updatePatientAndStartupInfo = async () => {
    try {
      await patientService.updatePatientInfo(patientId, {
        has_seen_study_hub_feedback: true,
      });
      // Update the Redux state immediately because the api calls could take a long time to finish.
      dispatch(updateShowStudyHubFeedback(true));
      await dispatch(fetchStartupInfo());
    } catch (_) {}
  };

  async function onSubmit() {
    if (!loading) {
      setLoading(true);

      try {
        const result = await studyInterestService.registerFeedback(selectedFeedback!, comments);
        await updatePatientAndStartupInfo();
        if (result) {
          track(events.STUDY_HUB_FEEDBACK, { feedback: selectedFeedback });
          props.onRequestClose();
        }
      } catch {
        // eslint-disable-next-line no-console
        console.error('Error submitting feedback');
      }

      setLoading(false);
    }
  }

  function onClose() {
    track(events.STUDY_HUB_FEEDBACK_CLOSE_MODAL);
    // Don't await when the user closes the modal
    updatePatientAndStartupInfo();
    props.onRequestClose();
  }

  const enabled = !loading && !!selectedFeedback;

  const footerChildren = React.useMemo(
    () => (
      <BrandedButton
        enabled={enabled}
        loading={loading}
        onPress={onSubmit}
        style={[styles.button, enabled ? null : styles.disabledButton]}
        testID="button-send-feedback"
      >
        {i18n.t('study-hub.feedback.button')}
      </BrandedButton>
    ),
    [onSubmit, enabled, loading],
  );

  return (
    <Modal
      showsVerticalScrollIndicator
      footerChildren={footerChildren}
      modalName="StudyHubFeedback"
      onPressClose={onClose}
      onRequestClose={props.onRequestClose}
      testID="study-hub-feedback-modal"
      visible={props.visible}
    >
      <Text rhythm={sizes.xl} textAlign="center" textClass="h3Light">
        {i18n.t('study-hub.feedback.title')}
      </Text>
      <View style={styles.feedbackIcons}>
        <Pressable onPress={() => setSelectedFeedback(1)}>
          <Image
            source={thumbsDown}
            style={[styles.thumbIcon, styles.thumbsDown, selectedFeedback === 5 ? styles.lowerOpacity : null]}
            testID="study-hub-feedback-negative"
          />
        </Pressable>
        <Pressable onPress={() => setSelectedFeedback(5)}>
          <Image
            source={thumbsUp}
            style={[styles.thumbIcon, selectedFeedback === 1 ? styles.lowerOpacity : null]}
            testID="study-hub-feedback-positive"
          />
        </Pressable>
      </View>
      <TextareaWithCharCount
        onChangeText={setComments}
        placeholder={i18n.t('study-hub.feedback.placeholder')}
        placeholderTextColor={colors.tertiary}
        style={styles.textArea}
        textAreaStyle={{ backgroundColor: colors.backgroundTertiary, borderRadius: sizes.m }}
        value={comments}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    marginBottom: sizes.m,
  },
  closeCross: {
    end: 12,
    height: 14,
    tintColor: colors.primary,
    top: 12,
    width: 14,
  },
  closeTouchable: {
    alignSelf: 'flex-end',
  },
  disabledButton: {
    opacity: 0.5,
  },
  feedbackIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: sizes.xl,
  },
  lowerOpacity: {
    opacity: 0.35,
  },
  textArea: {
    marginBottom: sizes.xs,
  },
  thumbIcon: {
    height: 52,
    width: 52,
  },
  thumbsDown: {
    marginRight: sizes.l,
  },
});
