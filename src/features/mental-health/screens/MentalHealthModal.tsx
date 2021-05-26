import { drEllenThompsonUK, drKarstenKoenenUS } from '@assets';
import { Avatar, Modal, Text } from '@covid/components';
import Analytics from '@covid/core/Analytics';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';
import { setConsent, setLastPresentedDate, TMentalHealthConsent } from '@covid/core/state';
import appCoordinator from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function MentalHealthModal() {
  const [tracked, setTracked] = useState(false);
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  // TODO implement redux state
  const handleSetConsent = (consent: TMentalHealthConsent) => {
    dispatch(setConsent(consent));
    if (consent === 'LATER') {
      dispatch(setLastPresentedDate(new Date().toString()));
    }
    if (consent !== 'YES') {
      goBack();
      return;
    }
    appCoordinator.goToMentalHealthStudy();
  };

  const getImgSrc = () => {
    return isUSCountry() ? drKarstenKoenenUS : drEllenThompsonUK;
  };

  useEffect(() => {
    if (!tracked) {
      Analytics.track(Analytics.events.MENTAL_HEALTH_DISPLAY_MODAL);
      setTracked(true);
    }
  });

  return (
    <Modal event="view_mental_health_modal-v1">
      <Text fontFamily="SofiaProRegular" rhythm={20} textClass="h3">
        {i18n.t('mental-health.modal-title')}
      </Text>
      <View style={styles.profile}>
        <Avatar imgsrc={getImgSrc()} />
        <View style={{ marginLeft: 16, marginRight: 32 }}>
          <Text>{i18n.t('mental-health.doctor-name')}</Text>
          <Text style={{ color: '#888B8C' }} textClass="pSmall">
            {i18n.t('mental-health.doctor-title')}
          </Text>
          <Text style={{ color: '#888B8C' }} textClass="pSmall">
            {i18n.t('mental-health.doctor-location')}
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
          onPress={() => handleSetConsent('YES')}
          style={[styles.button, { backgroundColor: '#0165B5' }]}
        >
          <Text style={{ color: 'white' }} textClass="pSmallLight">
            {i18n.t('mental-health.modal-answer-yes')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSetConsent('LATER')}
          style={[styles.button, { backgroundColor: '#EEEEEF' }]}
        >
          <Text textClass="pSmallLight">{i18n.t('mental-health.modal-answer-later')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSetConsent('NO')} style={[styles.button]}>
          <Text textClass="pSmallLight">{i18n.t('mental-health.modal-answer-no')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
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
  profile: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
});
