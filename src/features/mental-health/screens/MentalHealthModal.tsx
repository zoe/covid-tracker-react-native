import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { Avatar, SafeLayout, Text } from '@covid/components';
import { TMentalHealthConsent, setConsent, setLastPresentedDate } from '@covid/core/state';
import i18n from '@covid/locale/i18n';
import { drEllenThompsonUK, drKarstenKoenenUS } from '@assets';

import appCoordinator from '../../AppCoordinator';

function MentalHealthModal() {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  // TODO implement redux state
  const handleSetConsent = (consent: TMentalHealthConsent) => {
    dispatch(setConsent(consent));
    if (consent === 'LATER') {
      dispatch(setLastPresentedDate(new Date()));
    }
    if (consent !== 'YES') {
      goBack();
      return;
    }
    appCoordinator.goToMentalHealthStudy();
  };

  const getImgSrc = () => {
    // en, es, en-US, sv-SE
    const locale = i18n.currentLocale();
    switch (locale) {
      case 'en-US':
        return drKarstenKoenenUS;
      default:
        return drEllenThompsonUK;
    }
  };

  return (
    <SafeLayout>
      <View style={styles.card}>
        <Text textClass="h3" fontFamily="SofiaProRegular" rhythm={20}>
          {i18n.t('mental-health.modal-title')}
        </Text>
        <View style={styles.profile}>
          <Avatar imgsrc={getImgSrc()} />
          <View style={{ marginLeft: 16 }}>
            <Text>{i18n.t('mental-health.doctor-name')}</Text>
            <Text textClass="pSmall" style={{ color: '#888B8C' }}>
              {i18n.t('mental-health.doctor-title')}
            </Text>
            <Text textClass="pSmall" style={{ color: '#888B8C' }}>
              {i18n.t('mental-health.doctor-college')}
            </Text>
          </View>
        </View>
        <View>
          <Text rhythm={24} textClass="pLight">
            {i18n.t('mental-health.modal-intro-0')}
          </Text>
          <Text rhythm={24} textClass="pLight">
            {i18n.t('mental-health.modal-intro-1')}
          </Text>
          <Text rhythm={12} textClass="pLight">
            {i18n.t('mental-health.modal-intro-2')}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#0165B5' }]}
            onPress={() => handleSetConsent('YES')}>
            <Text textClass="pSmallLight" style={{ color: 'white' }}>
              {i18n.t('mental-health.modal-answer-yes')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#EEEEEF' }]}
            onPress={() => handleSetConsent('LATER')}>
            <Text textClass="pSmallLight">{i18n.t('mental-health.modal-answer-later')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={() => handleSetConsent('NO')}>
            <Text textClass="pSmallLight">{i18n.t('mental-health.modal-answer-no')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 24,
    padding: 24,
  },
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

export default MentalHealthModal;
