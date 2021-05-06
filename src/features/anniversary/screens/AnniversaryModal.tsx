import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { SafeLayout, Text } from '@covid/components';
import { timelineModalCard } from '@assets';
import { setHasViewedAnniversaryModal } from '@covid/core/state';
import { useInjection } from '@covid/provider/services.hooks';
import { IPatientService } from '@covid/core/patient/PatientService';
import { Services } from '@covid/provider/services.types';
import { Profile } from '@covid/core/profile/ProfileService';
import Analytics, { events } from '@covid/core/Analytics';

import appCoordinator from '../../AppCoordinator';

function AnniversaryModal() {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const patientService = useInjection<IPatientService>(Services.Patient);
  const [signupDate, setSignupDate] = useState<string>('');

  const updateSignupDate = async () => {
    const profile: Profile | null = await patientService.myPatientProfile();

    if (profile) {
      setSignupDate(moment(profile.created_at).format('MMMM Do YYYY'));
    }
  };
  useEffect(() => {
    updateSignupDate();
  });

  const handleViewTimeline = (view: boolean) => {
    dispatch(setHasViewedAnniversaryModal(true));
    if (view) {
      Analytics.track(events.ANNIVERSARY_FROM_MODAL);
      appCoordinator.goToAnniversary();
      return;
    }
    Analytics.track(events.ANNIVERSARY_SKIP);
    goBack();
  };

  return (
    <SafeLayout>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.feature}>
              <Text textClass="pXSmall" style={{ color: 'white' }}>
                NEW FEATURE
              </Text>
            </View>
          </View>
          <Text textClass="h3" textAlign="center" rhythm={24}>
            Your personal contribution to science!
          </Text>
          <Text textClass="pLight" textAlign="center">
            Thank you for reporting with us since
          </Text>
          <Text textAlign="center">{signupDate}</Text>
          <View style={{ marginBottom: 12 }}>
            <Image
              source={timelineModalCard}
              style={{
                aspectRatio: 1.55,
                resizeMode: 'contain',
                height: undefined,
                width: '100%',
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              accessible
              accessibilityRole="button"
              style={[styles.button, { backgroundColor: '#0165B5' }]}
              onPress={() => handleViewTimeline(true)}>
              <Text textClass="pSmallLight" style={{ color: 'white' }}>
                Discover your timeline
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessible
              accessibilityRole="button"
              style={[styles.button, { backgroundColor: 'white' }]}
              onPress={() => handleViewTimeline(false)}>
              <Text textClass="pSmallLight">Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 24,
    padding: 24,
  },
  feature: {
    backgroundColor: '#FA7268',
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
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

export default AnniversaryModal;
