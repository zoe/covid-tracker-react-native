import { BrandedButton, HeaderText, Tag, TextWithBoldInserts } from '@covid/components';
import { Modal } from '@covid/components/Modal';
import Logging, { contextNames, logLevel } from '@covid/core/Logging';
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

export function VaccineProfileOnboardingModal(props: IProps) {
  const ONBOARDING_IMAGE = React.useMemo(
    () => require('@covid/features/vaccines/assets/vaccine-profile-modal.png'),
    [],
  );
  const dispatch = useDispatch();

  const closeAndUpdateStartupInfo = React.useCallback(async () => {
    const infos: Partial<TPatientInfosRequest> = {
      has_seen_assessment_flow_v0_onboarding: true,
    };
    try {
      await patientService.updatePatientInfo(props.patientId, infos);
      dispatch(fetchStartupInfo());
    } catch (e) {
      Logging.log(
        'assessment_v0',
        'update_patient_vaccine_new_home_modal_seen_failed',
        contextNames.VACCINE_NEW_HOME_MODAL,
        {
          error: e,
        },
        logLevel.Error,
      );
    } finally {
      props.onRequestClose();
    }
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
        <Tag color={colors.accent} style={styles.tag} text={i18n.t('profile-modal.update')} />

        <HeaderText style={styles.title}>{i18n.t(`profile-modal.title`)}</HeaderText>
        <TextWithBoldInserts style={styles.text} textClass="h4Light">
          {i18n.t('profile-modal.body')}
        </TextWithBoldInserts>
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
    height: 350,
    resizeMode: 'contain',
  },
  tag: {
    alignSelf: 'center',
  },
  text: {
    marginBottom: sizes.m,
    textAlign: 'center',
  },
  title: {
    marginBottom: sizes.xs,
    marginTop: sizes.l,
  },
  wrapper: {
    alignItems: 'center',
  },
});
