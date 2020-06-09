import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card } from 'native-base';

import { tick } from '@assets';
import { AvatarName, getAvatarByName } from '@covid/utils/avatar';
import { getDaysAgo } from '@covid/utils/datetime';

import { Patient } from '../features/multi-profile/SelectProfileScreen';

import { ClippedText } from './Text';
import DaysAgo from './DaysAgo';

type Props = {
  patient: Patient;
  index: number;
};

export const ProfileCard: React.FC<Props> = (props) => {
  const patient = props.patient;
  const avatarImage = getAvatarByName((patient.avatar_name ?? 'profile1') as AvatarName);
  const hasReportedToday = patient.last_reported_at && getDaysAgo(patient.last_reported_at) === 0;
  return (
    <Card style={styles.card}>
      <View style={styles.avatarContainer}>
        {hasReportedToday && (
          <View style={styles.circle}>
            <Image source={tick} style={styles.tick} />
          </View>
        )}
        <Image source={avatarImage} style={styles.avatar} resizeMode="contain" />
      </View>
      <ClippedText>{patient.name}</ClippedText>
      <DaysAgo timeAgo={patient.last_reported_at} />
    </Card>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    width: 100,
    marginBottom: 10,
  },

  avatar: {
    height: 100,
    width: 100,
  },

  tick: {
    height: 30,
    width: 30,
  },
  circle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    top: 0,
    right: -5,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'white',
  },
  card: {
    width: '100%',
    borderRadius: 16,
    minHeight: 200,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});
