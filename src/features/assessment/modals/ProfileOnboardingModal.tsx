import { BrandedButton, HeaderText, RegularText, TextWithBoldInserts } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import { events, track } from '@covid/core/Analytics';
import { patientService } from '@covid/core/patient/PatientService';
import { fetchStartupInfo } from '@covid/core/state/content/slice';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface IProps {
  onRequestClose: () => void;
  patientId: string;
  visible: boolean;
}

const ONBOARDING_IMAGE = require('@covid/features/assessment/modals/new-profile-modal.png');

export function ProfileOnboardingModal(props: IProps) {
  const dispatch = useDispatch();
  const [tracked, setTracked] = React.useState(false);

  React.useEffect(() => {
    if (!tracked) {
      track(events.COVID_PROFILE_ONBOARDING_MODAL);
      setTracked(true);
    }
  });

  const closeAndUpdateStartupInfo = React.useCallback(async () => {
    // TODO when BE / API is set up in https://www.notion.so/joinzoe/Assessment-v0-backend-flags-fbc306ef537d4526ab0ba1dab4103e76

    const infos: Partial<TPatientInfosRequest> = {
      has_seen_assessment_flow_v0_onboarding: true,
    };
    try {
      await patientService.updatePatientInfo(props.patientId, infos);
      props.onRequestClose();
      dispatch(fetchStartupInfo());
    } catch (_) {}
  }, [props.patientId, props.onRequestClose]);

  const footerChildren = (
    <BrandedButton onPress={closeAndUpdateStartupInfo} style={styles.button} testID="profile-modal-button">
      {i18n.t('profile-modal.button-end')}
    </BrandedButton>
  );

  return (
    <Modal
      footerChildren={footerChildren}
      modalName="ProfileOnboarding"
      onRequestClose={closeAndUpdateStartupInfo}
      testID="profile-modal"
      visible={props.visible}
    >
      <View style={styles.wrapper}>
        <View style={styles.update}>
          <RegularText style={styles.updateText}>{i18n.t('profile-modal.update')}</RegularText>
        </View>
        <HeaderText style={styles.text}>{i18n.t(`profile-modal.title`)}</HeaderText>
        <TextWithBoldInserts style={styles.text}>{i18n.t('profile-modal.body')}</TextWithBoldInserts>
        <Image source={ONBOARDING_IMAGE} style={styles.img} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: sizes.m,
  },
  img: {
    flex: 1,
    height: 400,
    resizeMode: 'contain',
  },
  text: {
    marginBottom: sizes.m,
    textAlign: 'center',
  },
  title: {
    marginVertical: sizes.m,
  },
  update: {
    alignSelf: 'center',
    backgroundColor: colors.accent,
    borderRadius: sizes.xs,
    marginBottom: sizes.l,
    paddingHorizontal: sizes.s,
    textAlign: 'center',
  },
  updateText: {
    color: 'white',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  wrapper: {
    alignItems: 'center',
    padding: sizes.xs,
  },
});
