import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { Icon, SafeLayout, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { events, track } from '@covid/core/Analytics';
import { selectSettingsState, setHasEmailSubscription } from '@covid/core/state';

import dietStudyPlaybackCoordinator from '../DietStudyPlaybackCoordinator';

function DietStudyEmailModal() {
  const [tracked, setTracked] = useState(false);
  const settings = useSelector(selectSettingsState);
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { signUpToNewsletter } = dietStudyPlaybackCoordinator;

  const handleOnPress = () => {
    signUpToNewsletter(!settings.hasEmailSubscription).then(() => {
      track(
        settings.hasEmailSubscription ? events.DIET_STUDY_EMAIL_UNSUBSCRIBED : events.DIET_STUDY_EMAIL_UNSUBSCRIBED
      );
      dispatch(setHasEmailSubscription(!settings.hasEmailSubscription));
    });
    goBack();
  };

  return (
    <SafeLayout>
      <View style={styles.card}>
        <Text textClass="h3" fontFamily="SofiaProRegular" rhythm={20}>
          {i18n.t('diet-study.email-action-title')}
        </Text>
        <View>
          <Text rhythm={24} textClass="pLight">
            {i18n.t('diet-study.email-action-body')}
          </Text>
        </View>
        <View>
          {settings.hasEmailSubscription ? (
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginVertical: 24 }}>
              <Icon iconName="tick" style={{ marginRight: 8 }} />
              <Text>{i18n.t('navigation.cta-email-success')}</Text>
            </View>
          ) : (
            <TouchableOpacity style={[styles.button, { backgroundColor: '#0165B5' }]} onPress={handleOnPress}>
              <Text textClass="pSmallLight" style={{ color: 'white' }}>
                {i18n.t('diet-study.email-action-cta')}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.button, { backgroundColor: '#EEEEEF' }]} onPress={handleOnPress}>
            <Text textClass="pSmallLight">{i18n.t('diet-study.modal-answer-no')}</Text>
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

export default DietStudyEmailModal;
