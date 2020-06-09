import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card } from 'native-base';

import { tick } from '@assets';
import { AvatarName, getAvatarByName } from '@covid/utils/avatar';
import { getDaysAgo } from '@covid/utils/datetime';
import InfoCircle from '@assets/icons/InfoCircle';
import { GreenTick } from '@covid/components/GreenTick';

import { Patient } from '../features/multi-profile/SelectProfileScreen';

import { ClippedText } from './Text';
import LastReported from './LastReported';

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
        {hasReportedToday && <GreenTick />}
        <Image source={avatarImage} style={styles.avatar} resizeMode="contain" />
      </View>
      <ClippedText>{patient.name}</ClippedText>
      <LastReported timeAgo={patient.last_reported_at} />
    </Card>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignSelf: 'flex-end',
  },
  avatarContainer: {
    alignItems: 'center',
    width: 100,
    marginBottom: 10,
  },
  avatar: {
    height: 100,
    width: 100,
  },
  card: {
    width: '100%',
    borderRadius: 16,
    minHeight: 200,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});
