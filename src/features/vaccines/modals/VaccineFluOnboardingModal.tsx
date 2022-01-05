import { BrandedButton, HeaderText, Modal, RegularText } from '@covid/components';
import { TextWithBoldInserts } from '@covid/components/typography/TextWithBoldInserts';
import { patientService } from '@covid/core/patient/PatientService';
import { fetchStartUpInfo } from '@covid/core/state/contentSlice';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
  patientId: string;
}

export const VaccineFluOnboardingModal: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const closeAndUpdateStartupInfo = async () => {
    const infos: Partial<TPatientInfosRequest> = {
      has_seen_flu_vaccine_onboarding: true,
    };
    try {
      await patientService.updatePatientInfo(props.patientId, infos);
      dispatch(fetchStartUpInfo());
      props.onRequestClose();
    } catch (_) {}
  };

  const footerChildren = React.useMemo(
    () => <BrandedButton onPress={closeAndUpdateStartupInfo}>{i18n.t('ok')}</BrandedButton>,
    [props.onRequestClose, i18n.t('ok')],
  );

  return (
    <Modal
      enableBackdropDismiss
      showsVerticalScrollIndicator
      footerChildren={footerChildren}
      modalName="VaccineFluOnboarding"
      onRequestClose={closeAndUpdateStartupInfo}
      testID="vaccine-flu-onboarding-modal"
      visible={props.visible}
    >
      <View style={styles.tag}>
        <RegularText style={styles.tagText}>{i18n.t('vaccines.flu-onboarding.new')}</RegularText>
      </View>
      <HeaderText style={styles.modalTitle}>{i18n.t('vaccines.flu-onboarding.title')}</HeaderText>
      <TextWithBoldInserts inverted colorPalette="uiDark" colorShade="darker" textClass="pLight">
        {i18n.t('vaccines.flu-onboarding.description')}
      </TextWithBoldInserts>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalDescription: {
    marginBottom: sizes.s,
  },
  modalTitle: {
    marginBottom: sizes.l,
    marginTop: sizes.s,
    textAlign: 'center',
  },
  tag: {
    alignSelf: 'center',
    backgroundColor: colors.lightBlueBrand,
    borderRadius: sizes.xs,
    paddingHorizontal: sizes.s,
    paddingVertical: sizes.xxs,
    textAlign: 'center',
  },
  tagText: {
    color: colors.white,
    fontSize: 12,
    textTransform: 'uppercase',
  },
});
