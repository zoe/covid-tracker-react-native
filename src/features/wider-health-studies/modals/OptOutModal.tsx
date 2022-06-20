import { BrandedButton, Text } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import { ErrorText } from '@covid/components/Text';
import { consentService } from '@covid/core/consent/ConsentService';
import { patientService } from '@covid/core/patient/PatientService';
import { fetchStartupInfo } from '@covid/core/state/content/slice';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import Analytics, { events } from '@health-study/analytics';
import { colors } from '@theme';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type TProps = {
  onRequestClose: () => void;
  visible: boolean;
};

export const OptOutModal = React.memo((props: TProps) => {
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const [hasError, setHasError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const onPressNegative = React.useCallback(async () => {
    setLoading(true);
    setHasError(false);
    try {
      Analytics.track(events.WIDER_HEALTH_STUDIES_OPT_OUT);
      await consentService.revokeConsentWiderHealthStudies();
      // This hack is implemented here to keep the backend simple and prevent the user from seeing
      // the menu overlay after opting out.
      await patientService.updatePatientInfo(patientId, {
        menu_notifications_onboarding_seen: true,
      });
      await dispatch(fetchStartupInfo());
      props.onRequestClose();
      NavigatorService.goBack();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      setHasError(true);
    }
    setLoading(false);
  }, [props.onRequestClose]);

  return (
    <Modal
      modalName="ReconsentOptOut"
      onRequestClose={props.onRequestClose}
      testID="wider-health-studies-opt-out-modal"
      visible={props.visible}
    >
      <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3Regular">
        {i18n.t('wider-health-studies.opt-out-modal.title')}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.marginVertical} textClass="pLight">
        {i18n.t('wider-health-studies.opt-out-modal.description')}
      </Text>
      {hasError ? <ErrorText style={styles.marginBottom}>{i18n.t('something-went-wrong')}</ErrorText> : null}
      <BrandedButton enabled={!loading} loading={loading} onPress={props.onRequestClose}>
        {i18n.t('wider-health-studies.opt-out-modal.button-positive')}
      </BrandedButton>
      <TouchableOpacity disabled={loading} onPress={onPressNegative} style={styles.buttonNegative}>
        {loading ? <ActivityIndicator color={colors.purple} /> : null}
        <Text
          inverted
          colorPalette="actionSecondary"
          colorShade="main"
          style={styles.flex}
          textAlign="center"
          textClass="pMedium"
        >
          {i18n.t('wider-health-studies.opt-out-modal.button-negative')}
        </Text>
        {/* This activity indicator is there to make things center horizontally and vertically. */}
        {loading ? <ActivityIndicator color={colors.white} /> : null}
      </TouchableOpacity>
    </Modal>
  );
});

const styles = StyleSheet.create({
  buttonNegative: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: sizes.l,
  },
  flex: {
    flex: 1,
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  marginVertical: {
    marginBottom: sizes.l,
    marginTop: sizes.l,
  },
});
