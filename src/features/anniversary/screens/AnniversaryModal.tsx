import { timelineModalCard } from '@assets';
import { Modal, Text } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { IPatientService } from '@covid/core/patient/PatientService';
import { Profile } from '@covid/core/profile/ProfileService';
import { setHasViewedAnniversaryModal } from '@covid/core/state';
import appCoordinator from '@covid/features/AppCoordinator';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

// @todo: Localise this file.

export default function AnniversaryModal() {
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
    <Modal event="view_anniversary_modal-v1">
      <View style={{ alignItems: 'center' }}>
        <View style={styles.feature}>
          <Text style={{ color: 'white' }} textClass="pXSmall">
            NEW FEATURE
          </Text>
        </View>
      </View>
      <Text rhythm={24} textAlign="center" textClass="h3">
        Your personal contribution to science!
      </Text>
      <Text textAlign="center" textClass="pLight">
        Thank you for reporting with us since
      </Text>
      <Text textAlign="center">{signupDate}</Text>
      <View style={{ marginBottom: 12 }}>
        <Image
          source={timelineModalCard}
          style={{
            aspectRatio: 1.55,
            height: undefined,
            resizeMode: 'contain',
            width: '100%',
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          accessible
          accessibilityRole="button"
          onPress={() => handleViewTimeline(true)}
          style={[styles.button, { backgroundColor: '#0165B5' }]}
          testID="touchable-positive"
        >
          <Text style={{ color: 'white' }} textClass="pSmallLight">
            Discover your timeline
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessible
          accessibilityRole="button"
          onPress={() => handleViewTimeline(false)}
          style={[styles.button, { backgroundColor: 'white' }]}
          testID="touchable-negative"
        >
          <Text textClass="pSmallLight">Skip</Text>
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
  feature: {
    backgroundColor: '#FA7268',
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
