import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { Modal, Text } from '@covid/components';
import { setDietStudyConsent, TDietStudyConsent } from '@covid/core/state';
import i18n from '@covid/locale/i18n';
import { events, track } from '@covid/core/Analytics';
import { getDietStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';

import appCoordinator from '../../AppCoordinator';

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
      track(events.DIET_STUDY_SCREEN_MODAL);
      setTracked(true);
    }
  });

  return (
    <Modal>
      <Text textClass="h3" fontFamily="SofiaProRegular" rhythm={20}>
        {i18n.t('diet-study.modal-title')}
      </Text>
      <View style={styles.profile}>
        {getDietStudyDoctorImage()}
        <View style={{ marginLeft: 16 }}>
          <Text>{i18n.t('diet-study.doctor-name')}</Text>
          <Text textClass="pSmall" style={{ color: '#888B8C' }}>
            {i18n.t('diet-study.doctor-title')}
          </Text>
          <Text textClass="pSmall" style={{ color: '#888B8C' }}>
            {i18n.t('diet-study.doctor-location')}
          </Text>
        </View>
      </View>
      <View>
        <Text rhythm={24} textClass="pLight">
          {i18n.t('diet-study.modal-intro-0')}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          accessible
          accessibilityRole="button"
          style={[styles.button, { backgroundColor: '#0165B5' }]}
          onPress={() => handleSetConsent('YES')}>
          <Text textClass="pSmallLight" style={{ color: 'white' }}>
            {i18n.t('diet-study.modal-answer-yes')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessible
          accessibilityRole="button"
          style={[styles.button, { backgroundColor: '#EEEEEF' }]}
          onPress={() => handleSetConsent('NO')}>
          <Text textClass="pSmallLight">{i18n.t('diet-study.modal-answer-no')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  button: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginBottom: 8,
    width: '100%',
  },
});
