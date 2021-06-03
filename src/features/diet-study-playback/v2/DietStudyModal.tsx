import { BrandedButton, DoctorProfile, Modal, Text } from '@covid/components';
import Analytics from '@covid/core/Analytics';
import { setDietStudyConsent, TDietStudyConsent } from '@covid/core/state';
import appCoordinator from '@covid/features/AppCoordinator';
import { getDietStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import i18n from '@covid/locale/i18n';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

export default function DietStudyModal() {
  const [tracked, setTracked] = useState(false);
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const handleSetConsent = (consent: TDietStudyConsent) => {
    dispatch(setDietStudyConsent(consent));
    if (consent !== 'YES') {
      goBack();
      return;
    }

    appCoordinator.goToDietStudy();
  };

  useEffect(() => {
    if (!tracked) {
      Analytics.track(Analytics.events.DIET_STUDY_SCREEN_MODAL);
      setTracked(true);
    }
  });

  return (
    <Modal>
      <Text fontFamily="SofiaProRegular" rhythm={20} textClass="h3">
        {i18n.t('diet-study.modal-title')}
      </Text>
      <DoctorProfile
        image={getDietStudyDoctorImage()}
        location={i18n.t('diet-study.doctor-location')}
        name={i18n.t('diet-study.doctor-name')}
        title={i18n.t('diet-study.doctor-title')}
      />
      <Text rhythm={24} textClass="pLight">
        {i18n.t('diet-study.modal-intro-0')}
      </Text>
      <BrandedButton onPress={() => handleSetConsent('YES')} style={styles.buttonPositive}>
        {i18n.t('diet-study.modal-answer-yes')}
      </BrandedButton>
      <BrandedButton onPress={() => handleSetConsent('NO')} style={styles.buttonNegative}>
        <Text textClass="pSmallLight">{i18n.t('diet-study.modal-answer-no')}</Text>
      </BrandedButton>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonNegative: {
    backgroundColor: 'white',
  },
  buttonPositive: {
    backgroundColor: '#0165B5',
  },
});
