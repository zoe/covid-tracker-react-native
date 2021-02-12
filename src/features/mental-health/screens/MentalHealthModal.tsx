import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { Avatar, SafeLayout, Text } from '@covid/components';
import { avatarTemp } from '@assets';
import { useTheme } from '@covid/themes';
import { TMentalHealthConsent, setConsent } from '@covid/core/state';

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
          COVID & Mental Health
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
            We are currently investigating how the pandemic has had an impact on our mental health.
          </Text>
          <Text rhythm={24} textClass="pLight">
            We would like to ask you some one-off questions to help researchers understand better how COVID has affected
            our mental health. It takes 2-3 minutes to answer.
          </Text>
          <Text rhythm={12} textClass="pLight">
            Thank you for your ongoing support!
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#0165B5' }]}
            onPress={() => handleSetConsent('YES')}>
            <Text textClass="pSmallLight" style={{ color: 'white' }}>
              Yes, let’s do it
            </Text>
          </TouchableOpacity>
          {/* TODO implement redux state*/}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#EEEEEF' }]}
            onPress={() => handleSetConsent('LATER')}>
            <Text textClass="pSmallLight">No, but ask me again later</Text>
          </TouchableOpacity>
          {/* TODO implement redux state*/}
          <TouchableOpacity style={[styles.button]} onPress={() => handleSetConsent('NO')}>
            <Text textClass="pSmallLight">Skip, and don’t ask me again</Text>
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
