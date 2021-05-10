import { SafeLayout, Text } from '@covid/components';
import { events, track } from '@covid/core/Analytics';
import { setDietStudyConsent, TDietStudyConsent } from '@covid/core/state';
import { getDietStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import i18n from '@covid/locale/i18n';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import appCoordinator from '../../AppCoordinator';

function DietStudyModal() {
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
    <SafeLayout>
      <ScrollView>
        <View style={styles.card}>
          <Text fontFamily="SofiaProRegular" rhythm={20} textClass="h3">
            {i18n.t('diet-study.modal-title')}
          </Text>
          <View style={styles.profile}>
            {getDietStudyDoctorImage()}
            <View style={{ marginLeft: 16 }}>
              <Text>{i18n.t('diet-study.doctor-name')}</Text>
              <Text style={{ color: '#888B8C' }} textClass="pSmall">
                {i18n.t('diet-study.doctor-title')}
              </Text>
              <Text style={{ color: '#888B8C' }} textClass="pSmall">
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
              onPress={() => handleSetConsent('YES')}
              style={[styles.button, { backgroundColor: '#0165B5' }]}
            >
              <Text style={{ color: 'white' }} textClass="pSmallLight">
                {i18n.t('diet-study.modal-answer-yes')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessible
              accessibilityRole="button"
              onPress={() => handleSetConsent('NO')}
              style={[styles.button, { backgroundColor: '#EEEEEF' }]}
            >
              <Text textClass="pSmallLight">{i18n.t('diet-study.modal-answer-no')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginBottom: 8,
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 24,
    padding: 24,
  },
  profile: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
});

export default DietStudyModal;
