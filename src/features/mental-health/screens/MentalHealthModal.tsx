import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { Avatar, SafeLayout, Text } from '@covid/components';
import { avatarTemp } from '@assets';
import { TMentalHealthConsent, setConsent } from '@covid/core/state';
import i18n from '@covid/locale/i18n';

import appCoordinator from '../../AppCoordinator';

function MentalHealthModal() {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  // TODO implement redux state
  const handleSetConsent = (consent: TMentalHealthConsent) => {
    dispatch(setConsent(consent));
    if (consent !== 'YES') {
      goBack();
      return;
    }
    appCoordinator.goToMentalHealthStudy();
  };

  return (
    <SafeLayout>
      <View style={styles.card}>
        <Text textClass="h3" fontFamily="SofiaProRegular" rhythm={20}>
          {i18n.t('mental-health.modal-title')}
        </Text>
        <View style={styles.profile}>
          <Avatar imgsrc={avatarTemp} />
          <View style={{ marginLeft: 16 }}>
            <Text>Dr Ellen Jo Thompson</Text>
            <Text textClass="pSmall" style={{ color: '#888B8C' }}>
              Mental Health Researcher
            </Text>
            <Text textClass="pSmall" style={{ color: '#888B8C' }}>
              King’s College London
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
    flex: 1,
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
