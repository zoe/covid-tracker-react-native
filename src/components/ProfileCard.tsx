import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card } from 'native-base';

import { AvatarName, getAvatarByName } from '@covid/utils/avatar';
import { getDaysAgo } from '@covid/utils/datetime';
import InfoCircle from '@assets/icons/InfoCircle';
import { GreenTick } from '@covid/components/GreenTick';
import appCoordinator from '@covid/features/AppCoordinator';
import { colors } from '@theme';
import { Profile } from '@covid/components/Collections/ProfileList';

import { ClippedText } from './Text';
import LastReported from './LastReported';

type Props = {
  profile: Profile;
  index: number;
};

export const ProfileCard: React.FC<Props> = (props) => {
  const profile = props.profile;
  const avatarImage = getAvatarByName((profile.avatar_name ?? 'profile1') as AvatarName);
  const hasReportedToday = profile.last_reported_at && getDaysAgo(profile.last_reported_at) === 0;

  function handleEdit() {
    appCoordinator.editProfile(profile);
  }

  return (
    <Card style={styles.card} transparent>
      {profile.reported_by_another ? (
        <View style={styles.infoContainer}>
          <TouchableOpacity onPress={() => handleEdit()}>
            <InfoCircle />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.placeholder} />
      )}

      <View style={styles.avatarContainer}>
        {hasReportedToday && <GreenTick />}
        <Image source={avatarImage} style={styles.avatar} resizeMode="contain" />
      </View>
      <ClippedText>{profile.name}</ClippedText>
      <LastReported timeAgo={profile.last_reported_at} />
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
    backgroundColor: colors.white,
    shadowRadius: 0,
    width: '100%',
    borderRadius: 16,
    minHeight: 200,
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  placeholder: {
    height: 20,
    width: 20,
  },
});
